import { useEffect, useState } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="inline-flex h-8 items-center rounded-md border border-border bg-background/80 p-1 shadow-sm"
        aria-hidden
      >
        <div className="h-6 w-11 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="inline-flex items-center">
      <SwitchPrimitives.Root
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className={cn(
          "peer inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        )}
        aria-label="Toggle dark mode"
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background shadow-md ring-0 transition-transform",
            "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
          )}
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-foreground" aria-hidden />
          ) : (
            <Sun className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden />
          )}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    </div>
  );
}
