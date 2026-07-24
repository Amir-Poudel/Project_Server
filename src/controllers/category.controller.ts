import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Category from "../Models/category.model";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";
import {
  deleteFileFromcloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils";

//*get all
export const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find({});

    //*send success response
    sendResponse(res, {
      data: categories,
      message: "categories fetched",
      statusCode: 200,
    });
  },
);

//*get by id
export const getById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });

    if (!category) throw new AppError("category not found", 404);
    //*send success response
    sendResponse(res, {
      data: category,
      message: "category fetched",
      statusCode: 200,
    });
  },
);

//*create
export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const file = req.file;
    if (!file) throw new AppError("cover_image is required", 400);
    if (!name) throw new AppError("name is required", 400);

    const category = new Category({ name, description });
    const { path, public_id } = await uploadFileToCloudinary(
      file,
      "/categories",
    );

    category.image = {
      path,
      public_id,
    };

    await category.save();

    sendResponse(res, {
      message: "category created",
      data: category,
      statusCode: 201,
    });
  },
);

//*update
export const update = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;

    const category = await Category.findOne({ _id: id });

    if (!category) throw new AppError("category not found", 400);
    if (name) category.name = name;
    if (description) category.description = description;

    if (file) {
      //!delete old image
      await deleteFileFromcloudinary(category.image.public_id);
      //*upload new image
      const { path, public_id } = await uploadFileToCloudinary(
        file,
        "/categories",
      );

      category.image = {
        path,
        public_id,
      };
    }
    await category.save();

    sendResponse(res, {
      message: "category updated",
      data: category,
      statusCode: 200,
    });
  },
);

//*delete
export const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });

    if (!category) throw new AppError("category not found", 404);

    await deleteFileFromcloudinary(category.image.public_id);

    await category.deleteOne();

    sendResponse(res, {
      message: "category deleted",
      data: null,
      statusCode: 200,
    });
  },
);
