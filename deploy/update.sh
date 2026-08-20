#!/usr/bin/env bash

# Run this script on the Vultr server from the repository root:
#   bash deploy/update.sh
#
# It is deliberately fail-fast: an unsuccessful fetch, merge, or image build
# leaves the currently running containers untouched.
set -Eeuo pipefail

REPOSITORY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$REPOSITORY_DIR"

if [[ ! -f .env ]]; then
  echo "Missing .env. Copy .env.example to .env and fill in production values first." >&2
  exit 1
fi

git fetch origin main
git checkout main
git pull --ff-only origin main

docker compose --env-file .env up -d --build --remove-orphans
docker compose --env-file .env ps