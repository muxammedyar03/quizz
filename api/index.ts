import express, { type Request, Response, NextFunction } from "express";
import { storage } from "../server/storage";
import { QuizLevelSchema } from "../shared/schema";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get Quiz Data by Level
app.get("/api/quiz/:level", async (req, res) => {
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

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;
