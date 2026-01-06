import { z } from "zod";
import { QuizDataSchema } from "./schema";

export const api = {
  quiz: {
    get: {
      method: "GET" as const,
      path: "/api/quiz/:level",
      responses: {
        200: QuizDataSchema,
        404: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
