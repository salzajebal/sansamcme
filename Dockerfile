# syntax=docker/dockerfile:1

# Shared build environment for the pnpm workspace.
# This project intentionally excludes Rollup's musl binary in its pnpm
# workspace configuration, so builds must use a glibc-based Node image.
FROM node:20-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

WORKDIR /app

# Install the complete workspace because the API build resolves shared packages.
FROM base AS dependencies

COPY . .
RUN pnpm install --frozen-lockfile

# Build the two production artifacts. Vite requires these values while evaluating
# its configuration, even though the built site is served by Nginx afterward.
FROM dependencies AS build

ENV PORT=23922
ENV BASE_PATH="/"

RUN pnpm --filter @workspace/api-server run build \
  && pnpm --filter @workspace/cme-group run build

# Used only by the one-shot schema migration service in docker-compose.yml.
FROM dependencies AS migrate

# Small runtime image for the bundled Express API.
FROM node:20-bookworm-slim AS api

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

COPY --from=build --chown=node:node /app/artifacts/api-server/dist ./artifacts/api-server/dist

USER node

EXPOSE 8080

CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]

# Static frontend plus reverse proxy for same-origin /api requests.
FROM nginx:1.27-alpine AS web

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/artifacts/cme-group/dist/public /usr/share/nginx/html

EXPOSE 80