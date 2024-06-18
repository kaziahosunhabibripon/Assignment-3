import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    slotId: z.string(),
    serviceId: z.string(),
    vehicleType: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
