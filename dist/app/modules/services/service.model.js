"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// serviceSchema.pre("save", function (next) {
//   const service = this;
//   if (service.isModified("name")) {
//     service.name = service.name.toLowerCase();
//   }
//   next();
// });
exports.Service = (0, mongoose_1.model)("Service", serviceSchema);
