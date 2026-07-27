"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//name
// description
// image
const mongoose_1 = __importDefault(require("mongoose"));
const image_model_1 = __importDefault(require("./image.model"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    description: {
        type: String,
        minLength: [10, "description must be at least 10 character long"],
    },
    image: {
        type: image_model_1.default,
        required: [true, "image is required"],
    },
}, { timestamps: true });
//*model
const Category = mongoose_1.default.model("category", categorySchema);
exports.default = Category;
