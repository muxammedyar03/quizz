import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { UnitData } from "@shared/schema";

type Props = {
  unit: UnitData;
};

export function UnitResultHero({ unit }: Props) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 shadow-sm shadow-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400 dark:shadow-none"
      >
        <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
        Your results
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
        className="text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-gray-50 md:text-4xl"
      >
        Unit{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
          {unit.romanNumeral}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.12 }}
        className="mt-2 text-base font-semibold text-indigo-800/90 dark:text-gray-200"
      >
        {unit.title}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.18 }}
        className="mt-1 text-sm text-indigo-400 dark:text-gray-500"
      >
        {unit.theme}
      </motion.p>
    </div>
  );
}
