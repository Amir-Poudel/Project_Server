"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validator = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        //*if validation fails
        if (!result.success) {
            const errors = result.error.issues.map(({ path, message }) => {
                return {
                    path: path.join("."),
                    message,
                };
            });
            return next({
                message: "validation error",
                statusCode: 400,
                status: "fail",
                errors,
            });
        }
        //*if validation success
        req.body = result.data.body;
        req.params = result.data.params;
        Object.assign(req.query, result.data.query);
        next();
    };
};
exports.validator = validator;
