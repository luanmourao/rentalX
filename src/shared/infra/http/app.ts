// test
import "reflect-metadata";
import upload from "../../../config/upload";
import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import createConnection from '../typeormDB';
import '../../container';
import cors from 'cors';
import { router } from './routes';
import { AppError } from '../../errors/AppError';
import rateLimiter from '../http/middlewares/rateLimiter';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

createConnection();
const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ 
    status: "error",
    message: `Internal server error - ${err.message}`
  });
})

export { app };