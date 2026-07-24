//name
// description
// image
import mongoose from "mongoose";
import ImageSchema from "./image.model";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    description: {
      type: String,
      minLength: [10, "description must be at least 10 character long"],
    },
    image: {
      type: ImageSchema,
      required: [true, "image is required"],
    },
  },
  { timestamps: true },
);

//*model
const Category = mongoose.model("category",categorySchema);
export default Category;