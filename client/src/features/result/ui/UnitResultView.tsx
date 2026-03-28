import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, Clock, RotateCcw, SearchX } from "lucide-react";
import { getUnitById } from "@shared/units";
import {
  useUnitAttemptStore,
  isPendingResults,
  isRevealed,
} from "@/store/unit-attempt.store";
import { unitFlowCardClass } from "@/features/unit-flow/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UnitResultHero } from "./UnitResultHero";
import { UnitResultScoreRing } from "./UnitResultScoreRing";
import { UnitResultBreakdown } from "./UnitResultBreakdown";

type Props = {
  unitId: string;
};

export function UnitResultView({ unitId }: Props) {
  const [, setLocation] = useLocation();
  const ensureReveals = useUnitAttemptStore((s) => s.ensureReveals);
  const resetUnit = useUnitAttemptStore((s) => s.resetUnit);
  const att = useUnitAttemptStore((s) => s.attemptsByUnitId[unitId]);
  const unit = getUnitById(unitId);

  useEffect(() => {
    ensureReveals();
  }, [ensureReveals]);

  if (!unit) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          unitFlowCardClass,
          "mx-auto max-w-2xl border-rose-200/80 bg-gradient-to-br from-rose-50/90 to-orange-50/50 p-10 text-center dark:border-rose-500/20 dark:from-rose-950/30 dark:to-orange-950/20",
        )}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-orange-500 text-white shadow-lg shadow-rose-500/25">
          <SearchX className="h-7 w-7" />
        </div>
        <h2 className="font-display text-xl font-bold text-indigo-950 dark:text-gray-100">Unit not found</h2>
        <p className="mt-2 text-sm text-indigo-500 dark:text-gray-500">{unitId}</p>
        <Button
          className="mt-4 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-8 font-semibold text-white shadow-md shadow-indigo-500/25"
          onClick={() => setLocation("/quiz/intermediate")}
        >
          Back to units
        </Button>
      </motion.div>
    );
  }

  if (!att) {
    return (
      <>
        <UnitResultHero unit={unit} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            unitFlowCardClass,
            "mx-auto max-w-2xl border-amber-200/90 bg-gradient-to-br from-amber-50/90 via-white to-yellow-50/40 p-10 text-center dark:border-amber-500/20 dark:from-amber-950/25 dark:via-white/[0.03] dark:to-yellow-950/15",
          )}
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25">
            <Clock className="h-7 w-7" />
          </div>
          <h2 className="font-display text-xl font-bold text-indigo-950 dark:text-gray-100">No submission yet</h2>
          <p className="mt-2 text-sm text-indigo-500 dark:text-gray-500">
            Complete this unit to unlock a detailed score here.
          </p>
          <Button
            className="mt-6 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-8 font-semibold text-white shadow-md shadow-indigo-500/25"
            onClick={() => setLocation(`/quiz/intermediate/${unitId}`)}
          >
            Open unit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </>
    );
  }

  if (att.status === "submitted_pending" && isPendingResults(att)) {
    return (
      <>
        <UnitResultHero unit={unit} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            unitFlowCardClass,
            "mx-auto max-w-2xl border-indigo-200/90 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60 p-10 text-center dark:border-indigo-500/25 dark:from-indigo-950/50 dark:via-white/[0.03] dark:to-violet-950/30",
          )}
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
            <Clock className="h-7 w-7 animate-pulse" />
          </div>
          <h2 className="font-display text-xl font-bold text-indigo-950 dark:text-gray-100">Results processing</h2>
          <p className="mt-2 text-sm text-indigo-500 dark:text-gray-500">
            Your answers are being processed. Check back shortly.
          </p>
          <Button
            variant="outline"
            className="mt-6 rounded-xl border-indigo-200 bg-white font-semibold text-indigo-700 hover:bg-indigo-50 dark:border-white/15 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
            onClick={() => setLocation("/quiz/intermediate")}
          >
            All units
          </Button>
        </motion.div>
      </>
    );
  }

  if (isRevealed(att) && att.scoreBreakdown) {
    const b = att.scoreBreakdown;
    const pct = Math.round((b.total / b.maxTotal) * 100);
    return (
      <>
        <UnitResultHero unit={unit} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            unitFlowCardClass,
            "mx-auto w-full max-w-3xl border-indigo-100 bg-white/90 p-6 shadow-lg shadow-indigo-100/50 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none md:p-8",
          )}
        >
          <div className="mb-8 flex flex-col items-center gap-2">
            <UnitResultScoreRing percent={pct} />
            <p className="text-sm font-medium text-indigo-400 dark:text-gray-500">
              {b.total} / {b.maxTotal} points
            </p>
          </div>

          <UnitResultBreakdown breakdown={b} />

          <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              className="rounded-xl border-indigo-200 bg-indigo-50/50 font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-white/15 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 sm:flex-1"
              onClick={() => setLocation("/quiz/intermediate")}
            >
              All units
            </Button>
            <Button
              className="rounded-xl border-none bg-gradient-to-br from-indigo-500 to-violet-600 font-semibold text-white shadow-md shadow-indigo-500/25 hover:opacity-95 sm:flex-1"
              onClick={() => setLocation("/")}
            >
              Home
            </Button>
          </div>
          <Button
            variant="outline"
            className="mx-auto mt-3 flex w-full max-w-2xl items-center justify-center gap-2 rounded-xl border-emerald-200 bg-emerald-50/80 font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
            onClick={() => {
              resetUnit(unit.id, unit.whileListening.questions.length);
              setLocation(`/quiz/intermediate/${unitId}`);
            }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Restart test
          </Button>
        </motion.div>
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-indigo-100 bg-white/80 p-10 text-center text-indigo-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-500"
    >
      Results are not available for this attempt yet.
    </motion.div>
  );
}
