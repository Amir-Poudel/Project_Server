"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorhandler_middleware_1 = require("./middlewares/errorhandler.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//npm i -D @types/express //npm i --save-dev @types/express
//* importing routes
const auth_routes_1 = __importDefault(require("./Routes/auth.routes"));
const brand_routes_1 = __importDefault(require("./Routes/brand.routes"));
const category_routes_1 = __importDefault(require("./Routes/category.routes"));
//*express app instance
const app = (0, express_1.default)();
//!using middleware
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
//! health check route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is up and running!!!",
        success: true,
        status: "success",
        data: null,
    });
});
//!using routes
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/brands", brand_routes_1.default);
app.use("/api/v1/categories", category_routes_1.default);
// app.use("/api/v2/auth",authRoutes);
//!using path not found route
app.use((req, res, next) => {
    const message = `can not ${req.method} on ${req.path}`;
    const error = new Error(message);
    error.status = "fail";
    error.statusCode = 404;
    //   res.status(404).json({
    //     message,
    //     status: "fail",
    //     success: false,
    //     data: null,
    //   });
    next(error);
});
//!error handler middleware
app.use(errorhandler_middleware_1.errorHandler);
exports.default = app;
