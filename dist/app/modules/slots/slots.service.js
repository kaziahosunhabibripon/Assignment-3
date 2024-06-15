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
exports.SlotServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const slots_model_1 = require("./slots.model");
const service_model_1 = require("../services/service.model");
const http_status_1 = __importDefault(require("http-status"));
const slots_utils_1 = require("./slots.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const slots_constants_1 = require("./slots.constants");
const createSlotsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = payload || {}, { service, startTime, endTime } = _a, restSlotProps = __rest(_a, ["service", "startTime", "endTime"]);
    const isExistService = yield service_model_1.Service.findById(service);
    if (!isExistService) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service is not found!");
    }
    const slots = [];
    const serviceDuration = 60;
    const startTimeToMin = (0, slots_utils_1.timeToMinutes)(startTime);
    const endTimeToMin = (0, slots_utils_1.timeToMinutes)(endTime);
    for (let time = startTimeToMin; time < endTimeToMin; time += serviceDuration) {
        // Calculate slot start time
        for (let time = startTimeToMin; time < endTimeToMin; time += serviceDuration) {
            // Calculate slot start time using helper function
            const slotStartTime = (0, slots_utils_1.minutesToTime)(time);
            // Calculate slot end time
            let slotEndTimeMin = time + serviceDuration;
            if (slotEndTimeMin > endTimeToMin) {
                slotEndTimeMin = endTimeToMin;
            }
            const slotEndTime = (0, slots_utils_1.minutesToTime)(slotEndTimeMin);
            const slot = new slots_model_1.Slot(Object.assign({ startTime: slotStartTime, endTime: slotEndTime, service }, restSlotProps));
            slots.push(slot);
            yield slot.save();
        }
        return slots;
    }
});
const getAllSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const findQuery = slots_model_1.Slot.find({
        isBooked: slots_constants_1.BOOKING_SLOT.available,
    }).populate("service");
    const queryBuilder = new QueryBuilder_1.default(findQuery, query).filter();
    const result = (yield queryBuilder.modelQuery.exec());
    return result;
});
exports.SlotServices = {
    createSlotsIntoDB,
    getAllSlotsFromDB,
};
