"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_model_1 = __importDefault(require("./image.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: 3,
        maxLength: 200,
    },
    description: {
        type: String,
        minLength: 50,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    //brand:werc2344fdf244
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "brand",
        required: [true, "brand is required"],
    },
    cover_image: {
        type: image_model_1.default,
        required: [true, "cover_image is required"],
    },
    images: {
        type: image_model_1.default,
        default: null,
    },
    is_featured: {
        type: Boolean,
        default: false,
    },
    new_arrival: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
