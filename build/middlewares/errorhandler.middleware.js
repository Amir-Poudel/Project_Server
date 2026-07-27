"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandler = (error, req, res, next) => {
    let statusCode = error?.statusCode ?? 500;
    let message = error?.message ?? "Internal Server Error";
    const status = error?.status ?? "error";
    const success = false;
    // if (error instanceof MongooseError) {
    if (error?.cause?.code === 11000) {
        statusCode = 409;
    }
    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        message = "Invalid Token";
        statusCode = 401;
    }
    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
        message = "Token Expired";
        statusCode = 401;
    }
    res.status(statusCode).json({
        message,
        status,
        success,
        data: null,
        stack: error?.stack ?? null,
        errors: error?.errors ?? null,
    });
};
exports.default = errorHandler;
