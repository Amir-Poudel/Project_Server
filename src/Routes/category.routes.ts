import { getAll, getById, create,update,remove } from "../controllers/category.controller";
import { multerUploader } from "../middlewares/multer.middleware";
import  express from "express";

const router = express.Router();
const upload = multerUploader();

//*get all
router.get("/",getAll);

//*get by id
router.get("/:id",getById);

//*create
router.post("/",upload.single("image"),create);

//*update
router.put("/",upload.single("image"),update);

//*delete
router.delete("/:id",remove);

export default router;