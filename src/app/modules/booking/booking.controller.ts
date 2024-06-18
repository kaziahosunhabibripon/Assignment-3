import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const { email } = req.user;
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


const getBookingAccordingToCustomerEmail = catchAsync(async (req, res) => {
  const { email } = req.user;
  const bookings = await BookingServices.getSingleCustomerBookings(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: bookings,
  });
});
export const BookingControllers = {
  createBooking,
  getBookingAccordingToCustomerEmail,
};
