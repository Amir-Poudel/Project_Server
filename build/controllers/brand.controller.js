"use strict";
//*get all
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const express_1 = require("express");
const brand_model_1 = __importDefault(require("../models/brand.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const brands = await brand_model_1.default.find({});
    //*send success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: brands,
        message: "brands fetched",
        statusCode: 200,
    });
});
//*get by Id
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const id = express_1.request.params;
    const brands = await brand_model_1.default.findOne({ _id: id });
    if (!brands)
        throw new appError_utils_1.default("brand not found", 404);
    // export const getById = async (
    //   req: Request,
    //   res: Response,
    //   next: NextFunction,
    // ) => {
    //   try {
    //     const id = req.params.id;
    //     const brands = await Brand.findOne({ _id: id });
    //*send Response
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: brands,
        message: "Brand fetched by Id",
        statusCode: 200,
    });
});
//*create
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description } = req.body;
    const file = req.file;
    if (!file)
        throw new appError_utils_1.default("cover_image is required", 400);
    if (!name)
        throw new appError_utils_1.default("name is required", 400);
    const brand = new brand_model_1.default({ name, description });
    const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/brands");
    brand.logo = {
        path,
        public_id,
    };
    await brand.save();
    //*send response
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: brand,
        message: "Brand created",
        statusCode: 200,
    });
});
//*update
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = express_1.request.params;
    const { name, description } = req.body;
    const file = req.file;
    const brand = await brand_model_1.default.findOne({ _id: id });
    if (!brand)
        throw new appError_utils_1.default("brand not found", 404);
    if (name)
        brand.name = name;
    if (description)
        brand.description;
    if (file) {
        //!delete old logo
        await (0, cloudinary_utils_1.deleteFileFromcloudinary)(brand.logo.public_id);
        //*upload new logo
        const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/brands");
        brand.logo = {
            path,
            public_id,
        };
    }
    await brand.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "brand updated",
        data: brand,
        statusCode: 200,
    });
});
//*delete
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findOne({ _id: id });
    if (!brand)
        throw new appError_utils_1.default("brand not found", 404);
    await (0, cloudinary_utils_1.deleteFileFromcloudinary)(brand.logo.public_id);
    await brand.deleteOne();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "brand deleted",
        data: null,
        statusCode: 200,
    });
});
