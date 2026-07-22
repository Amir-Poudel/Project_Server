import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import AppError from "../utils/appError.utils";

export const multerUploader = () => {
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

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  //!multer disk storage
  const myStorage = multer.diskStorage({
    destination: (_: Request, __: Express.Multer.File, cb) => {
      cb(null, folder);
    },
    filename: (_: Request, file, cb) => {
      const filename = Date.now() + "-" + file.originalname;
      cb(null, filename);
    },
  });

  //*File filter function
  const fileFilter = (
    _: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (!allowedExt.includes(path.extname(file.originalname).toLowerCase())) {
      cb(
        new AppError(
          '${file.originalname} is not accepted. Only ${allowedExt.join(",")} extensions are allowed',
          400,
        ),
      );
    }
    //*check file mine type
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(
        new AppError(
          '${file.originalname} is not accepted. Only ${allowedMimeTypes.join(",")} file types are allowed',
          400,
        ),
      );
    }

    //*accept file
    cb(null, true);
  };

  //!multer upload instance
  const upload = multer({
    storage: myStorage,
    fileFilter: fileFilter,
    limits: { fileSize: fileSize },
  });

  return upload;
};
