"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const generateJwtToken = (payload) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, env_config_1.ENV_CONFIG.JWT_SECRET, {
            // algorithm: ES256
            expiresIn: env_config_1.ENV_CONFIG.JWT_EXPIRES_IN,
        });
        return token;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.generateJwtToken = generateJwtToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_config_1.ENV_CONFIG.JWT_SECRET);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.verifyToken = verifyToken;
