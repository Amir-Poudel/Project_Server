import express from "express";

import { register } from "../controllers/auth.controller";
import { registerUserSchema } from "../validators/auth.validators";
import { validator } from "../middlewares/validator.middleware";
import { multerUploader } from "../middlewares/multer.middleware";

const router = express.Router();

const upload = multerUploader();

//*register account
router.post(
  "/register",
  upload.single("profile_image"), //*multer upload middleware
  validator(registerUserSchema),
  register,
);

// router.post("/login");

export default router;
