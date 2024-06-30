import { Slot } from "../slots/slots.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Service } from "../services/service.model";
import { Types } from "mongoose";

const createBookingServiceIntoDB = async (
  loginCustomerEmail: JwtPayload,
  payload: Partial<TBooking> & {
    serviceId: Types.ObjectId;
    slotId: Types.ObjectId;
  }
) => {
  const customer = await User.findOne({ loginCustomerEmail });

  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer is not found!");
  }
  const isServiceExist = await Service.findById({ _id: payload?.serviceId });

  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is not found!");
  }
  const isSlotExist = await Slot.findById({ _id: payload?.slotId });
  if (!isSlotExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot is not found!");
  }
  isSlotExist.isBooked = "booked";
  await isSlotExist.save();
  const booking = await Booking.create({
    customer: customer?._id,
    service: isServiceExist._id,
    slot: isSlotExist._id,
    ...payload,
  });

  const result = await Booking.findById(booking._id)
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};
const getAllBookingsFromDB = async () => {
  const result = await Booking.find({})
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

const getSingleCustomerBookingsFromDB = async (
  loginCustomerEmail: JwtPayload
) => {
  const customer = await User.findOne({ email: loginCustomerEmail });

  return null;
};

export const BookingServices = {
  createBookingServiceIntoDB,
  getAllBookingsFromDB,
  getSingleCustomerBookingsFromDB,
};
