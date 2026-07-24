import express from "express";
import { create, getAll, getById, remove, update } from "../controllers/brand.controller";
import { multerUploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();
const upload = multerUploader();

//*getAll
router.get("/",authenticate(), getAll);

//*get by Id
router.get('/:id',getById);

//*create
router.post("/",upload.single("logo") ,create);

//*update
router.put("/:id",upload.single("logo"),update);

//*delete
router.delete("/:id",remove);

export default router;
