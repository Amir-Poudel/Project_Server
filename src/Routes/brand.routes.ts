import express from "express";
import { getAll } from "../controllers/brand.controller";

const router = express.Router();

//*getAll
router.get("/", getAll);

export default router;
