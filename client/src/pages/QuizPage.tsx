import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, LucideInfo } from "lucide-react";

import { useQuiz } from "@/hooks/use-quiz";
import { useQuizStore } from "@/store/quiz.store";
import { AudioPlayer } from "@/components/AudioPlayer";
import { QuizTimer } from "@/components/QuizTimer";
import { QuizQuestion } from "@/features/quiz/ui/QuizQuestion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { type QuizLevel } from "@shared/schema";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function QuizPage() {
  const [match, params] = useRoute("/quiz/:level");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const level = (params?.level as QuizLevel) || "beginner";

  // Data Query
  const { data: quizData, isLoading, error } = useQuiz(level);

  // Store
  const {
    level: storedLevel,
    currentQuestionIndex,
    answers,
    nextQuestion,
    prevQuestion,
    setAnswer,
    finishQuiz,
    isFinished,
    initQuiz,
  } = useQuizStore();

  // Initialize quiz when data is loaded or restore from localStorage
  useEffect(() => {
    if (quizData) {
      // If stored level doesn't match current level, initialize new quiz
      if (storedLevel !== level || isFinished) {
        initQuiz(level, quizData.questions.length, quizData.duration);
      }
      // Otherwise, quiz state is restored from localStorage automatically
    }
  }, [quizData, level, storedLevel, isFinished, initQuiz]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium">Loading your quiz...</p>
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Failed to load quiz</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          {(error as Error)?.message || "Something went wrong. Please try again."}
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleNext = () => {
    nextQuestion(totalQuestions);
  };

  const handleFinish = () => {
    const unansweredCount = quizData.questions.length - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      toast({
        title: "Incomplete Quiz",
        description: `You have ${unansweredCount} unanswered questions. Please answer them before finishing.`,
        variant: "destructive",
      });
      return;
    }
    
    // Calculate score
    let score = 0;
    quizData.questions.forEach(q => {
      if (answers[q.id] === q.correctOptionId) {
        score++;
      }
    });

    // Save result to store (which persists to localStorage)
    finishQuiz(score, totalQuestions);
    
    // Navigate to results page
    setLocation('/result');
  };

  const handleTimeUp = () => {
    if (!isFinished) {
      toast({
        title: "Time's up!",
        description: "Submitting your answers automatically...",
        variant: "default",
      });
      handleFinish();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-400 dark:border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg capitalize">{level} Quiz</span>
            <span className="hidden sm:inline-block text-muted-foreground text-sm border-l pl-2 ml-2">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          
          <div className="flex items-center gap-2 h-full">
            <Button variant="ghost" className="h-12 border border-gray-400 dark:border-border" onClick={() => setLocation('/about')}>
              <LucideInfo className="w-4 h-4" /> About
            </Button>
            <ThemeToggle />
            <QuizTimer
              durationSeconds={quizData.duration} 
              onTimeUp={handleTimeUp}
              isFinished={isFinished}
            />
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none bg-secondary" />
      </header>

      <main className="container mx-auto px-4 pt-8 max-w-4xl">
        <div className="grid gap-8">
          
          {/* Audio Section - Always visible */}
          <section className="bg-card rounded-2xl shadow-sm border border-gray-400 dark:border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <HeadphonesIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Listen Carefully</h3>
                <p className="text-sm text-muted-foreground">Answer the questions based on the audio clip.</p>
              </div>
            </div>
            <AudioPlayer src={quizData.audioUrl} />
          </section>

          {/* Question Section */}
          <div className="min-h-[400px]">
             <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 md:p-8 shadow-lg border-border/60">
                  <QuizQuestion
                    question={currentQuestion}
                    selectedOptionId={answers[currentQuestion.id]}
                    onSelectOption={(optId) => setAnswer(currentQuestion.id, optId)}
                  />
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-6">
                    <Button
                      variant="outline"
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="gap-2 h-14 rounded-xl text-base text-primary font-bold bg-gradient-to-r from-white to-gray-500/15 dark:from-gray-800 dark:to-gray-900"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </Button>

                    <div className="flex gap-2">
                      {/* Skip / Mark for review could go here */}
                    </div>

                    {currentQuestionIndex === totalQuestions - 1 ? (
                      <Button 
                        onClick={handleFinish} 
                        className="gap-2 bg-green-600 hover:bg-green-700 text-white px-8 h-14 rounded-xl text-base border-green-400"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Finish Quiz
                      </Button>
                    ) : (
                      <Button variant={"default"} onClick={handleNext} className="gap-2 px-8 h-14 rounded-xl text-base">
                        Next <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
}

function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
      <path d="M2 19v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
      <path d="M22 19v-3a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2z" />
    </svg>
  );
}
