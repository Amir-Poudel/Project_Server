import "dotenv/config";

//! zod validate

export const ENV_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT!!,
  DB_URI: process.env.DB_URI!!,

  //!cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!!,

  //!jwt
  JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN!!,
  JWT_SECRET:process.env.JWT_SECRET!!,

  //!cookies
  COOKIE_EXPIRY: process.env.COOKIE_EXPIRY ?? 7,

  //!smtp
SMTP_HOST: process.env.SMTP_HOST,
SMTP_PORT:Number(process.env.SMTP_PORT)??587,
SMTP_SERVICE: process.env.SMTP_SERVICE,
SMTP_USER:process.env.SMTP_USER,
SMTP_PASS: process.env.SMTP_PASS,
SMTP_MAIL_FROM: process.env.SMTP_MAIL_FROM,
}