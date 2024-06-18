"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Slot",
        required: true,
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    vehicleType: {
        type: String,
        enum: [
            "car",
            "truck",
            "SUV",
            "van",
            "motorcycle",
            "bus",
            "electricVehicle",
            "hybridVehicle",
            "bicycle",
            "tractor",
        ],
        required: true,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
    manufacturingYear: {
        type: Number,
        required: true,
    },
    registrationPlate: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
}, { timestamps: true });
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
