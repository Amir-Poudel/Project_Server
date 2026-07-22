import { NextFunction, Request, Response } from "express";
import User from "../Models/user.model";
import { hashPassword, comparePassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import { ENV_CONFIG } from "../config/env.config";

//*register
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { full_name, email, password, user_name } = req.body;

    if (!full_name) {
      // const error: any = new Error("full_name is required");
      // error.status = "fail";
      // error.statusCode = 400;
      // throw error;
      throw new AppError("Full_name is required", 400);
    }

    if (!email) {
      // const error: any = new Error("Email is required");
      // error.status = "fail";
      // error.statusCode = 400;
      // throw error;
      throw new AppError("Email is required", 400);
    }
    if (!password) {
      // const error: any = new Error("Password is required");
      // error.status = "fail";
      // error.statusCode = 400;
      // throw error;
      throw new AppError("Password is required", 400);
    }

    const user = new User({ full_name, email, user_name });

    //*password hash
    const hash = await hashPassword(password);
    user.password = hash;
    // user.password = password;

    //*upload profile image

    //*save user
    await user.save();

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
      _id: user.id,
      email: user.email,
      role: user.role,
    });

    //*convert user doc to object
    const { password: _, ...rest } = user.toObject();

    //* set-cookie header ->
    res.cookie("access_token",access_token,{
      maxAge: Number(ENV_CONFIG.COOKIE_EXPIRY?? "7")*24*60*60*1000,
      httpOnly: ENV_CONFIG.NODE_ENV === "development"? false:true,
      secure:ENV_CONFIG.NODE_ENV === "development"? false:true,
      sameSite:ENV_CONFIG.NODE_ENV === "development"? false:true,

    })

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
