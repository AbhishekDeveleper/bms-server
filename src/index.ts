import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import AppError from "./controller/AppError.js";
import globalErrorHandler from "./controller/errorController.js";
import morgan from "morgan";
import router from "./router/bmsroute.js";
export const app = express();

app.options("*", cors());

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request for this IP",
});

app.use(express.json({ limit: "20kb" }));
app.use("/api", limiter);
app.use(morgan('dev'))

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(
    "Custom error message for testing error middleware ",
    400
  );
  next(error);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `The url is ${req.originalUrl} and the method  of this url is ${req.method}`
  );
  next();
});

app.get("/api/home", (req: Request, res) => {
  res.send(`Welcome to home page at url ${req.originalUrl}`);
});

app.use("/api/v1", router);
app.use("*", (req, res, next) => {
  res.send(`The route with this url ${req.originalUrl} is not defined`);
  next();
});

app.use(globalErrorHandler);
