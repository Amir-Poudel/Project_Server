import mongoose from "mongoose";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

//*user interface
interface IUser extends Document {
  full_name: string;
  email: string;
  password: string;
  profile_image?: string;
  user_name: string;
  role: Role;
}

//*schema
const userSchema = new mongoose.Schema<IUser>(
  {
    full_name: {
      type: String,
      required: [true, "full_name is required"],
      trim: true,
      minLength: [3, "name must be 3 characters long."],
    },
    user_name: {
      type: String,
      required: [true, "user_name is required"],
      trim: true,
      minLength: [3, "name must be 3 characters long."],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "User already exists with provided email"],
      trim: true,
      // match:[regex, ""],
      // validate(obj, errorMsg, type) {}
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    profile_image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

//*model
const User = mongoose.model<IUser>("user", userSchema);

export default User;
