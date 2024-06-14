import httpStatus from "http-status";
import { User } from "../user/user.model";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { AuthServices } from "./auth.services";

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
  const result = await AuthServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, loggedInUser } = result;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: accessToken,
    data: loggedInUser,
  });
});
export const AuthControllers = {
  createUser,
  loginUser,
};
