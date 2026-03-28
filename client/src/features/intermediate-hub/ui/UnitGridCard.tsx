import { motion } from "framer-motion";
import { Check, ChevronRight, Clock } from "lucide-react";
import type { UnitData } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  isPendingResults,
  isRevealed,
  type UnitAttemptRecord,
} from "@/store/unit-attempt.store";
import { hubCardVariants } from "../constants";

type Props = {
  unit: UnitData;
  index: number;
  accentGradient: string;
  attempt: UnitAttemptRecord | undefined;
  onSelect: () => void;
  onRestartUnit?: (unitId: string) => void;
};

export function UnitGridCard({ unit, index, accentGradient, attempt, onSelect, onRestartUnit }: Props) {
  const pending = isPendingResults(attempt);
  const done = isRevealed(attempt);

  return (
    <motion.div variants={hubCardVariants}>
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        className={cn(
          "group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-5 transition-all duration-200",
          "border border-indigo-100 bg-white shadow-sm shadow-indigo-50/80",
          "hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100",
          "dark:border-gray-800 dark:bg-white/[0.03] dark:shadow-none",
          "dark:hover:border-indigo-500/40 dark:hover:bg-white/[0.06]",
          pending && "ring-1 ring-indigo-400/40 dark:ring-indigo-600/35",
        )}
      >
        <div
          className={cn(
            "absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r opacity-60 transition-opacity duration-200 group-hover:opacity-100",
            accentGradient,
          )}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-500/70">
              Unit {unit.romanNumeral}
            </span>
            {done && (
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/30 dark:shadow-indigo-900/40"
                title="Results ready"
                aria-label="Results ready"
              >
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
            )}
            {pending && (
              <div className="flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-indigo-500 dark:border-indigo-700/50 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Clock className="h-2.5 w-2.5" />
                <span className="text-[10px] font-semibold">Pending</span>
              </div>
            )}
          </div>

          <h2 className="font-display text-base font-bold leading-snug text-indigo-950 transition-colors group-hover:text-indigo-700 dark:text-gray-100 dark:group-hover:text-white">
            {unit.title}
          </h2>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-indigo-300 transition-colors group-hover:text-indigo-400 dark:text-gray-500 dark:group-hover:text-gray-400">
            {unit.theme}
          </p>
        </div>

        <div className="relative mt-4 flex items-center justify-between border-t border-indigo-50 pt-3 dark:border-gray-800">
          <span className="text-xs font-bold text-indigo-500 dark:text-gray-500">
            #{String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 transition-all duration-200 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-violet-600 dark:border-indigo-500/30 dark:bg-white/5 dark:group-hover:border-indigo-500/50 dark:group-hover:bg-indigo-500/20">
            <ChevronRight className="h-4 w-4 text-indigo-500 transition-colors group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
