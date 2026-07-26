"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySmtp = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = require("./env.config");
//*node mailer transporter
exports.transporter = nodemailer_1.default.createTransport({
    host: env_config_1.ENV_CONFIG.SMTP_HOST,
    service: env_config_1.ENV_CONFIG.SMTP_SERVICE,
    port: env_config_1.ENV_CONFIG.SMTP_PORT, //587
    secure: env_config_1.ENV_CONFIG.SMTP_PORT === 465,
    auth: {
        user: env_config_1.ENV_CONFIG.SMTP_USER,
        pass: env_config_1.ENV_CONFIG.SMTP_PASS,
    },
});
const verifySmtp = async () => {
    try {
        await exports.transporter.verify();
        console.log("server is ready to send email");
    }
    catch (error) {
        console.log(error);
    }
};
exports.verifySmtp = verifySmtp;
