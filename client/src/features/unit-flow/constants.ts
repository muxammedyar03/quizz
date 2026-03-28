import { cn } from "@/lib/utils";

export const UNIT_FLOW_STEPS = [
  { key: "pre", label: "Prelistening", short: "Pre", letter: "A" },
  { key: "while", label: "While", short: "While", letter: "B" },
  { key: "post", label: "Post", short: "Post", letter: "C" },
] as const;

export type UnitFlowPhase = "pre" | "while" | "post";

export const WAVE_COUNT = 20;

export const unitFlowCardClass = cn(
  "rounded-2xl border p-4 flex-shrink-0 transition-all",
  "border-indigo-100 dark:border-indigo-800 bg-white shadow-sm shadow-indigo-50",
  "dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none",
);
