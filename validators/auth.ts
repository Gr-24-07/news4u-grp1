import { z } from "zod";

const baseRegisterSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  dateOfBirth: z.string().optional(),
  newsletter: z.boolean().optional(),
  newletter: z.boolean().optional(),
});

export const registerSchema = baseRegisterSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// API-specific schema (without confirmPassword)
export const apiRegisterSchema = baseRegisterSchema;