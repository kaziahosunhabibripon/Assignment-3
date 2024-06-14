import { IUser } from "./user.interface";
import { User } from "./user.model";
const getAllUserFromDB = async (payload: IUser) => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  getAllUserFromDB,
};
