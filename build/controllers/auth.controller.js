"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.logout = exports.getProfile = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../Models/user.model"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const env_config_1 = require("../config/env.config");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const emailTemplate_utlis_1 = require("../utils/emailTemplate.utlis");
const sendEmail_utils_1 = require("../utils/sendEmail.utils");
//*register
exports.register = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { full_name, user_name, email, password } = req.body;
    // if (!full_name) {
    // const error: any = new Error("full_name is required");
    // error.status = "fail";
    // error.statusCode = 400;
    // throw error;
    //   throw new AppError("Full_name is required", 400);
    // }
    // if (!email) {
    // const error: any = new Error("Email is required");
    // error.status = "fail";
    // error.statusCode = 400;
    // throw error;
    //   throw new AppError("Email is required", 400);
    // }
    // if (!password) {
    // const error: any = new Error("Password is required");
    // error.status = "fail";
    // error.statusCode = 400;
    // throw error;
    //   throw new AppError("Password is required", 400);
    // }
    const user = new user_model_1.default({ full_name, user_name, email });
    //*password hash
    const hash = await (0, bcrypt_utils_1.hashPassword)(password);
    user.password = hash;
    // user.password = password;
    const file = req.file;
    //*upload profile image
    if (file) {
        // user.profile_image = file.path;
        // user.profile_image = '/uploads/1.jpg';
        //user.profile_image = {path:'https://cloudinary.com/uploads/1.jpg, public_id:uploads/1.jpg};
        const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/profile_images");
        user.profile_image = {
            path,
            public_id,
        };
    }
    //*save user
    await user.save();
    //*send account created email
    (0, sendEmail_utils_1.sendEmail)({
        to: user.email,
        subject: "Account created",
        html: (0, emailTemplate_utlis_1.generateAccountCreatedHtml)({
            full_name: user.full_name,
            email: user.email,
            createdAt: new Date(Date.now()),
        }),
    });
    //*converting mongodb doc to js object
    const { password: user_pass, ...rest } = user.toObject();
    //*send success response
    // res.status(201).json({
    //   message: "Account created",
    //   status: "success",
    //   success: true,
    //   data: rest,
    // });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Account created",
        data: rest,
        statusCode: 201,
    });
});
//*login
exports.login = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new appError_utils_1.default("invalid credentails", 400);
    }
    //*compare password
    const isPassMatched = await (0, bcrypt_utils_1.comparePassword)(password, user.password);
    if (!isPassMatched) {
        throw new appError_utils_1.default("invalid credentials", 400);
    }
    //todo:generate jwt token ->
    const access_token = (0, jwt_utils_1.generateJwtToken)({
        _id: user._id,
        email: user.email,
        role: user.role,
    });
    //*convert user doc to object
    const { password: _, ...rest } = user.toObject();
    //* set-cookie header ->
    res.cookie("access_token", access_token, {
        maxAge: Number(env_config_1.ENV_CONFIG.COOKIE_EXPIRY ?? "7") * 24 * 60 * 60 * 1000,
        httpOnly: env_config_1.ENV_CONFIG.NODE_ENV === "development" ? false : true,
        secure: env_config_1.ENV_CONFIG.NODE_ENV === "development" ? false : true,
        sameSite: env_config_1.ENV_CONFIG.NODE_ENV === "development" ? "lax" : "none",
    });
    //*send login detected email
    (0, sendEmail_utils_1.sendEmail)({
        to: user.email,
        subject: "New login Detected",
        html: (0, emailTemplate_utlis_1.generateLoginSuccessHtml)({
            full_name: user.full_name,
            email: user.email,
            loginAt: new Date(Date.now()),
            userAgent: req.headers["user-agent"],
        }),
    });
    //*send success response
    // res.status(201).json({
    //   message:"Login success!",
    //   data: rest,
    //   status: "success",
    //   success: true,
    // });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Login success",
        data: { user: rest, access_token },
        statusCode: 201,
    });
});
//*get profile
exports.getProfile = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const id = req.user._id;
    const user = await user_model_1.default.findById(id);
    if (!user)
        throw new appError_utils_1.default("user not found", 404);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "profile fetched",
        data: user,
        statusCode: 200,
    });
});
//*logout
exports.logout = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: env_config_1.ENV_CONFIG.NODE_ENV === "development" ? false : true,
        secure: env_config_1.ENV_CONFIG.NODE_ENV === "development" ? false : true,
        sameSite: env_config_1.ENV_CONFIG.NODE_ENV === "development" ? "lax" : "none",
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "logout successful",
        statusCode: 200,
        data: null,
    });
});
//*change password
exports.changePassword = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { old_password, new_password } = req.body;
    if (!old_password)
        throw new appError_utils_1.default("old password is required", 400);
    if (!new_password)
        throw new appError_utils_1.default("new password is required", 400);
    const user = await user_model_1.default.findById(req.user._id).select("+password");
    if (!user)
        throw new appError_utils_1.default("user not found", 404);
    const isPasswordMatched = await (0, bcrypt_utils_1.comparePassword)(old_password, user.password);
    if (!isPasswordMatched) {
        throw new appError_utils_1.default("old password is incorrect", 400);
    }
    user.password = await (0, bcrypt_utils_1.hashPassword)(new_password);
    await user.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "password changed successfully",
        data: null,
        statusCode: 200,
    });
});
