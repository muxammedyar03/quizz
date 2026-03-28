import { LucideInfo } from "lucide-react";
import { useLocation } from "wouter";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const shellClass =
  "sticky top-2 z-50 flex items-center gap-2 w-full p-3 justify-between md:justify-end";

type AppTopBarProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * Shared top-right bar: optional leading actions + theme toggle.
 * Use {@link AppTopBarAboutButton} for the standard About navigation.
 */
export function AppTopBar({ children, className }: AppTopBarProps) {
  return (
    <div className={cn(shellClass, className)}>
      {children}
      <ThemeToggle />
    </div>
  );
}

export function AppTopBarAboutButton({ className }: { className?: string }) {
  const [, setLocation] = useLocation();
  return (
    <Button
      variant="ghost"
      className={cn("gap-2 border h-10 border-gray-400 dark:border-border rounded-xl", className)}
      onClick={() => setLocation("/about")}
    >
      <LucideInfo className="h-4 w-4 shrink-0" />
      About
    </Button>
  );
}
