import { motion } from "framer-motion";
import { Headphones } from "lucide-react";

export function IntermediateHubHero() {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 shadow-sm shadow-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400 dark:shadow-none"
      >
        <Headphones className="h-3.5 w-3.5" />
        Intermediate
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="text-4xl font-extrabold tracking-tight text-indigo-950 dark:text-gray-50 md:text-5xl"
      >
        Choose your{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
          Unit
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.16 }}
        className="mt-3 text-sm leading-relaxed text-indigo-400 dark:text-gray-500"
      >
        Each unit has Prelistening, While listening, and Post listening steps.
      </motion.p>
    </div>
  );
}
