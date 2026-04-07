import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { UnitData } from "@shared/schema";
import type { HubLevel } from "@shared/levelUnits";
import { getRomanLabelForHub } from "@shared/levelUnits";
import { cn } from "@/lib/utils";
import {
  isPendingResults,
  isRevealed,
  type UnitAttemptRecord,
} from "@/store/unit-attempt.store";

type Props = {
  hubLevel: HubLevel;
  units: UnitData[];
  attemptsByUnitId: Record<string, UnitAttemptRecord>;
  activeTab: string | null;
  onUnitSelect: (unitId: string) => void;
};

export function UnitsRomanTabBar({
  hubLevel,
  units,
  attemptsByUnitId,
  activeTab,
  onUnitSelect,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mx-auto mb-8 max-w-5xl"
    >
      <p className="mb-2.5 text-center text-xs font-bold uppercase tracking-widest text-indigo-300 dark:text-gray-600">
        Units (tab bar)
      </p>
      <div
        role="tablist"
        className="flex flex-wrap justify-center gap-1.5 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 bg-white p-2.5 shadow-sm shadow-indigo-100/50 dark:border-white/8 dark:bg-white/[0.03] dark:shadow-none"
      >
        {units.map((u) => {
          const att = attemptsByUnitId[u.id];
          const pending = isPendingResults(att);
          const done = isRevealed(att);
          const isActive = activeTab === u.id;
          return (
            <button
              key={u.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onUnitSelect(u.id)}
              className={cn(
                "relative inline-flex min-h-[36px] min-w-[40px] items-center justify-center overflow-visible rounded-lg border border-indigo-200 px-2.5 py-1.5 text-sm font-semibold transition-all duration-200 dark:border-gray-800",
                isActive
                  ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/50"
                  : [
                      "text-indigo-300 hover:bg-indigo-50 hover:text-indigo-600",
                      "dark:text-gray-300 dark:hover:bg-white/[0.06] dark:hover:text-gray-300",
                    ],
              )}
            >
              <span className="tabular-nums">{getRomanLabelForHub(u, hubLevel)}</span>
              {done && (
                <span
                  className={cn(
                    "absolute -right-1 -top-1 z-10 flex h-4 w-4 p-0.5 items-center justify-center rounded-full shadow-md ring-1 ring-white dark:ring-[#0d1117]",
                    isActive
                      ? "bg-white text-indigo-600 shadow-indigo-900/30"
                      : "bg-background text-white shadow-indigo-400/40 dark:shadow-indigo-900/50",
                  )}
                  aria-label="Results ready"
                >
                  <Check className="h-3 w-3 text-indigo-600 rounded-full" strokeWidth={3} aria-hidden />
                </span>
              )}
              {pending && (
                <span
                  className="absolute bg-background p-0.5 -right-1 -top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full shadow-md ring-1 ring-white dark:ring-[#0d1117]"
                  aria-label="Results pending"
                >
                  <Clock className="h-3 w-3 text-amber-600 mb-0.5" strokeWidth={2.5} aria-hidden />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
