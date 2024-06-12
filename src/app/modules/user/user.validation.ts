import { z } from "zod";

const createUserNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});
const userValidationSchema = z.object({
  name: createUserNameValidationSchema,
  email: z.string().email(),
  phone: z.string(),
  role: z.enum(["admin", "user"]),
  address: z.string(),
});

export const UserValidation = {
  userValidationSchema,
};
