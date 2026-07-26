"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// name description, logo
const mongoose_1 = __importDefault(require("mongoose"));
//*schema
const brandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "full_name is required"],
        trim: true,
        unique: [true, "brand already exists"],
        minLength: [3, "name must be 3 characters long."],
    },
    description: {
        type: String,
        minLength: [10, "description must be atleast 10 characters long."],
    },
    logo: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Brand = mongoose_1.default.model("brand", brandSchema);
exports.default = Brand;
