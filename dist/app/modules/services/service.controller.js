"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const service_service_1 = require("./service.service");
const creteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = req.body;
    const result = yield service_service_1.ServiceServices.createServiceIntoDB(serviceData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Services created successfully",
        data: result,
    });
}));
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.getAllServicesFromDB();
    const isSuccess = result.length > 0;
    (0, sendResponse_1.default)(res, {
        success: isSuccess,
        statusCode: isSuccess ? http_status_1.default.OK : http_status_1.default.BAD_REQUEST,
        message: isSuccess ? "Services fetched successfully" : "No services found",
        data: isSuccess ? result : null,
    });
}));
const getSingleService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_service_1.ServiceServices.getSingleServicesFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: !!result && !result.isDeleted,
        statusCode: result && !result.isDeleted ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        message: result && !result.isDeleted
            ? "Service retrieved successfully"
            : "Service not found or has been deleted",
        data: result && !result.isDeleted ? result : null,
    });
}));
const updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serviceData = req.body;
    const result = yield service_service_1.ServiceServices.updateSingleServicesIntoDB(id, serviceData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service updated  successfully",
        data: result,
    });
}));
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_service_1.ServiceServices.deleteServiceFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service is deleted successfully",
        data: result,
    });
}));
exports.ServiceControllers = {
    creteService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};
