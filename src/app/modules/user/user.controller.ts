import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { UserServices } from "./user.service";
import { User } from "./user.model";

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Users retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
};
