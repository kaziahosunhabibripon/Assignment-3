import { SlotControllers } from "./../slots/slots.controller";
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";
import { ServiceControllers } from "./service.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import { SlotValidations } from "../slots/slots.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.creteService
);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  ServiceControllers.getAllServices
);
router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),

  ServiceControllers.getSingleService
);
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  ServiceControllers.updateService
);
router.delete("/:id", auth(USER_ROLE.admin), ServiceControllers.deleteService);

router.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot
);
export const ServiceRoutes = router;
