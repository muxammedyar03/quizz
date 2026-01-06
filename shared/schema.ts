import { z } from "zod";

// === QUIZ DATA TYPES (Served via API) ===
export const OptionSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(OptionSchema),
  correctOptionId: z.string(),
});

export const QuizLevelSchema = z.enum(["beginner", "intermediate", "advanced"]);

export const QuizDataSchema = z.object({
  level: QuizLevelSchema,
  audioUrl: z.string(),
  questions: z.array(QuestionSchema),
  duration: z.number(), // duration in seconds
});

export type QuizLevel = z.infer<typeof QuizLevelSchema>;
export type Option = z.infer<typeof OptionSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type QuizData = z.infer<typeof QuizDataSchema>;
