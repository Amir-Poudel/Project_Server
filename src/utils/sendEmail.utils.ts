import { transporter } from "../config/nodemailer.config";
import { ENV_CONFIG } from "../config/env.config";

interface IMailOption {
  to: string | string[];
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: any[];
}

export const sendEmail = async ({
  to,
  subject,
  html,
  cc,
  bcc,
  attachments,
}: IMailOption) => {
  try {
    const messageOption: any = {
      to: "aarati.poudel2000@gmail.com",
      from: ENV_CONFIG.SMTP_MAIL_FROM,
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

    await transporter.sendMail(messageOption);
    console.log("email sent");
  } catch (error) {
    console.log(error);
  }
};
