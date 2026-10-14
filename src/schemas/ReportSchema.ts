/** @format */

import z from "zod";
import { REPORT_CATEGORIES } from "@/lib/categories";

export const CreateReportSchema = z.object({
  image: z.string().min(1, "Take a photo of the issue"),
  location: z
    .tuple([z.number(), z.number()])
    .refine(([lat, lng]) => lat !== 0 || lng !== 0, "We need your location to pin the report"),
  category: z.enum(REPORT_CATEGORIES, "Pick what kind of issue it is"),
  title: z
    .string()
    .trim()
    .min(3, "Give it a short title")
    .max(200, "Keep the title under 200 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Add a little more detail (at least 10 characters)")
    .max(1000, "Keep it under 1000 characters"),
});

export type CreateReportType = z.infer<typeof CreateReportSchema>;
