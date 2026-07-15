// name description, logo
import mongoose from "mongoose";

// enum Role {
//   USER = "USER",
//   ADMIN = "ADMIN",
// }

//*user interface
interface IBrand extends Document {
  name: string;
  email: string;
  logo: string;
  description?: string;
}

//*schema
const brandSchema = new mongoose.Schema<IBrand>(
  {
    name: {
      type: String,
      required: [true, "full_name is required"],
      trim: true,
      unique: [true, "brand already exists"],
      minLength: [3, "name must be 3 characters long."],
    },
    description: {
      type: String,
      minLength: [10, "description must be atleast 10 characters long."],
    },
    logo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);
const Brand = mongoose.model<IBrand>("brand", brandSchema);
export default Brand;
