import express from "express";
import { BookingControllers } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking
);
router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBookings);
// router.get(
//   "/my-bookings",
//   auth(USER_ROLE.user),
  
// );

export const BookingRoutes = router;
