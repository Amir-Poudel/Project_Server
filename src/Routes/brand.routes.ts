import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/brand.controller";
import { multerUploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";

const router = express.Router();
const upload = multerUploader();

//*getAll
router.get("/", getAll);

//*get by Id
router.get("/:id", getById);

//*create
router.post(
  "/",
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  upload.single("logo"),
  create,
);

//*update
router.put(
  "/:id",
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  upload.single("logo"),
  update,
);

//*delete
router.delete("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), remove);

export default router;
