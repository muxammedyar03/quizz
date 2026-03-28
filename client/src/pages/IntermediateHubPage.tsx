import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Clock, Headphones, HomeIcon } from "lucide-react";
import { units } from "@shared/units";
import { Button } from "@/components/ui/button";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { Card } from "@/components/ui/card";
import { useUnitAttemptStore, isPendingResults } from "@/store/unit-attempt.store";
import { cn } from "@/lib/utils";

export default function IntermediateHubPage() {
  const [, setLocation] = useLocation();
  const ensureReveals = useUnitAttemptStore((s) => s.ensureReveals);
  const attemptsByUnitId = useUnitAttemptStore((s) => s.attemptsByUnitId);

  useEffect(() => {
    ensureReveals();
    const t = window.setInterval(() => ensureReveals(), 10_000);
    return () => window.clearInterval(t);
  }, [ensureReveals]);

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <AppTopBar>
        <Button
          variant="ghost"
          className="gap-2 border h-10 border-gray-400 dark:border-border"
          onClick={() => setLocation("/")}
        >
          <HomeIcon className="h-4 w-4 shrink-0" />
          Home
        </Button>
      </AppTopBar>

      <main className="container mx-auto px-4 pb-16 pt-24">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
          >
            <Headphones className="h-4 w-4" />
            Intermediate
          </motion.div>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Units</h1>
          <p className="mt-2 text-muted-foreground">
            Choose a unit. Each unit has Prelistening, While listening, and Post listening steps.
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-5xl">
          <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Units (tab bar)
          </p>
          <div
            role="tablist"
            className="flex flex-wrap justify-center gap-1 overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-2"
          >
            {units.map((u) => {
              const att = attemptsByUnitId[u.id];
              const pending = isPendingResults(att);
              return (
                <button
                  key={u.id}
                  type="button"
                  role="tab"
                  className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-background hover:shadow-sm"
                  onClick={() => setLocation(`/quiz/intermediate/${u.id}`)}
                >
                  {u.romanNumeral}
                  {pending && <Clock className="h-3 w-3 text-primary" aria-hidden />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((u) => {
            const att = attemptsByUnitId[u.id];
            const pending = isPendingResults(att);
            return (
              <motion.div key={u.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <Card
                  className={cn(
                    "relative h-full cursor-pointer border-border/80 p-5 transition-shadow hover:shadow-lg",
                    pending && "ring-2 ring-primary/30",
                  )}
                  onClick={() => setLocation(`/quiz/intermediate/${u.id}`)}
                >
                  {pending && (
                    <div
                      className="absolute right-3 top-3 rounded-full bg-primary/15 p-2 text-primary"
                      title="Results pending"
                    >
                      <Clock className="h-4 w-4" />
                    </div>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Unit {u.romanNumeral}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-semibold leading-snug">{u.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{u.theme}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
