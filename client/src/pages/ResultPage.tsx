import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuizStore } from "@/store/quiz.store";
import { ResultSummary } from "@/features/result/ui/ResultSummary";
import { useQuiz } from "@/hooks/use-quiz";
import { Loader2, Check, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type QuizLevel } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ResultPage() {
  const [, setLocation] = useLocation();
  
  const { 
    level, 
    score, 
    totalQuestions, 
    answers, 
    isFinished,
    resetQuiz 
  } = useQuizStore();
  
  const { data: quizData, isLoading } = useQuiz(level || "beginner");

  // If no quiz result in localStorage, redirect home
  if (!isFinished || score === null || totalQuestions === null || !level) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-12 h-12 text-warning mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
        <p className="text-muted-foreground mb-4">Please take a quiz to see results.</p>
        <Button onClick={() => setLocation('/')}>Go Home</Button>
      </div>
    );
  }

  const handleRetry = () => {
    resetQuiz();
    setLocation(`/quiz/${level}`);
  };
  
  const handleGoHome = () => {
    resetQuiz();
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <ResultSummary 
          score={score} 
          total={totalQuestions} 
          level={level} 
          onRetry={handleRetry}
          onGoHome={handleGoHome}
        />

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
            <h3 className="text-2xl font-bold border-b pb-4">Detailed Review</h3>
            
            <div className="grid gap-6">
              {quizData?.questions.map((question, idx) => {
                const userAnswerId = answers[question.id];
                const isCorrect = userAnswerId === question.correctOptionId;
                const isUnanswered = !userAnswerId;

                return (
                  <Card key={question.id} className={cn(
                    "p-6 border-l-4 overflow-hidden relative",
                    isCorrect ? "border-l-green-500" : "border-l-red-500"
                  )}>
                    <div className="absolute top-4 right-4">
                      {isCorrect ? (
                        <div className="flex items-center text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm font-medium">
                          <Check className="w-4 h-4 mr-1" /> Correct
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full text-sm font-medium">
                          <X className="w-4 h-4 mr-1" /> {isUnanswered ? "Skipped" : "Incorrect"}
                        </div>
                      )}
                    </div>

                    <h4 className="text-lg font-semibold pr-24 mb-4">
                      <span className="text-muted-foreground mr-2">{idx + 1}.</span>
                      {question.text}
                    </h4>

                    <div className="grid gap-3 sm:grid-cols-1">
                      {question.options.map((option) => {
                        const isSelected = userAnswerId === option.id;
                        const isCorrectOption = question.correctOptionId === option.id;
                        
                        let styles = "border bg-card opacity-70";
                        if (isCorrectOption) styles = "border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900 text-green-800 dark:text-green-300 font-medium opacity-100";
                        else if (isSelected && !isCorrect) styles = "border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900 text-red-800 dark:text-red-300 opacity-100";

                        return (
                          <div key={option.id} className={`p-3 rounded-lg flex items-center ${styles}`}>
                            <div className="w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-xs shrink-0 bg-background/50">
                              {isCorrectOption ? <Check className="w-3 h-3 text-green-600" /> : 
                               (isSelected ? <X className="w-3 h-3 text-red-600" /> : null)}
                            </div>
                            {option.text}
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
