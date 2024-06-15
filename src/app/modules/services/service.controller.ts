import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ServiceServices } from "./service.service";

const creteService = catchAsync(async (req, res) => {
  const serviceData = req.body;
  const result = await ServiceServices.createServiceIntoDB(serviceData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Services created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {

  const result = await ServiceServices.getAllServicesFromDB();

  const isSuccess = result.length > 0;

  sendResponse(res, {
    success: isSuccess,
    statusCode: isSuccess ? httpStatus.OK : httpStatus.BAD_REQUEST,
    message: isSuccess ? "Services fetched successfully" : "No services found",
    data: isSuccess ? result : null,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServicesFromDB(id);
  sendResponse(res, {
    success: !!result && !result.isDeleted,
    statusCode:
      result && !result.isDeleted ? httpStatus.OK : httpStatus.NOT_FOUND,
    message:
      result && !result.isDeleted
        ? "Service retrieved successfully"
        : "Service not found or has been deleted",
    data: result && !result.isDeleted ? result : null,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const serviceData = req.body;
  const result = await ServiceServices.updateSingleServicesIntoDB(
    id,
    serviceData
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service updated  successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service is deleted successfully",
    data: result,
  });
});
export const ServiceControllers = {
  creteService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
