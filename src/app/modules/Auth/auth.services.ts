import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import jwt from "jsonwebtoken";
const createUserIntoDB = async (payload: IUser) => {
  if (await User.isUserExistByEmail(payload.email)) {
    throw new AppError(httpStatus.CONFLICT, "User already exist on this email");
  }
  const result = await User.create(payload);
  return result;
};
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);
  let loggedInUser = JSON.parse(JSON.stringify(user));

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (!(await User.isUserPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });
  const token: string = `Bearer ${accessToken}`;
  return {
    accessToken: token,
    loggedInUser,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
