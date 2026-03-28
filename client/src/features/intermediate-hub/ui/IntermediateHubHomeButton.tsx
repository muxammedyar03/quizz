import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onClick: () => void;
};

export function IntermediateHubHomeButton({ onClick }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="flex h-9 items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 text-sm font-semibold text-indigo-600 shadow-sm shadow-indigo-100/80 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:shadow-none dark:hover:bg-white/10 dark:hover:text-gray-200"
    >
      <HomeIcon className="h-4 w-4 shrink-0" />
      Home
    </Button>
  );
}
