//*get all

import { NextFunction, request, Request, Response } from "express";
import Brand from "../Models/brand.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import {
  deleteFileFromcloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils";

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

export const create = catchAsync(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const file = req.file;
  if (!file) throw new AppError("cover_image is required", 400);
  if (!name) throw new AppError("name is required", 400);

  const brand = new Brand({ name, description });

  const { path, public_id } = await uploadFileToCloudinary(file, "/brands");

  brand.logo = {
    path,
    public_id,
  };

  await brand.save();

  //*send response
  sendResponse(res, {
    data: brand,
    message: "Brand created",
    statusCode: 200,
  });
});

//*update
export const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = request.params;
  const { name, description } = req.body;
  const file = req.file;
  const brand = await Brand.findOne({ _id: id });

  if (!brand) throw new AppError("brand not found", 404);

  if (name) brand.name = name;
  if (description) brand.description;

  if (file) {
    //!delete old logo
    deleteFileFromcloudinary(brand.logo.public_id);

    //*upload new logo
    const { path, public_id } = await uploadFileToCloudinary(file, "/brands");

    brand.logo = {
      path,
      public_id,
    };
  }

  await brand.save();

  sendResponse(res, {
    message: "brand updated",
    data: brand,
    statusCode: 200,
  });
});

//*delete
export const remove = catchAsync(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findOne({ _id: id });
  if (!brand) throw new AppError("brand not found", 404);
  deleteFileFromcloudinary(brand.logo.public_id);

  await brand.deleteOne();

  sendResponse(res, {
    message: "brand deleted",
    data: null,
    statusCode: 200,
  });
});
