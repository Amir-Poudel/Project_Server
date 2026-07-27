"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    message;
    statusCode;
    status;
    success;
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith("4") ? "fail" : "error";
        this.success = false;
        Error.captureStackTrace(this, AppError);
    }
}
exports.default = AppError;
