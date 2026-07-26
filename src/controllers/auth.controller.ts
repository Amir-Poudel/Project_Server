import { NextFunction, Request, Response } from "express";
import User from "../Models/user.model";
import { hashPassword, comparePassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import { ENV_CONFIG } from "../config/env.config";
import { uploadFileToCloudinary } from "../utils/cloudinary.utils";
import {
  generateAccountCreatedHtml,
  generateLoginSuccessHtml,
} from "../utils/emailTemplate.utlis";
import { sendEmail } from "../utils/sendEmail.utils";

//*register
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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

    const user = new User({ full_name, user_name, email });

    //*password hash
    const hash = await hashPassword(password);
    user.password = hash;
    // user.password = password;

    const file = req.file;

    //*upload profile image
    if (file) {
      // user.profile_image = file.path;
      // user.profile_image = '/uploads/1.jpg';
      //user.profile_image = {path:'https://cloudinary.com/uploads/1.jpg, public_id:uploads/1.jpg};
      const { path, public_id } = await uploadFileToCloudinary(
        file,
        "/profile_images",
      );
      user.profile_image = {
        path,
        public_id,
      };
    }

    //*save user
    await user.save();

    //*send account created email
    sendEmail({
      to: user.email,
      subject: "Account created",
      html: generateAccountCreatedHtml({
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
    sendResponse(res, {
      message: "Account created",
      data: rest,
      statusCode: 201,
    });
  },
);

//*login
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError("invalid credentails", 400);
    }

    //*compare password
    const isPassMatched = await comparePassword(password, user.password);

    if (!isPassMatched) {
      throw new AppError("invalid credentials", 400);
    }

    //todo:generate jwt token ->
    const access_token = generateJwtToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    //*convert user doc to object
    const { password: _, ...rest } = user.toObject();

    //* set-cookie header ->
    res.cookie("access_token", access_token, {
      maxAge: Number(ENV_CONFIG.COOKIE_EXPIRY ?? "7") * 24 * 60 * 60 * 1000,
      httpOnly: ENV_CONFIG.NODE_ENV === "development" ? false : true,
      secure: ENV_CONFIG.NODE_ENV === "development" ? false : true,
      sameSite: ENV_CONFIG.NODE_ENV === "development" ? "lax" : "none",
    });

    //*send login detected email
    sendEmail({
      to: user.email,
      subject: "New login Detected",
      html: generateLoginSuccessHtml({
        full_name: user.full_name,
        email: user.email,
        loginAt: new Date(Date.now()),
        userAgent: req.headers["user-agent"] as string,
      }),
    });

    //*send success response
    // res.status(201).json({
    //   message:"Login success!",
    //   data: rest,
    //   status: "success",
    //   success: true,
    // });
    sendResponse(res, {
      message: "Login success",
      data: { user: rest, access_token },
      statusCode: 201,
    });
  },
);

//*get profile
export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.user._id;
  const user = await User.findById(id);

  if (!user) throw new AppError("user not found", 404);

  sendResponse(res, {
    message: "profile fetched",
    data: user,
    statusCode: 200,
  });
});

//*logout
export const logout = catchAsync(async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: ENV_CONFIG.NODE_ENV === "development" ? false : true,
    secure: ENV_CONFIG.NODE_ENV === "development" ? false : true,
    sameSite: ENV_CONFIG.NODE_ENV === "development" ? "lax" : "none",
  });
  sendResponse(res, {
    message: "logout successful",
    statusCode: 200,
    data: null,
  });
});

//*change password

export const changePassword = catchAsync(async (req, res) => {
  const { old_password, new_password } = req.body;

  if (!old_password) throw new AppError("old password is required", 400);
  if (!new_password) throw new AppError("new password is required", 400);

  const user = await User.findById(req.user._id).select("+password");

  if (!user) throw new AppError("user not found", 404);

  const isPasswordMatched = await comparePassword(old_password, user.password);
  if (!isPasswordMatched) {
    throw new AppError("old password is incorrect", 400);
  }

  user.password = await hashPassword(new_password);
  await user.save();

  sendResponse(res, {
    message: "password changed successfully",
    data: null,
    statusCode: 200,
  });
});
