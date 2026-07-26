import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = error?.statusCode ?? 500;
  let message = error?.message ?? "Internal Server Error";
  const status = error?.status ?? "error";
  const success = false;

  // if (error instanceof MongooseError) {
  if (error?.cause?.code === 11000) {
    statusCode = 409;
  }

  if(error instanceof JsonWebTokenError){
    message ="Invalid Token";
    statusCode = 401;
  }
  if (error instanceof TokenExpiredError){
    message = "Token Expired";
    statusCode = 401;
  }

  res.status(statusCode).json({
    message,
    status,
    success,
    data: null,
    stack: error?.stack ?? null,
    errors: error?.errors ?? null,
  });
};
