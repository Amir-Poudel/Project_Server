import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "../config/env.config";
import { IJwtPayload } from "../types/jwt.interface";

export const generateJwtToken = (payload: IJwtPayload) => {
  try {
    const token = jwt.sign(payload, ENV_CONFIG.JWT_SECRET_KEY, {
      expiresIn: ENV_CONFIG.JWT_EXPIRES_IN as any,
    });
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
