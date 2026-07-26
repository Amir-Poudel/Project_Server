"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z
            .string({
            error: (issue) => issue.input === undefined
                ? "full_name is required"
                : "full_name must be a string",
        })
            .min(1, "full_name is required")
            .max(100, "full_name can not exceed 100 characters"),
        user_name: zod_1.z
            .string({
            error: (issue) => issue.input === undefined
                ? "user_name is required"
                : "user_name must be a string",
        })
            .min(1, "user_name is required")
            .max(100, "user_name can not exceed 100 characters"),
        email: zod_1.z.email("Invalid email").min(1, "email is required"),
        password: zod_1.z
            .string({
            error: (issue) => issue.input === undefined
                ? "password is required"
                : "password must be string",
        })
            .min(6, "minimun 6 characters required"),
    }),
});
//login schema
//email, password
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined ? "email is required" : "Invalid email",
        }),
        password: zod_1.z.string({
            error: (issue) => issue.input === undefined
                ? "password is required"
                : "password must be a string",
        }),
    }),
});
