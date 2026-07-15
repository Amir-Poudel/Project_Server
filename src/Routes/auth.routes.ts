import express from "express";

import { register } from "../controllers/auth.controller";
import { registerUserSchema } from "../validators/auth.validators";
import { validator } from "../middlewares/validator.middleware";

const router = express.Router();

//*register account
router.post("/register", validator(registerUserSchema), register);

// router.post("/login");

export default router;
