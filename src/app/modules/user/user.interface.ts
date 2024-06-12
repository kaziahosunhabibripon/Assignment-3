import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface IUser {
  name: TUserName;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}
export interface UserModel extends Model<IUser> {}
export type TUserRole = keyof typeof USER_ROLE;
