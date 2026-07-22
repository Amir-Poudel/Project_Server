import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {Role} from "../types/enum.types"




export const generateJwtToken = (payload:IJwtPayload)=>{
    try {
        const token = jwt.sign(payload,"dgfjdhfkkff",{
            expiresIn: ENV_CONFIG.JWT_EXPIRES_IN as any,
        });
        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}