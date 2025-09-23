/** @format */

import z from "zod";

export const CreateReportSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string(),
  location: z.tuple([z.number(), z.number()]),
  creator: z.string().optional(),
});

export type CreateReportType = z.infer<typeof CreateReportSchema>;
