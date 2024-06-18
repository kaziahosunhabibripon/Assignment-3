import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { SlotServices } from "./slots.service";

const createSlot = catchAsync(async (req, res) => {
  const service = await SlotServices.createSlotsIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: service,
  });
});

const getAllSlots = catchAsync(async (req, res) => {

  const result = await SlotServices.getAllSlotsFromDB(req.query);

  sendResponse(
    res,
    result.length > 0
      ? {
          success: true,
          statusCode: httpStatus.OK,
          message: "Available slots retrieved successfully",
          data: result,
        }
      : {
          message: "No data found",
          data: [],
          success: false,
          statusCode: httpStatus.NOT_FOUND,
        }
  );
});

export const SlotControllers = {
  createSlot,
  getAllSlots,
};
