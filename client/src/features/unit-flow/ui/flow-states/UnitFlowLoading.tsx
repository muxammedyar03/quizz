import { Loader2 } from "lucide-react";

export function UnitFlowLoading() {
  return (
    <div className="flex flex-1 items-center justify-center gap-3">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
      <span className="text-sm text-indigo-400 dark:text-gray-500">Loading…</span>
    </div>
  );
}
