"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const jwt_utils_1 = require("../utils/jwt.utils");
const authenticate = (roles) => {
    return (req, res, next) => {
        try {
            //*1.get JWT token
            // console.log(req.headers);
            //   console.log(req.cookies);
            const access_token = req.cookies["access_token"];
            console.log(access_token);
            if (!access_token) {
                throw new appError_utils_1.default("unauthorized. Token required", 401);
            }
            //*2.verify token
            const decoded_data = (0, jwt_utils_1.verifyToken)(access_token);
            console.log(decoded_data);
            if (!decoded_data) {
                throw new appError_utils_1.default("unauthorized. Invalid token", 401);
            }
            //*3.check user role
            if (roles && roles.length > 0 && !roles.includes(decoded_data.role)) {
                throw new appError_utils_1.default("can not access this resource", 403);
            }
            req.user = {
                _id: decoded_data._id,
                email: decoded_data.email,
                role: decoded_data.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
