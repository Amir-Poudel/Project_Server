import { NextFunction, Request, Response } from "express";
import { Role } from "../types/enum.types";
import AppError from "../utils/appError.utils";
import { verifyToken } from "../utils/jwt.utils";

export const authenticate = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      //*1.get JWT token
      // console.log(req.headers);
      //   console.log(req.cookies);
      const access_token = req.cookies["access_token"];
      console.log(access_token);
      if (!access_token) {
        throw new AppError("unauthorized. Token required", 401);
      }

      //*2.verify token
      const decoded_data = verifyToken(access_token);
      console.log(decoded_data);

      if (!decoded_data) {
        throw new AppError("unauthorized. Invalid token", 401);
      }

      //*3.check user role
      if (roles && roles.length > 0 && !roles.includes(decoded_data.role)) {
        throw new AppError("can not access this resource", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
