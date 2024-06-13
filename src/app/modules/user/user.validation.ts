import { z } from "zod";
const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(20, { message: "Password must be less than 20 characters" }),
    phone: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    role: z.enum(["admin", "user"]),
    address: z
      .string()
      .min(1, { message: "Address is required" })
      .max(100, { message: "Address must be less than 100 characters" }),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
