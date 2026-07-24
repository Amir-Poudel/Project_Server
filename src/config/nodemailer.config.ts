import nodemailer from "nodemailer";
import { ENV_CONFIG } from "./env.config";

//*node mailer transporter
export const transporter  = nodemailer.createTransport({
    host:ENV_CONFIG.SMTP_HOST,
    service:ENV_CONFIG.SMTP_SERVICE,
    port:ENV_CONFIG.SMTP_PORT, //587
    secure:ENV_CONFIG.SMTP_PORT === 465,
    auth:{
        user:ENV_CONFIG.SMTP_USER,
        pass:ENV_CONFIG.SMTP_PASS,
    },
});
export const verifySmtp = async ()=>{
    try {
        await transporter.verify();
        console.log("server is ready to send email");

    } catch (error) {
        console.log(error);
        
    }
}