import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { UserServices } from "./user.service";
import { User } from "./user.model";

const createUser = catchAsync(async (req, res) => {
  const { email } = req.body;
  const isUserExist = await User.isUserExistByEmail(email);

  if (isUserExist) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "User already exist",
      data: null,
    });
  }
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
