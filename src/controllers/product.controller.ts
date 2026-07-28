import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Product from "../models/product.model";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";
import {
  deleteFileFromcloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils";

//*getAll

export const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Products = await Product.find({});

    sendResponse(res, {
      data: Products,
      message: "All products fetched",
      statusCode: 200,
    });
  },
);

//*getById

export const getById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const products = await Product.findOne({ _id: id });

    if (!products) throw new AppError("product not found.", 404);

    sendResponse(res, {
      data: products,
      message: `product fetched with ${id}`,
      statusCode: 200,
    });
  },
);

//*create

export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, brand } = req.body;
    const file = req.file;

    if (!file) throw new AppError("cover_image is required", 400);
    if (!name) throw new AppError("name is required", 400);
    if (!description) throw new AppError("description is required", 400);
    if (!price) throw new AppError("price is required", 404);
    if (!brand) throw new AppError("brand is required", 404);

    const product = new Product({ name, description, price, brand });
    const { path, public_id } = await uploadFileToCloudinary(file, "/products");

    product.cover_image = {
      path,
      public_id,
    };

    await product.save();

    sendResponse(res, {
      data: product,
      message: "product created",
      statusCode: 201,
    });
  },
);

//*update

export const update = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, price, brand } = req.body;
    const file = req.file;

    const product = await Product.findOne({ _id: id });

    if (!product) throw new AppError("product not found", 400);
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (brand) product.brand = brand;

    if (file) {
      //delete old image
      await deleteFileFromcloudinary(product.cover_image.public_id);
      //upload new image
      const { path, public_id } = await uploadFileToCloudinary(
        file,
        "/products",
      );

      product.cover_image = {
        path,
        public_id,
      };
    }

    await product.save();

    sendResponse(res, {
      data: product,
      message: "product updated successfully",
      statusCode: 200,
    });
  },
);

//*delete
export const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (!product) throw new AppError("product not found", 400);

    if (product) {
      await deleteFileFromcloudinary(product.cover_image.public_id);

      await product.deleteOne();
    }
    sendResponse(res, {
      data: null,
      message: "product deleted",
      statusCode: 200,
    });
  },
);
