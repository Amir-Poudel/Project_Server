"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_config_1 = require("../config/nodemailer.config");
const env_config_1 = require("../config/env.config");
const sendEmail = async ({ to, subject, html, cc, bcc, attachments, }) => {
    try {
        const messageOption = {
            to: to,
            from: env_config_1.ENV_CONFIG.SMTP_MAIL_FROM,
            subject: subject,
            html: html,
        };
        if (cc) {
            messageOption["cc"] = cc;
        }
        if (bcc) {
            messageOption["bcc"] = bcc;
        }
        if (attachments) {
            messageOption["attachments"] = attachments;
        }
        await nodemailer_config_1.transporter.sendMail(messageOption);
        console.log("email sent");
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendEmail = sendEmail;
