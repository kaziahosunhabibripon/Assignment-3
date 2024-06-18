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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../services/service.model");
const slots_model_1 = require("../slots/slots.model");
const http_status_1 = __importDefault(require("http-status"));
const slots_constants_1 = require("../slots/slots.constants");
const booking_model_1 = require("./booking.model");
const user_model_1 = require("../user/user.model");
const createBookingServiceIntoDB = (loginCustomerEmail, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = payload || {}, { serviceId, slotId } = _a, restBookingData = __rest(_a, ["serviceId", "slotId"]);
    // get customer details from user email from user collection from const {second} =
    const customer = yield user_model_1.User.findOne(loginCustomerEmail);
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer is not found!");
    }
    const isServiceExist = yield service_model_1.Service.findById(serviceId);
    if (!isServiceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service is not found!");
    }
    const isSlotExist = yield slots_model_1.Slot.findById(slotId);
    if (!isSlotExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot is not found!");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        isSlotExist.isBooked = slots_constants_1.BOOKING_SLOT.booked;
        yield isSlotExist.save({ session });
        const booking = yield booking_model_1.Booking.create([
            Object.assign({ service: serviceId, slot: slotId, customer: customer === null || customer === void 0 ? void 0 : customer._id }, restBookingData),
        ], { session });
        if (!(booking === null || booking === void 0 ? void 0 : booking.length)) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to booking!");
        }
        yield session.commitTransaction();
        const result = yield booking_model_1.Booking.findById(booking[0]._id)
            .populate("customer")
            .populate("service")
            .populate("slot");
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({})
        .populate("customer")
        .populate("service")
        .populate("slot");
    return result;
});
const getSingleCustomerBookingsFromDB = (loginCustomerEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const customerEmail = yield user_model_1.User.findOne(loginCustomerEmail);
    if (!customerEmail) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer  is not found!");
    }
    const result = yield booking_model_1.Booking.findOne({ customerEmail });
    return result;
});
exports.BookingServices = {
    createBookingServiceIntoDB,
    getAllBookingsFromDB,
    getSingleCustomerBookingsFromDB,
};
