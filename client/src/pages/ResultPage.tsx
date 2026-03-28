import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuizStore } from "@/store/quiz.store";
import { ResultSummary } from "@/features/result/ui/ResultSummary";
import { useQuiz } from "@/hooks/use-quiz";
import { Loader2, Check, X, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppTopBar, AppTopBarAboutButton } from "@/components/layout/AppTopBar";
import { getUnitById } from "@shared/units";
import {
  useUnitAttemptStore,
  isPendingResults,
  isRevealed,
} from "@/store/unit-attempt.store";

function parseUnitId(loc: string): string | null {
  const q = loc.split("?")[1];
  if (!q) return null;
  return new URLSearchParams(q).get("unit");
}

function UnitResultSection({ unitId }: { unitId: string }) {
  const [, setLocation] = useLocation();
  const ensureReveals = useUnitAttemptStore((s) => s.ensureReveals);
  const att = useUnitAttemptStore((s) => s.attemptsByUnitId[unitId]);
  const unit = getUnitById(unitId);

  useEffect(() => {
    ensureReveals();
  }, [ensureReveals]);

  if (!unit) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Unknown unit.</p>
        <Button className="mt-4" onClick={() => setLocation("/quiz/intermediate")}>
          Back to units
        </Button>
      </div>
    );
  }

  if (!att) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No submission found for this unit.</p>
        <Button className="mt-4" onClick={() => setLocation(`/quiz/intermediate/${unitId}`)}>
          Go to unit
        </Button>
      </div>
    );
  }

  if (att.status === "submitted_pending" && isPendingResults(att)) {
    return (
      <Card className="mx-auto max-w-lg border-primary/20 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Clock className="h-8 w-8" />
        </div>
        <h2 className="font-display text-xl font-bold">Results not ready yet</h2>
        <p className="mt-2 text-muted-foreground">
          Your answers for <span className="font-medium text-foreground">{unit.title}</span> are being processed.
          Check again after the waiting period.
        </p>
        <Button className="mt-6" variant="secondary" onClick={() => setLocation("/quiz/intermediate")}>
          Back to units
        </Button>
      </Card>
    );
  }

  if (isRevealed(att) && att.scoreBreakdown) {
    const b = att.scoreBreakdown;
    const pct = Math.round((b.total / b.maxTotal) * 100);
    return (
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Unit {unit.romanNumeral}</p>
          <h2 className="font-display text-2xl font-bold">{unit.title}</h2>
          <p className="mt-4 text-5xl font-bold tabular-nums">{pct}%</p>
          <p className="text-muted-foreground">
            {b.total} / {b.maxTotal} points
          </p>
        </div>
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Breakdown</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Prelistening (voice length)</span>
              <span>
                {b.prelisteningPoints} / {b.prelisteningMax} ({b.preBand})
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">While listening (written answers)</span>
              <span>
                {b.whileListeningPoints} / {b.whileListeningMax}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Post listening (video)</span>
              <span>
                {b.videoPoints} / {b.videoMax}
              </span>
            </li>
          </ul>
        </Card>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={() => setLocation("/quiz/intermediate")}>
            All units
          </Button>
          <Button onClick={() => setLocation("/")}>Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 text-center text-muted-foreground">
      Results are not available for this attempt yet.
    </div>
  );
}

function McqResultSection() {
  const [, setLocation] = useLocation();

  const {
    level,
    score,
    totalQuestions,
    answers,
    isFinished,
    resetQuiz,
  } = useQuizStore();

  const { data: quizData, isLoading } = useQuiz(level || "beginner", {
    enabled: !!(level && isFinished),
  });

  if (!isFinished || score === null || totalQuestions === null || !level) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="mb-4 h-12 w-12 text-warning" />
        <h2 className="mb-2 text-2xl font-bold">No results found</h2>
        <p className="mb-4 text-muted-foreground">Take a quiz or complete a unit to see results here.</p>
        <Button onClick={() => setLocation("/")}>Go home</Button>
      </div>
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
      <ResultSummary
        score={score}
        total={totalQuestions}
        level={level}
        onRetry={handleRetry}
        onGoHome={handleGoHome}
      />

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
          <h3 className="border-b border-border pb-4 text-2xl font-bold">Detailed review</h3>

          <div className="grid gap-6">
            {quizData?.questions.map((question, idx) => {
              const userAnswerId = answers[question.id];
              const isCorrect = userAnswerId === question.correctOptionId;
              const isUnanswered = !userAnswerId;

              return (
                <Card
                  key={question.id}
                  className={cn(
                    "relative overflow-hidden border-l-4 p-6 border-border",
                    isCorrect
                      ? "border-l-green-500 border-y-green-500/50 border-r-green-500/50"
                      : "border-l-red-500 border-y-red-500/50 border-r-red-500/50",
                  )}
                >
                  <div className="absolute right-4 top-4">
                    {isCorrect ? (
                      <div className="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        <Check className="mr-1 h-4 w-4" /> Correct
                      </div>
                    ) : (
                      <div className="flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        <X className="mr-1 h-4 w-4" /> {isUnanswered ? "Skipped" : "Incorrect"}
                      </div>
                    )}
                  </div>

                  <h4 className="mb-4 pr-24 text-lg font-semibold">
                    <span className="mr-2 text-muted-foreground">{idx + 1}.</span>
                    {question.text}
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-1">
                    {question.options.map((option) => {
                      const isSelected = userAnswerId === option.id;
                      const isCorrectOption = question.correctOptionId === option.id;

                      let styles = "border bg-card opacity-70";
                      if (isCorrectOption)
                        styles =
                          "border-green-200 bg-gradient-to-r from-green-100/50 to-green-50 font-medium opacity-100 dark:from-green-500/10 dark:to-green-500/5 dark:border-green-900 dark:text-green-300 text-green-800";
                      else if (isSelected && !isCorrect)
                        styles =
                          "border-red-200 bg-gradient-to-r from-red-100/50 to-red-50 opacity-100 dark:from-red-500/10 dark:to-red-500/5 dark:border-red-900 dark:text-red-300 text-red-800";

                      return (
                        <div
                          key={option.id}
                          className={`flex items-center rounded-lg border border-gray-300 p-3 dark:border-border ${styles}`}
                        >
                          <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-background/50 text-xs dark:border-border">
                            {isCorrectOption ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : isSelected ? (
                              <X className="h-3 w-3 text-red-600" />
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

export default function ResultPage() {
  const [loc, setLocation] = useLocation();
  const unitId = parseUnitId(loc);

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <AppTopBar>
        <AppTopBarAboutButton />
      </AppTopBar>

      <div className="container mx-auto max-w-4xl pt-12">
        {unitId ? (
          <UnitResultSection unitId={unitId} />
        ) : (
          <McqResultSection />
        )}
      </div>
    </div>
  );
}
