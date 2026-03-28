import { motion } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";
import { UNIT_FLOW_STEPS, type UnitFlowPhase } from "../constants";
import { cn } from "@/lib/utils";

type Props = { current: UnitFlowPhase };

export function StepProgress({ current }: Props) {
  const idx = UNIT_FLOW_STEPS.findIndex((s) => s.key === current);

  return (
    <div className="mb-4 flex flex-shrink-0 items-start gap-0">
      {UNIT_FLOW_STEPS.map((step, i) => {
        const done = i < idx;
        const active = i === idx;

        return (
          <div
            key={step.key}
            className={cn("flex items-center", i < UNIT_FLOW_STEPS.length - 1 ? "flex-1" : "flex-none")}
          >
            <div className="flex flex-shrink-0 flex-col items-center gap-1.5">
              <motion.div
                initial={false}
                animate={
                  active ? { scale: [1, 1.08, 1], transition: { duration: 0.4, ease: "easeOut" } } : { scale: 1 }
                }
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                  done
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30 dark:shadow-indigo-500/20"
                    : active
                      ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/40 ring-3 ring-indigo-500/25 dark:ring-indigo-500/20"
                      : "border-2 border-indigo-100 bg-indigo-50 text-indigo-300 dark:border-white/10 dark:bg-white/5 dark:text-gray-600",
                )}
              >
                {done ? <Check className="h-4 w-4 text-white" /> : step.letter}
              </motion.div>
              <span
                className={cn(
                  "whitespace-nowrap text-[9px] font-bold uppercase tracking-wider",
                  active
                    ? "text-indigo-500 dark:text-indigo-400"
                    : done
                      ? "text-indigo-400 dark:text-indigo-500"
                      : "text-indigo-200 dark:text-gray-600",
                )}
              >
                {step.short}
              </span>
            </div>

            {i < UNIT_FLOW_STEPS.length - 1 && (
              <div className="mx-2 mb-4 h-[3px] flex-1 overflow-hidden rounded-full bg-indigo-100 dark:bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                  initial={{ width: "0%" }}
                  animate={{ width: done ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
