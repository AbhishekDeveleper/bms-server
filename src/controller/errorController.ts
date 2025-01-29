import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

interface AppError extends Error {
  statusCode?: number;
  status?: string;
}

const globalErrorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
  });
};

export default globalErrorHandler;
