import type { QuizLevel } from "@shared/schema";

const STORAGE_KEY = "quiz_app_state";

export interface QuizStorageData {
  level: QuizLevel;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  isFinished: boolean;
  score?: number;
  totalQuestions?: number;
  startTime: number;
  timeRemaining?: number;
}

/**
 * Save quiz state to localStorage
 */
export function saveQuizState(data: QuizStorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save quiz state:", error);
  }
}

/**
 * Load quiz state from localStorage
 */
export function loadQuizState(): QuizStorageData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as QuizStorageData;
  } catch (error) {
    console.error("Failed to load quiz state:", error);
    return null;
  }
}

/**
 * Clear quiz state from localStorage
 */
export function clearQuizState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear quiz state:", error);
  }
}

/**
 * Check if there's an active quiz in progress
 */
export function hasActiveQuiz(): boolean {
  const state = loadQuizState();
  return state !== null && !state.isFinished;
}
