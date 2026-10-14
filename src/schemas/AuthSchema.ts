/** @format */

import z from "zod";

const phoneNumber = z
  .string()
  .regex(/^\d{10}$/, "Enter your 10 digit phone number");

export const SignInSchema = z.object({
  phoneNumber,
  password: z.string().min(1, "Enter your password"),
});

export const SignUpSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name"),
  phoneNumber,
  address: z.string().trim().min(5, "Add your address so we know your neighbourhood"),
  password: z.string().min(6, "Use at least 6 characters"),
});

export type SignInType = z.infer<typeof SignInSchema>;
export type SignUpType = z.infer<typeof SignUpSchema>;
