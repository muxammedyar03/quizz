import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: "primary" | "success" | "ghost";
};

export function CtaButton({ onClick, disabled, children, variant = "primary" }: Props) {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-all duration-200",
        variant === "primary" &&
          "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40",
        variant === "success" &&
          "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:opacity-90",
        variant === "ghost" &&
          "border border-indigo-100 bg-white text-indigo-600 hover:bg-indigo-50 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10",
      )}
    >
      {children}
    </motion.button>
  );
}
