import { NextFunction, Request, Response } from "express";
import { MongooseError } from "mongoose";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = error?.statusCode ?? 500;
  const message = error?.message ?? "Internal Server Error";
  const status = error?.status ?? "error";
  const success = false;

  // if (error instanceof MongooseError) {
  if (error?.cause?.code === 11000)
  {
    statusCode = 409;
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
