import { useLocation } from "wouter";
import { useQuizStore } from "@/store/quiz.store";
import { ResultSummary } from "@/features/result/ui/ResultSummary";
import { useQuiz } from "@/hooks/use-quiz";
import { Loader2, Check, X, AlertTriangle, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { unitFlowCardClass } from "@/features/unit-flow/constants";

export function McqResultView() {
  const [, setLocation] = useLocation();

  const { level, score, totalQuestions, answers, isFinished, resetQuiz } = useQuizStore();

  const { data: quizData, isLoading } = useQuiz(level || "beginner", {
    enabled: !!(level && isFinished),
  });

  if (!isFinished || score === null || totalQuestions === null || !level) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          unitFlowCardClass,
          "mx-auto max-w-xl border-amber-200/90 bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50 p-10 text-center dark:border-amber-500/20 dark:from-amber-950/25 dark:via-white/[0.03] dark:to-orange-950/20",
        )}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="font-display text-xl font-bold text-indigo-950 dark:text-gray-100">No quiz results</h2>
        <p className="mt-2 text-sm text-indigo-500 dark:text-gray-500">
          Take a quiz or open a unit result with <span className="font-mono text-indigo-700 dark:text-indigo-400">?unit=…</span> to see scores here.
        </p>
        <Button
          className="mt-6 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-8 font-semibold text-white shadow-md shadow-indigo-500/25"
          onClick={() => setLocation("/")}
        >
          Go home
        </Button>
      </motion.div>
    );
  }

  const handleRetry = () => {
    resetQuiz();
    setLocation(`/quiz/${level}`);
  };

  const handleGoHome = () => {
    resetQuiz();
    setLocation("/");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 shadow-sm shadow-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400 dark:shadow-none">
          <BarChart3 className="h-3.5 w-3.5 text-violet-500" />
          Quiz results
        </div>
        <p className="text-sm text-indigo-400 dark:text-gray-500">Listening quiz — level &amp; summary</p>
      </motion.div>

      <div className="mb-10 rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-violet-50/50 to-sky-50/40 p-4 shadow-lg shadow-indigo-100/40 dark:border-white/10 dark:from-white/[0.04] dark:via-violet-950/20 dark:to-sky-950/15 dark:shadow-none md:p-6">
        <ResultSummary score={score} total={totalQuestions} level={level} onRetry={handleRetry} onGoHome={handleGoHome} />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
          <h3 className="bg-gradient-to-r from-indigo-600/90 to-violet-600/90 bg-clip-text pb-1 text-2xl font-bold text-transparent dark:from-indigo-400 dark:to-violet-400">
            Detailed review
          </h3>

          <div className="grid gap-6">
            {quizData?.questions.map((question, idx) => {
              const userAnswerId = answers[question.id];
              const isCorrect = userAnswerId === question.correctOptionId;
              const isUnanswered = !userAnswerId;

              return (
                <Card
                  key={question.id}
                  className={cn(
                    "relative overflow-hidden border-l-4 p-6 shadow-md",
                    isCorrect
                      ? "border-l-emerald-500 border-y-green-500/40 border-r-green-500/30 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-white/[0.02]"
                      : "border-l-rose-500 border-y-rose-500/40 border-r-rose-500/30 bg-gradient-to-br from-rose-50/50 to-white dark:from-rose-950/20 dark:to-white/[0.02]",
                  )}
                >
                  <div className="absolute right-4 top-4">
                    {isCorrect ? (
                      <div className="flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                        <Check className="mr-1 h-4 w-4" /> Correct
                      </div>
                    ) : (
                      <div className="flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700 dark:bg-rose-900/40 dark:text-rose-400">
                        <X className="mr-1 h-4 w-4" /> {isUnanswered ? "Skipped" : "Incorrect"}
                      </div>
                    )}
                  </div>

                  <h4 className="mb-4 pr-24 text-lg font-semibold text-indigo-950 dark:text-gray-100">
                    <span className="mr-2 text-indigo-400 dark:text-gray-500">{idx + 1}.</span>
                    {question.text}
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-1">
                    {question.options.map((option) => {
                      const isSelected = userAnswerId === option.id;
                      const isCorrectOption = question.correctOptionId === option.id;

                      let styles = "border bg-white/80 opacity-80 dark:bg-card/50 dark:opacity-90";
                      if (isCorrectOption)
                        styles =
                          "border-emerald-300 bg-gradient-to-r from-emerald-100/70 to-green-50 font-medium opacity-100 dark:from-emerald-500/15 dark:to-emerald-500/5 dark:border-emerald-700 dark:text-emerald-200";
                      else if (isSelected && !isCorrect)
                        styles =
                          "border-rose-300 bg-gradient-to-r from-rose-100/70 to-red-50 opacity-100 dark:from-rose-500/15 dark:to-rose-500/5 dark:border-rose-700 dark:text-rose-200";

                      return (
                        <div
                          key={option.id}
                          className={`flex items-center rounded-lg border border-indigo-100 p-3 dark:border-border ${styles}`}
                        >
                          <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-indigo-200 bg-white text-xs dark:border-border dark:bg-background/50">
                            {isCorrectOption ? (
                              <Check className="h-3 w-3 text-emerald-600" />
                            ) : isSelected ? (
                              <X className="h-3 w-3 text-rose-600" />
                            ) : null}
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
    </>
  );
}
