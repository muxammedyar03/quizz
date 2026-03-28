import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { formatMsRemaining } from "../utils";
import { unitFlowCardClass } from "../constants";
import { cn } from "@/lib/utils";

type Props = {
  unitTitle: string;
  resultsVisibleAfter: number;
  onBack: () => void;
};

export function PendingResultsView({ unitTitle, resultsVisibleAfter, onBack }: Props) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const i = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(i);
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className={cn(unitFlowCardClass, "w-full max-w-md p-4 sm:p-8 text-center")}>
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
          <Loader2 className="h-7 w-7 animate-spin text-indigo-500" />
        </div>
        <h2 className="text-lg font-bold text-indigo-950 dark:text-gray-100">Results submitted</h2>
        <p className="mt-3 text-sm leading-relaxed text-indigo-400 dark:text-gray-400">
          Your answers for{" "}
          <span className="font-semibold text-indigo-600 dark:text-gray-200">{unitTitle}</span> have been sent.
          Results in{" "}
          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
            {formatMsRemaining(resultsVisibleAfter)}
          </span>
          .
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-6 w-full rounded-xl border border-indigo-100 bg-indigo-50 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
        >
          Back to units
        </button>
      </div>
    </div>
  );
}
