import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import SlotServices from "./slots.service";

const createSlot = catchAsync(async (req, res) => {
  const service = await SlotServices.createSlotsIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: service,
  });
});

export const SlotControllers = {
  createSlot,
};
