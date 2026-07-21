//*get all

import { NextFunction, request, Request, Response } from "express";
import Brand from "../Models/brand.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";

export const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const brands = await Brand.find({});

    //*send success response
    sendResponse(res, {
      data: brands,
      message: "brands fetched",
      statusCode: 200,
    });
  },
);

//*get by Id

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = request.params;
  const brands = await Brand.findOne({ _id: id });

  if (!brands) throw new AppError("brand not found", 404);

  // export const getById = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) => {
  //   try {
  //     const id = req.params.id;
  //     const brands = await Brand.findOne({ _id: id });

  //*send Response
  sendResponse(res, {
    data: brands,
    message: "Brand fetched by Id",
    statusCode: 200,
  });
});

//*create

export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const brands = await Brand.find({});
    //*send response
    sendResponse(res, {
      data: brands,
      message: "Brand created",
      statusCode: 200,
    });
  },
);

//*update

//*delete
