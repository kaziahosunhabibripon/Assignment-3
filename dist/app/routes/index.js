"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const service_route_1 = require("../modules/services/service.route");
const slots_route_1 = require("../modules/slots/slots.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/services",
        route: service_route_1.ServiceRoutes,
    },
    {
        path: "/slots",
        route: slots_route_1.SlotRoutes,
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
