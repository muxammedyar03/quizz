import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { QuizLevelSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get Quiz Data by Level
  app.get(api.quiz.get.path, async (req, res) => {
    try {
      const levelResult = QuizLevelSchema.safeParse(req.params.level);
      
      if (!levelResult.success) {
        return res.status(400).json({ message: "Invalid level" });
      }

      const quiz = await storage.getQuiz(levelResult.data);
      
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}
