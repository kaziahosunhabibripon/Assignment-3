import AppError from "../../errors/AppError";
import { TSlots } from "./slots.interface";
import { Slot } from "./slots.model";
import { Service } from "../services/service.model";
import httpStatus from "http-status";
import { minutesToTime, timeToMinutes } from "./slots.utils";
import { BOOKING_SLOT } from "./slots.constants";
import { TSlotsQuery } from "../../builder/QueryBuilder";

const createSlotsIntoDB = async (payload: TSlots) => {
  const { service, startTime, endTime, ...restSlotProps } = payload || {};
  const isExistService = await Service.findById(service);

  if (!isExistService) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is not found!");
  }

  const slots = [];
  const serviceDuration = 60;
  const startTimeToMin = timeToMinutes(startTime);
  const endTimeToMin = timeToMinutes(endTime);

  for (
    let time = startTimeToMin;
    time < endTimeToMin;
    time += serviceDuration
  ) {
    // Calculate slot start time
    for (
      let time = startTimeToMin;
      time < endTimeToMin;
      time += serviceDuration
    ) {
      // Calculate slot start time using helper function
      const slotStartTime = minutesToTime(time);

      // Calculate slot end time
      let slotEndTimeMin = time + serviceDuration;
      if (slotEndTimeMin > endTimeToMin) {
        slotEndTimeMin = endTimeToMin;
      }
      const slotEndTime = minutesToTime(slotEndTimeMin);

      const slot = new Slot({
        startTime: slotStartTime,
        endTime: slotEndTime,
        service,
        ...restSlotProps,
      });
      slots.push(slot);
      await slot.save();
    }

    return slots;
  }
};

const getAllSlotsFromDB = async (query: TSlotsQuery) => {
  const findQuery: { date?: string; serviceId?: string } = {};
  if (query.date) {
    findQuery.date = query.date;
  }
  if (!query.serviceId) {
    findQuery.date = query.serviceId;
  }
  const result = await Slot.find({ isBooked: BOOKING_SLOT.available }).populate(
    "service"
  );

  return result;
};

export const SlotServices = {
  createSlotsIntoDB,
  getAllSlotsFromDB,
};
 
