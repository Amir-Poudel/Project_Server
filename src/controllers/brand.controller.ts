//*get all

import { NextFunction, Request, Response } from "express";
import Brand from "../Models/brand.model";
import { sendResponse } from "../utils/sendResponse.utils";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const brands = await Brand.find({});

    //*send success response
    sendResponse(res, {
      data: brands,
      message: "brands fetched",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

//*get by Id

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const brands = await Brand.findOne({ _id: id });

    //*send Response
    sendResponse(res, {
      data: brands,
      message: "Brand fetched by Id",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

//*create

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const brands = await Brand.find({});
    //*send response
    sendResponse(res, {
      data: brands,
      message: "Brand created",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

//*update

//*delete
