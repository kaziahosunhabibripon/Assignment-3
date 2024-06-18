import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import mongoose from "mongoose";

const createServiceIntoDB = async (payload: TService) => {
  const newService = await Service.create(payload);
  return newService;
};
const getAllServicesFromDB = async () => {
  const result = await Service.find({});
  return result;
};
const getSingleServicesFromDB = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};
const updateSingleServicesIntoDB = async (
  id: string,
  payload: Partial<TService>
) => {
  // start session
  const session = await mongoose.startSession();
  // start Transaction
  session.startTransaction();

  try {
    const isServiceExistsById = await Service.findById(id).session(session);

    if (!isServiceExistsById) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Service is not found in the database"
      );
    }

    const isDeleted = isServiceExistsById.isDeleted;

    if (isDeleted) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Service is deleted from the database"
      );
    }

    const result = await Service.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      session: session,
    });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "error message");
  }
};


const deleteServiceFromDB = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};
export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServicesFromDB,
  updateSingleServicesIntoDB,
  deleteServiceFromDB,
};
