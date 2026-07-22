import cloudinary from "../config/cloudinary.config";
import AppError from "./appError.utils";
import fs from "fs";

export const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  dir = "/",
) => {
  try {
    const uploadFolder = "mern_project"+ dir;

    const {secure_url:path,public_id} = await cloudinary.uploader.upload(file.path,{
        unique_filename:true,
        folder: uploadFolder,
    });

    //*delete from local uploads folder
    if(fs.existsSync(file.path)){
        fs.unlinkSync(file.path)
    }

    return{path,public_id}

  } catch (error) {
    console.log(error);
    throw new AppError("Something went wrong", 500);
  }
};

//*delete file from cloudinary
