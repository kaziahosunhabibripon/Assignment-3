import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string({
      invalid_type_error: "Password must be a string",
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
