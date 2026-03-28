import { motion } from "framer-motion";

export function UnitsSectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.28 }}
      className="mx-auto mb-6 flex max-w-5xl items-center gap-3"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent dark:via-white/10" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 dark:text-gray-600">
        All units
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent dark:via-white/10" />
    </motion.div>
  );
}
