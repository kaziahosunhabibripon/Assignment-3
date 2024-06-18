import mongoose, { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { Service } from "../services/service.model";
import { Slot } from "../slots/slots.model";
import { TBooking } from "./booking.interface";
import httpStatus from "http-status";
import { BOOKING_SLOT } from "../slots/slots.constants";
import { Booking } from "./booking.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";

const createBookingServiceIntoDB = async (
  loginCustomerEmail: JwtPayload,
  payload: Partial<TBooking> & {
    serviceId: Types.ObjectId;
    slotId: Types.ObjectId;
  }
) => {
  const { serviceId, slotId, ...restBookingData } = payload || {};
  // get customer details from user email from user collection from const {second} =
  const customer = await User.findOne(loginCustomerEmail);
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer is not found!");
  }

  const isServiceExist = await Service.findById(serviceId);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is not found!");
  }
  const isSlotExist = await Slot.findById(slotId);
  if (!isSlotExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot is not found!");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    isSlotExist.isBooked = BOOKING_SLOT.booked;
    await isSlotExist.save({ session });
    const booking = await Booking.create(
      [
        {
          service: serviceId,
          slot: slotId,
          customer: customer?._id,
          ...restBookingData,
        },
      ],
      { session }
    );
    if (!booking?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to booking!");
    }
    await session.commitTransaction();

    const result = await Booking.findById(booking[0]._id)
      .populate("customer")
      .populate("service")
      .populate("slot");
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};


const getSingleCustomerBookings = async (loginCustomerEmail: JwtPayload) => {
  const customerEmail = await User.findOne(loginCustomerEmail);
  if (!customerEmail) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer  is not found!");
  }
  const result = await Booking.findOne({ customerEmail });
  return result;
};
export const BookingServices = {
  createBookingServiceIntoDB,
  getSingleCustomerBookings,
};
