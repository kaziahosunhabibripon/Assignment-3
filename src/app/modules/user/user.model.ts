import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { IUser, UserModel } from "./user.interface";
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: 0,
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
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds)
  );
  next();
});


userSchema.methods.toJSON = function () {
  const { password, ...userWithoutPassword } = this.toObject();
  return userWithoutPassword;
};

// password verification for login User

userSchema.statics.isUserExistByEmail = async function (email) {
  return await User.findOne({ email }).select("+password");
};
userSchema.statics.isUserPasswordMatched = async function (
  givenPassword,
  hashedPassword
) {
  return await bcrypt.compare(givenPassword, hashedPassword);
};
export const User = model<IUser, UserModel>("User", userSchema);
