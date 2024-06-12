import { model, Schema } from "mongoose";
import { IUser, TUserName } from "./user.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    minlength: [3, "Name must be greater than 3 characters"],
    maxlength: [25, "Name must be less than 25 characters"],
  },
  middleName: {
    type: String,
    trim: true,
    minlength: [3, "Name must be greater than 3 characters"],
    maxlength: [25, "Name must be less than 25 characters"],
  },
  lastName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    minlength: [3, "Name must be greater than 3 characters"],
    maxlength: [25, "Name must be less than 25 characters"],
  },
});
const userSchema = new Schema<IUser>(
  {
    name: userNameSchema,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
