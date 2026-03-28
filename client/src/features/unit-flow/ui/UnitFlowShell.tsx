import type { ReactNode } from "react";
import { Headphones } from "lucide-react";
import { AppTopBar } from "@/components/layout/AppTopBar";

type Props = {
  onBack: () => void;
  children: ReactNode;
};

export function UnitFlowShell({ onBack, children }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-indigo-50 via-violet-50/60 to-sky-50 dark:bg-[#0d1117] dark:[background-image:none]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-28 -top-28 h-[400px] w-[400px] rounded-full bg-indigo-300/20 blur-[100px] dark:bg-indigo-600/10" />
        <div className="absolute -bottom-20 -right-16 h-[350px] w-[350px] rounded-full bg-violet-300/15 blur-[100px] dark:bg-violet-600/10" />
      </div>

      <AppTopBar>
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 items-center gap-2 rounded-xl border border-indigo-200 bg-white px-3.5 text-sm font-semibold text-indigo-600 shadow-sm shadow-indigo-100 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:shadow-none dark:hover:bg-white/10 dark:hover:text-gray-200"
        >
          <Headphones className="h-3.5 w-3.5" />
          Units
        </button>
      </AppTopBar>

      <div className="relative z-10 flex flex-1 flex-col pt-12">{children}</div>
    </div>
  );
}
