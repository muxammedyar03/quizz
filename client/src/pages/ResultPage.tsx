import { useLocation } from "wouter";
import { useQuizStore } from "@/store/quiz.store";
import { ResultSummary } from "@/features/result/ui/ResultSummary";
import { useQuiz } from "@/hooks/use-quiz";
import { Loader2, Check, X, AlertTriangle, Info, InfoIcon, BadgeInfo, LucideInfo } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

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
      <div className="fixed top-0 p-2 left-0 right-0 z-50 backdrop-blur-sm border-b border-border flex justify-end">
        <Button variant="ghost" className="mr-2 border border-gray-400 dark:border-border" onClick={() => setLocation('/about')}>
          <LucideInfo className="w-4 h-4" /> About
        </Button>
        <ThemeToggle />
      </div>
      {/* <div className="fixed top-2 p-3 right-2 rounded-xl z-50 backdrop-blur-sm border border-gray-700/30 flex justify-end">
        <Button variant="ghost" className="mr-2 border border-gray-400 dark:border-border" onClick={() => setLocation('/about')}>
          <LucideInfo className="w-4 h-4" /> About
        </Button>
        <ThemeToggle />
      </div> */}
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
            <h3 className="text-2xl font-bold border-b border-border pb-4">Detailed Review</h3>
            
            <div className="grid gap-6">
              {quizData?.questions.map((question, idx) => {
                const userAnswerId = answers[question.id];
                const isCorrect = userAnswerId === question.correctOptionId;
                const isUnanswered = !userAnswerId;

                return (
                  <Card key={question.id} className={cn(
                    "p-6 border-l-4 overflow-hidden relative border-border",
                    isCorrect ? "border-l-green-500 border-y-green-500/50 border-r-green-500/50" : "border-l-red-500 border-y-red-500/50 border-r-red-500/50"
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
                        if (isCorrectOption) styles = "border-green-200 bg-gradient-to-r from-green-100/50 to-green-50 dark:from-green-500/10 dark:to-green-500/5 dark:border-green-900 text-green-800 dark:text-green-300 font-medium opacity-100";
                        else if (isSelected && !isCorrect) styles = "border-red-200 bg-gradient-to-r from-red-100/50 to-red-50 dark:from-red-500/10 dark:to-red-500/5 dark:border-red-900 text-red-800 dark:text-red-300 opacity-100";

                        return (
                          <div key={option.id} className={`p-3 rounded-lg flex items-center ${styles} border border-gray-300 dark:border-border`}>
                            <div className="w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-xs shrink-0 bg-background/50 border-gray-300 dark:border-border">
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
