import { PartyPopper, RotateCcw } from "lucide-react";
import type { UnitAttemptRecord } from "@/store/unit-attempt.store";
import { unitFlowCardClass } from "../constants";
import { cn } from "@/lib/utils";

type Props = {
  attempt: UnitAttemptRecord;
  unitTitle: string;
  onBack: () => void;
  onSeeResultPage: () => void;
  onRestart: () => void;
};

export function RevealedResultsView({ attempt, unitTitle, onBack, onSeeResultPage, onRestart }: Props) {
  const b = attempt.scoreBreakdown!;
  const pct = Math.round((b.total / b.maxTotal) * 100);
  const scoreColor = pct >= 75 ? "text-emerald-500" : pct >= 50 ? "text-amber-500" : "text-red-500";

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className={cn(unitFlowCardClass, "w-full max-w-md p-4  sm:p-8 text-center")}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
          <PartyPopper className="h-7 w-7 text-emerald-500" />
        </div>
        <h2 className="text-lg font-bold text-indigo-950 dark:text-gray-100">Results ready!</h2>
        <p className="mt-1 text-xs text-indigo-400 dark:text-gray-500">{unitTitle}</p>
        <p className={cn("mt-5 text-5xl font-extrabold tabular-nums", scoreColor)}>{pct}%</p>
        <p className="text-xs text-indigo-400 dark:text-gray-500">
          {b.total} / {b.maxTotal} pts
        </p>

        <div className="mt-5 divide-y divide-indigo-50 rounded-xl border border-indigo-100 text-left text-sm dark:divide-white/[0.05] dark:border-white/10">
          {[
            { label: "Prelistening", pts: b.prelisteningPoints, max: b.prelisteningMax },
            { label: "While listening", pts: b.whileListeningPoints, max: b.whileListeningMax },
            { label: "Video upload", pts: b.videoPoints, max: b.videoMax },
          ].map((row) => (
            <div key={row.label} className="flex justify-between px-3 py-3">
              <span className="text-indigo-400 dark:text-gray-500">{row.label}</span>
              <span className="font-semibold text-indigo-700 dark:text-gray-200">
                {row.pts}/{row.max}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 rounded-xl border border-indigo-100 bg-indigo-50 py-2.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
            >
              Units
            </button>
            <button
              type="button"
              onClick={onSeeResultPage}
              className="flex-1 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:opacity-90"
            >
              Open results
            </button>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Restart test
          </button>
        </div>
      </div>
    </div>
  );
}
