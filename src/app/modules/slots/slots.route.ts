import express from "express";
import { SlotControllers } from "./slots.controller";
const router = express.Router();

router.get("/availability", SlotControllers.getAllSlots);

export const SlotRoutes = router;
