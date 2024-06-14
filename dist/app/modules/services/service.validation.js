"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidations = void 0;
const zod_1 = require("zod");
const createServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Service name is required",
            invalid_type_error: "Name must be at least 3 characters long",
        })
            .min(3)
            .trim(),
        description: zod_1.z
            .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be at least 10 characters long",
        })
            .min(10)
            .trim(),
        price: zod_1.z
            .number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number",
        })
            .nonnegative("Price must be a non-negative number")
            .min(1),
        duration: zod_1.z
            .number({
            required_error: "Duration is required",
            invalid_type_error: "Duration must be a number",
        })
            .int("Duration must be an integer")
            .positive("Duration must be a non-negative number")
            .min(1),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Service name is required",
            invalid_type_error: "Name must be at least 3 characters long",
        })
            .min(3)
            .trim()
            .optional(),
        description: zod_1.z
            .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be at least 10 characters long",
        })
            .min(10)
            .trim()
            .optional(),
        price: zod_1.z
            .number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number",
        })
            .nonnegative("Price must be a non-negative number")
            .min(1)
            .optional(),
        duration: zod_1.z
            .number({
            required_error: "Duration is required",
            invalid_type_error: "Duration must be a number",
        })
            .int("Duration must be an integer")
            .positive("Duration must be a non-negative number")
            .min(1)
            .optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.ServiceValidations = {
    createServiceValidationSchema,
    updateServiceValidationSchema,
};
