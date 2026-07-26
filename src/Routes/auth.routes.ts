import express from "express";

import { changePassword, getProfile, login, logout, register } from "../controllers/auth.controller";
import { loginSchema, registerUserSchema } from "../validators/auth.validators";
import { validator } from "../middlewares/validator.middleware";
import { multerUploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

const upload = multerUploader();

//*register account
router.post(
  "/register",
  upload.single("profile_image"), //*multer upload middleware
  validator(registerUserSchema),
  register,
);

router.post("/login",validator(loginSchema), login);
router.post("/logout",logout);
router.post("/profile",authenticate(),getProfile);
router.post("/chnage_password",authenticate(),changePassword);


export default router;
