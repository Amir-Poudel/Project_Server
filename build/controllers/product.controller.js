"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
//*getAll
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const Products = await product_model_1.default.find({});
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: Products,
        message: "All products fetched",
        statusCode: 200,
    });
});
//*getById
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const products = await product_model_1.default.findOne({ _id: id });
    if (!products)
        throw new appError_utils_1.default("product not found.", 404);
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: products,
        message: `product fetched with ${id}`,
        statusCode: 200,
    });
});
//*create
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, description, price, brand } = req.body;
    const file = req.file;
    if (!file)
        throw new appError_utils_1.default("cover_image is required", 400);
    if (!name)
        throw new appError_utils_1.default("name is required", 400);
    if (!description)
        throw new appError_utils_1.default("description is required", 400);
    if (!price)
        throw new appError_utils_1.default("price is required", 404);
    if (!brand)
        throw new appError_utils_1.default("brand is required", 404);
    const product = new product_model_1.default({ name, description, price, brand });
    const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/products");
    product.cover_image = {
        path,
        public_id,
    };
    await product.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: product,
        message: "product created",
        statusCode: 201,
    });
});
//*update
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, brand } = req.body;
    const file = req.file;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product)
        throw new appError_utils_1.default("product not found", 400);
    if (name)
        product.name = name;
    if (description)
        product.description = description;
    if (price)
        product.price = price;
    if (brand)
        product.brand = brand;
    if (file) {
        //delete old image
        await (0, cloudinary_utils_1.deleteFileFromcloudinary)(product.cover_image.public_id);
        //upload new image
        const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/products");
        product.cover_image = {
            path,
            public_id,
        };
    }
    await product.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: product,
        message: "product updated successfully",
        statusCode: 200,
    });
});
//*delete
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product)
        throw new appError_utils_1.default("product not found", 400);
    if (product) {
        await (0, cloudinary_utils_1.deleteFileFromcloudinary)(product.cover_image.public_id);
        await product.deleteOne();
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: null,
        message: "product deleted",
        statusCode: 200,
    });
});
