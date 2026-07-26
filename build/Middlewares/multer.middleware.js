"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const multerUploader = () => {
    const folder = "uploads/";
    const fileSize = 5 * 1024 * 1024; //*5MB
    const allowedExt = [".jpg", ".png", ".jpeg", ".web", ".svg", ".pdf"];
    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/svg+xml",
        "application/pdf",
    ];
    if (!fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder, { recursive: true });
    }
    //!multer disk storage
    const myStorage = multer_1.default.diskStorage({
        destination: (_, __, cb) => {
            cb(null, folder);
        },
        filename: (_, file, cb) => {
            const filename = Date.now() + "-" + file.originalname;
            cb(null, filename);
        },
    });
    //*File filter function
    const fileFilter = (_, file, cb) => {
        if (!allowedExt.includes(path_1.default.extname(file.originalname).toLowerCase())) {
            cb(new appError_utils_1.default('${file.originalname} is not accepted. Only ${allowedExt.join(",")} extensions are allowed', 400));
        }
        //*check file mine type
        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(new appError_utils_1.default('${file.originalname} is not accepted. Only ${allowedMimeTypes.join(",")} file types are allowed', 400));
        }
        //*accept file
        cb(null, true);
    };
    //!multer upload instance
    const upload = (0, multer_1.default)({
        storage: myStorage,
        fileFilter: fileFilter,
        limits: { fileSize: fileSize },
    });
    return upload;
};
exports.multerUploader = multerUploader;
