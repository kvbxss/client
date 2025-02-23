import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().max(30, "Title must be at most 30 characters long"),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters long")
    .max(255, "Description must be at most 255 characters long")
    .optional(),
});

export const updateTaskSchema = z.object({
  id: z.string(),
  completed: z.boolean().optional(),
});
