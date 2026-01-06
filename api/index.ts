import type { VercelRequest, VercelResponse } from '@vercel/node';

type QuizLevel = 'beginner' | 'intermediate' | 'advanced';

// Copy schema types
type SafeParseSuccess = { success: true; data: QuizLevel };
type SafeParseError = { success: false; data?: undefined };
type SafeParseResult = SafeParseSuccess | SafeParseError;

const QuizLevelSchema = {
  safeParse: (value: string): SafeParseResult => {
    if (['beginner', 'intermediate', 'advanced'].includes(value)) {
      return { success: true, data: value as 'beginner' | 'intermediate' | 'advanced' };
    }
    return { success: false };
  }
};

// Mock quiz data (copied from storage.ts)
const MOCK_QUIZZES: Record<QuizLevel, any> = {
  beginner: {
    level: "beginner",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 300,
    questions: [
      {
        id: "b1",
        text: "What is the capital of France?",
        correctOptionId: "b1-2",
        options: [
          { id: "b1-1", text: "London" },
          { id: "b1-2", text: "Paris" },
          { id: "b1-3", text: "Berlin" },
          { id: "b1-4", text: "Madrid" },
        ]
      },
      {
        id: "b2",
        text: "Which of these is a fruit?",
        correctOptionId: "b2-1",
        options: [
          { id: "b2-1", text: "Apple" },
          { id: "b2-2", text: "Carrot" },
          { id: "b2-3", text: "Potato" },
          { id: "b2-4", text: "Broccoli" },
        ]
      },
      {
        id: "b3",
        text: "Complete the sentence: The cat ___ on the mat.",
        correctOptionId: "b3-3",
        options: [
          { id: "b3-1", text: "sitting" },
          { id: "b3-2", text: "satting" },
          { id: "b3-3", text: "sat" },
          { id: "b3-4", text: "sitted" },
        ]
      },
      {
        id: "b4",
        text: "Which color is the sky usually?",
        correctOptionId: "b4-2",
        options: [
          { id: "b4-1", text: "Green" },
          { id: "b4-2", text: "Blue" },
          { id: "b4-3", text: "Red" },
          { id: "b4-4", text: "Yellow" },
        ]
      },
      {
        id: "b5",
        text: "Select the opposite of 'Hot'.",
        correctOptionId: "b5-1",
        options: [
          { id: "b5-1", text: "Cold" },
          { id: "b5-2", text: "Warm" },
          { id: "b5-3", text: "Spicy" },
          { id: "b5-4", text: "Dry" },
        ]
      }
    ]
  },
  intermediate: {
    level: "intermediate",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 600,
    questions: [
      {
        id: "i1",
        text: "Which sentence is grammatically correct?",
        correctOptionId: "i1-3",
        options: [
          { id: "i1-1", text: "She don't like apples." },
          { id: "i1-2", text: "She doesn't likes apples." },
          { id: "i1-3", text: "She doesn't like apples." },
          { id: "i1-4", text: "She don't likes apples." },
        ]
      },
      {
        id: "i2",
        text: "If I ___ you, I would study harder.",
        correctOptionId: "i2-2",
        options: [
          { id: "i2-1", text: "was" },
          { id: "i2-2", text: "were" },
          { id: "i2-3", text: "am" },
          { id: "i2-4", text: "be" },
        ]
      },
      {
        id: "i3",
        text: "I have been living here ___ 2010.",
        correctOptionId: "i3-1",
        options: [
          { id: "i3-1", text: "since" },
          { id: "i3-2", text: "for" },
          { id: "i3-3", text: "from" },
          { id: "i3-4", text: "until" },
        ]
      },
      {
        id: "i4",
        text: "He is interested ___ learning Spanish.",
        correctOptionId: "i4-1",
        options: [
          { id: "i4-1", text: "in" },
          { id: "i4-2", text: "on" },
          { id: "i4-3", text: "at" },
          { id: "i4-4", text: "of" },
        ]
      },
      {
        id: "i5",
        text: "The meeting has been ___ until next week.",
        correctOptionId: "i5-2",
        options: [
          { id: "i5-1", text: "put out" },
          { id: "i5-2", text: "put off" },
          { id: "i5-3", text: "put on" },
          { id: "i5-4", text: "put in" },
        ]
      }
    ]
  },
  advanced: {
    level: "advanced",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 900,
    questions: [
      {
        id: "a1",
        text: "The scientist's theory was corroborated by recent findings. 'Corroborated' means:",
        correctOptionId: "a1-1",
        options: [
          { id: "a1-1", text: "Confirmed" },
          { id: "a1-2", text: "Contradicted" },
          { id: "a1-3", text: "Questioned" },
          { id: "a1-4", text: "Ignored" },
        ]
      },
      {
        id: "a2",
        text: "Which of the following contains a dangling modifier?",
        correctOptionId: "a2-2",
        options: [
          { id: "a2-1", text: "Walking down the street, the trees looked beautiful." },
          { id: "a2-2", text: "Having finished the assignment, the TV was turned on." },
          { id: "a2-3", text: "To master a language, practice is essential." },
          { id: "a2-4", text: "She went to the store to buy milk." },
        ]
      },
      {
        id: "a3",
        text: "He is known for his 'altruism'. This means he is:",
        correctOptionId: "a3-3",
        options: [
          { id: "a3-1", text: "Selfish" },
          { id: "a3-2", text: "Wealthy" },
          { id: "a3-3", text: "Selfless" },
          { id: "a3-4", text: "Arrogant" },
        ]
      },
      {
        id: "a4",
        text: "Choose the correct subjunctive form: It is essential that he ___ present.",
        correctOptionId: "a4-1",
        options: [
          { id: "a4-1", text: "be" },
          { id: "a4-2", text: "is" },
          { id: "a4-3", text: "was" },
          { id: "a4-4", text: "were" },
        ]
      },
      {
        id: "a5",
        text: "The 'ubiquitous' influence of technology. 'Ubiquitous' means:",
        correctOptionId: "a5-2",
        options: [
          { id: "a5-1", text: "Rare" },
          { id: "a5-2", text: "Present everywhere" },
          { id: "a5-3", text: "Dangerous" },
          { id: "a5-4", text: "Beneficial" },
        ]
      }
    ]
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Extract level from URL path
    const path = req.url || '';
    const match = path.match(/\/api\/quiz\/(\w+)/);
    
    if (!match) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const level = match[1];
    const levelResult = QuizLevelSchema.safeParse(level);
    
    if (!levelResult.success) {
      return res.status(400).json({ message: "Invalid level" });
    }

    const quiz = MOCK_QUIZZES[levelResult.data];
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    return res.status(200).json(quiz);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
