import mongoose from "mongoose";
import { Role } from "./enum.types";

export interface IJwtPayload {
  _id: mongoose.Types.ObjectId;
  email: string;
  role: Role;
}
