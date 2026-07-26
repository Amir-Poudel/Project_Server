"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const category_model_1 = __importDefault(require("../Models/category.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
//*get all
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const categories = await category_model_1.default.find({});
    //*send success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: categories,
        message: "categories fetched",
        statusCode: 200,
    });
});
//*get by id
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const category = await category_model_1.default.findOne({ _id: id });
    if (!category)
        throw new appError_utils_1.default("category not found", 404);
    //*send success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: category,
        message: "category fetched",
        statusCode: 200,
    });
});
//*create
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, description } = req.body;
    const file = req.file;
    if (!file)
        throw new appError_utils_1.default("cover_image is required", 400);
    if (!name)
        throw new appError_utils_1.default("name is required", 400);
    const category = new category_model_1.default({ name, description });
    const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/categories");
    category.image = {
        path,
        public_id,
    };
    await category.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "category created",
        data: category,
        statusCode: 201,
    });
});
//*update
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;
    const category = await category_model_1.default.findOne({ _id: id });
    if (!category)
        throw new appError_utils_1.default("category not found", 400);
    if (name)
        category.name = name;
    if (description)
        category.description = description;
    if (file) {
        //!delete old image
        await (0, cloudinary_utils_1.deleteFileFromcloudinary)(category.image.public_id);
        //*upload new image
        const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/categories");
        category.image = {
            path,
            public_id,
        };
    }
    await category.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "category updated",
        data: category,
        statusCode: 200,
    });
});
//*delete
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const category = await category_model_1.default.findOne({ _id: id });
    if (!category)
        throw new appError_utils_1.default("category not found", 404);
    await (0, cloudinary_utils_1.deleteFileFromcloudinary)(category.image.public_id);
    await category.deleteOne();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "category deleted",
        data: null,
        statusCode: 200,
    });
});
