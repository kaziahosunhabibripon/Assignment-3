import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { BookingServices } from "./booking.service";


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
const getBookingAccordingToCustomerEmail = catchAsync(async (req, res) => {
  const bookings = await BookingServices.getSingleCustomerBookingsFromDB(
    req.user.userEmail
  );

  console.log(bookings);
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
  getAllBookings,
};
