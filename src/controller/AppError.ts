class AppError extends Error {
  status: string;
  isOperational: boolean;
  constructor(message: string, public statusCode: number) {
    super(message);
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
