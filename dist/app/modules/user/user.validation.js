"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string({
        invalid_type_error: "Password must be string",
    })
        .max(20, { message: "Password must be less than 20 characters" })
        .optional(),
    phone: zod_1.z.string(),
    role: zod_1.z.enum(["admin", "user"]).optional(),
    address: zod_1.z.string(),
});
exports.UserValidation = {
    userValidationSchema,
};
