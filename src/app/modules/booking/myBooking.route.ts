import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import { BookingControllers } from "./booking.controller";
const router = Router();

router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  BookingControllers.getMyBookings
);

export const MyBookingsRoutes = router;
