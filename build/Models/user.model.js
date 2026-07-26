"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../types/enum.types");
const image_model_1 = __importDefault(require("./image.model"));
//*schema
const userSchema = new mongoose_1.default.Schema({
    full_name: {
        type: String,
        required: [true, "full_name is required"],
        trim: true,
        minLength: [3, "name must be 3 characters long."],
    },
    user_name: {
        type: String,
        required: [true, "user_name is required"],
        trim: true,
        minLength: [3, "name must be 3 characters long."],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "User already exists with provided email"],
        trim: true,
        // match:[regex, ""],
        // validate(obj, errorMsg, type) {}
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false,
    },
    role: {
        type: String,
        enum: Object.values(enum_types_1.Role),
        default: enum_types_1.Role.USER,
    },
    profile_image: {
        type: image_model_1.default,
        default: null,
    },
}, { timestamps: true });
//*model
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
