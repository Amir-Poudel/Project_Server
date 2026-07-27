"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../controllers/brand.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUploader)();
//*getAll
router.get("/", brand_controller_1.getAll);
//*get by Id
router.get("/:id", brand_controller_1.getById);
//*create
router.post("/", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), upload.single("logo"), brand_controller_1.create);
//*update
router.put("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), upload.single("logo"), brand_controller_1.update);
//*delete
router.delete("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), brand_controller_1.remove);
exports.default = router;
