import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizLevel } from '@shared/schema';

interface QuizState {
  level: QuizLevel | null;
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> optionId
  isFinished: boolean;
  score: number | null;
  totalQuestions: number | null;
  startTime: number | null;
  timeRemaining: number | null;
  
  // Actions
  initQuiz: (level: QuizLevel, totalQuestions: number, duration: number) => void;
  setAnswer: (questionId: string, optionId: string) => void;
  nextQuestion: (totalQuestions: number) => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  finishQuiz: (score: number, total: number) => void;
  resetQuiz: () => void;
  setTimeRemaining: (seconds: number) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      level: null,
      currentQuestionIndex: 0,
      answers: {},
      isFinished: false,
      score: null,
      totalQuestions: null,
      startTime: null,
      timeRemaining: null,

      initQuiz: (level, totalQuestions, duration) => set({
        level,
        totalQuestions,
        currentQuestionIndex: 0,
        answers: {},
        isFinished: false,
        score: null,
        startTime: Date.now(),
        timeRemaining: duration,
      }),

      setAnswer: (questionId, optionId) => set((state) => ({
        answers: { ...state.answers, [questionId]: optionId }
      })),

      nextQuestion: (totalQuestions) => set((state) => {
        if (state.currentQuestionIndex < totalQuestions - 1) {
          return { currentQuestionIndex: state.currentQuestionIndex + 1 };
        }
        return {};
      }),

      prevQuestion: () => set((state) => {
        if (state.currentQuestionIndex > 0) {
          return { currentQuestionIndex: state.currentQuestionIndex - 1 };
        }
        return {};
      }),

      jumpToQuestion: (index) => set({ currentQuestionIndex: index }),

      finishQuiz: (score, total) => set({ 
        isFinished: true,
        score,
        totalQuestions: total,
      }),

      setTimeRemaining: (seconds) => set({ timeRemaining: seconds }),

      resetQuiz: () => set({
        level: null,
        currentQuestionIndex: 0,
        answers: {},
        isFinished: false,
        score: null,
        totalQuestions: null,
        startTime: null,
        timeRemaining: null,
      }),
    }),
    {
      name: 'quiz-storage', // localStorage key
      partialize: (state) => ({
        level: state.level,
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        isFinished: state.isFinished,
        score: state.score,
        totalQuestions: state.totalQuestions,
        startTime: state.startTime,
        timeRemaining: state.timeRemaining,
      }),
    }
  )
);
