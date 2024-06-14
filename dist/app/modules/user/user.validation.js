"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, { message: "Name is required" })
            .max(50, { message: "Name must be less than 50 characters" }),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z
            .string({
            invalid_type_error: "Password must be a string",
        })
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(20, { message: "Password must be less than 20 characters" }),
        phone: zod_1.z
            .string()
            .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
        role: zod_1.z.enum(["admin", "user"]),
        address: zod_1.z
            .string()
            .min(1, { message: "Address is required" })
            .max(100, { message: "Address must be less than 100 characters" }),
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
