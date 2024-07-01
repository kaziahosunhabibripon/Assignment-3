"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyBookingsRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.get("/my-bookings", (0, auth_1.default)(user_constants_1.USER_ROLE.user), booking_controller_1.BookingControllers.getMyBookings);
exports.MyBookingsRoutes = router;
