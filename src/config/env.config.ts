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
  JWT_SECRET_KEY:process.env.JWT_SECRET_KEY!!,

  //!cookies
  COOKIE_EXPIRY: process.env.COOKIE_EXPIRY ?? 7,

  //!smtp
};
