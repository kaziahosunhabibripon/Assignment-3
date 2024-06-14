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
exports.ServiceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("./service.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newService = yield service_model_1.Service.create(payload);
    return newService;
});
const getAllServicesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.find({ isDeleted: false });
    return result;
});
const getSingleServicesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findById(id);
    return result;
});
const updateSingleServicesIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const isServiceExistsById = yield service_model_1.Service.findById(id).session(session);
        if (!isServiceExistsById) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service is not found in the database");
        }
        const isDeleted = isServiceExistsById.isDeleted;
        if (isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Service is deleted from the database");
        }
        const result = yield service_model_1.Service.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
            session: session,
        });
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
    });
    return result;
});
exports.ServiceServices = {
    createServiceIntoDB,
    getAllServicesFromDB,
    getSingleServicesFromDB,
    updateSingleServicesIntoDB,
    deleteServiceFromDB,
};
