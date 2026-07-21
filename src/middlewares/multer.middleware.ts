import { Request } from "express";
import multer from "multer";
import fs from "fs";

export const multerUploader = () => {
  const folder = "uploads/";

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
  //!multer upload instance
  const upload = multer({ storage: myStorage });
  return upload;
};
