import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const { email } = req.user.userEmail;

  const result = await BookingServices.createBookingServiceIntoDB(
    email,
    bookingData
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});
const getMyBookings = catchAsync(async (req, res) => {
  const { loginCustomerEmail } = req.user.userEmail;
  const result = await BookingServices.getMyBookings(loginCustomerEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});
export const BookingControllers = {
  createBooking,
  getAllBookings,
  getMyBookings,
};
