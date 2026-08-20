import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "node:path";
import { existsSync } from "node:fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const frontendDist = [
  process.env.FRONTEND_DIST_DIR,
  path.join(process.cwd(), "artifacts/cme-group/dist/public"),
  path.join(process.cwd(), "../cme-group/dist/public"),
]
  .filter((candidate): candidate is string => typeof candidate === "string")
  .find((candidate) => existsSync(path.resolve(candidate)));

if (process.env.NODE_ENV === "production" && frontendDist) {
  const staticFrontendDist = frontendDist;

  app.use(express.static(staticFrontendDist, { index: false }));
  app.use((req, res, next) => {
    if (
      req.method !== "GET" ||
      req.path.startsWith("/api") ||
      !req.accepts("html")
    ) {
      next();
      return;
    }

    res.sendFile(path.join(staticFrontendDist, "index.html"));
  });
}

export default app;
