import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";



export interface IUser {
  name: string;
  email: string;
  password: string;

  phone: string;
  role: "admin" | "user";
  address: string;
}
export interface UserModel extends Model<IUser> {
  isUserExistByEmail(email: string): Promise<IUser>;
}
export type TUserRole = keyof typeof USER_ROLE;
