import { Mic, PenLine, Video } from "lucide-react";
import type { ScoreBreakdown } from "@/lib/unitScoring";
import { cn } from "@/lib/utils";

type Props = {
  breakdown: ScoreBreakdown;
};

const rows = [
  {
    key: "pre",
    label: "Prelistening",
    sub: "Voice length",
    icon: Mic,
    pts: (b: ScoreBreakdown) => b.prelisteningPoints,
    max: (b: ScoreBreakdown) => b.prelisteningMax,
    extra: (b: ScoreBreakdown) => b.preBand,
    light:
      "border-sky-200/90 bg-gradient-to-br from-sky-50 via-white to-indigo-50/60 shadow-sm shadow-sky-100/80 dark:border-sky-500/20 dark:from-sky-950/40 dark:via-white/[0.03] dark:to-indigo-950/30 dark:shadow-none",
    iconWrap: "bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-md shadow-sky-500/30",
  },
  {
    key: "while",
    label: "While listening",
    sub: "Written answers",
    icon: PenLine,
    pts: (b: ScoreBreakdown) => b.whileListeningPoints,
    max: (b: ScoreBreakdown) => b.whileListeningMax,
    extra: null,
    light:
      "border-violet-200/90 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/50 shadow-sm shadow-violet-100/80 dark:border-violet-500/20 dark:from-violet-950/35 dark:via-white/[0.03] dark:to-fuchsia-950/25 dark:shadow-none",
    iconWrap: "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-md shadow-violet-500/30",
  },
  {
    key: "video",
    label: "Post listening",
    sub: "Video upload",
    icon: Video,
    pts: (b: ScoreBreakdown) => b.videoPoints,
    max: (b: ScoreBreakdown) => b.videoMax,
    extra: null,
    light:
      "border-emerald-200/90 bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 shadow-sm shadow-emerald-100/80 dark:border-emerald-500/20 dark:from-emerald-950/35 dark:via-white/[0.03] dark:to-teal-950/25 dark:shadow-none",
    iconWrap: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30",
  },
] as const;

export function UnitResultBreakdown({ breakdown }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {rows.map((row) => {
        const Icon = row.icon;
        const pts = row.pts(breakdown);
        const max = row.max(breakdown);
        const ratio = max > 0 ? pts / max : 0;
        return (
          <div
            key={row.key}
            className={cn(
              "flex flex-col rounded-2xl border p-4 transition-transform duration-200 hover:-translate-y-0.5",
              row.light,
            )}
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-500/70">
                  {row.label}
                </p>
                <p className="text-xs text-indigo-600/80 dark:text-gray-500">{row.sub}</p>
              </div>
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", row.iconWrap)}>
                <Icon className="h-5 w-5" strokeWidth={2.25} />
              </div>
            </div>
            <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-indigo-100/80 pt-3 dark:border-white/[0.06]">
              <span className="text-lg font-bold tabular-nums text-indigo-950 dark:text-gray-100">
                {pts}
                <span className="text-indigo-300 dark:text-gray-600">/{max}</span>
              </span>
              {row.extra && (
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-600 ring-1 ring-indigo-200/80 dark:bg-white/5 dark:text-indigo-300 dark:ring-white/10">
                  {row.extra(breakdown)}
                </span>
              )}
              {!row.extra && (
                <span className="text-xs font-medium text-indigo-400 dark:text-gray-500">{Math.round(ratio * 100)}%</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
