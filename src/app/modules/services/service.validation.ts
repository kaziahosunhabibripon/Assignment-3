import { z } from "zod";

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Service name is required",
        invalid_type_error: "Name must be at least 3 characters long",
      })
      .min(3)
      .trim(),
    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be at least 10 characters long",
      })
      .min(10)
      .trim(),
    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .nonnegative("Price must be a non-negative number")
      .min(1),
    duration: z
      .number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
      })
      .int("Duration must be an integer")
      .positive("Duration must be a non-negative number")
      .min(1),
    isDeleted: z.boolean().default(false),
  }),
});
const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Service name is required",
        invalid_type_error: "Name must be at least 3 characters long",
      })
      .min(3)
      .trim()
      .optional(),
    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be at least 10 characters long",
      })
      .min(10)
      .trim()
      .optional(),
    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .nonnegative("Price must be a non-negative number")
      .min(1)
      .optional(),
    duration: z
      .number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
      })
      .int("Duration must be an integer")
      .positive("Duration must be a non-negative number")
      .min(1)
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});
export const ServiceValidations = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
