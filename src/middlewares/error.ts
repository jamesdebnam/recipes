import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import logger from "loglevel";

export class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function errorMiddleware(
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(error);
  } else {
    logger.error(error.message, error.stack);
    if ("statusCode" in error) {
      res.status(error.statusCode);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
    res.json({
      error: error.message,
      ...(process.env.NODE_ENV === "production"
        ? null
        : { stack: error.stack }),
    });
  }
}
