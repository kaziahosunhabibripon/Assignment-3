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
exports.BookingServices = void 0;
const slots_model_1 = require("../slots/slots.model");
const booking_model_1 = require("./booking.model");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../services/service.model");
const createBookingServiceIntoDB = (loginCustomerEmail, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield user_model_1.User.findOne({ loginCustomerEmail });
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer is not found!");
    }
    const isServiceExist = yield service_model_1.Service.findById({ _id: payload === null || payload === void 0 ? void 0 : payload.serviceId });
    if (!isServiceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service is not found!");
    }
    const isSlotExist = yield slots_model_1.Slot.findById({ _id: payload === null || payload === void 0 ? void 0 : payload.slotId });
    if (!isSlotExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot is not found!");
    }
    isSlotExist.isBooked = "booked";
    yield isSlotExist.save();
    const booking = yield booking_model_1.Booking.create(Object.assign({ customer: customer === null || customer === void 0 ? void 0 : customer._id, service: isServiceExist._id, slot: isSlotExist._id }, payload));
    const result = yield booking_model_1.Booking.findById(booking._id)
        .populate("customer")
        .populate("service")
        .populate("slot");
    return result;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({})
        .populate("customer")
        .populate("service")
        .populate("slot");
    return result;
});
const getMyBookings = (loginCustomerEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield user_model_1.User.findOne({ loginCustomerEmail });
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer is not found!");
    }
    const result = yield booking_model_1.Booking.find({
        customer: customer._id,
    })
        .populate("service")
        .populate("slot")
        .populate("customer");
    return result;
});
exports.BookingServices = {
    createBookingServiceIntoDB,
    getAllBookingsFromDB,
    getMyBookings,
};
