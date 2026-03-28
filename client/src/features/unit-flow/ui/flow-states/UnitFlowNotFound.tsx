import { Bug } from "lucide-react";

type Props = { onBack: () => void };

export function UnitFlowNotFound({ onBack }: Props) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4">
      <div className="flex items-center justify-center bg-gradient-to-br from-indigo-400/20 to-violet-600/30 rounded-3xl p-4">
        <Bug className="h-10 w-10 text-indigo-400 dark:text-gray-400" />
      </div>
      <p className="text-md text-indigo-400 dark:text-gray-400">Unit not found.</p>
      <button
        type="button"
        onClick={onBack}
        className="rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-indigo-400"
      >
        Back
      </button>
    </div>
  );
}
