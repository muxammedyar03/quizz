import { cn } from "@/lib/utils";

type Props = {
  percent: number;
  className?: string;
};

/** Circular score with indigo→violet stroke; accessible label via parent heading. */
export function UnitResultScoreRing({ percent, className }: Props) {
  const p = Math.min(100, Math.max(0, percent));
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - p / 100);

  return (
    <div className={cn("relative mx-auto flex aspect-square w-[min(100%,220px)] max-w-[220px] items-center justify-center", className)}>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
        <defs>
          <linearGradient id="unit-result-score-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(99 102 241)" />
            <stop offset="50%" stopColor="rgb(139 92 246)" />
            <stop offset="100%" stopColor="rgb(14 165 233)" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" className="stroke-indigo-100 dark:stroke-white/10" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#unit-result-score-ring)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          className={cn(
            "text-4xl font-extrabold tabular-nums tracking-tight md:text-5xl",
            p >= 75 && "text-emerald-600 dark:text-emerald-400",
            p >= 50 && p < 75 && "text-amber-600 dark:text-amber-400",
            p < 50 && "text-rose-600 dark:text-rose-400",
          )}
        >
          {p}%
        </span>
        <span className="mt-0.5 text-xs font-medium text-indigo-400 dark:text-gray-500">Score</span>
      </div>
    </div>
  );
}
