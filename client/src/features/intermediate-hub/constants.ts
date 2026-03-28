/** Cycling accent colors for unit card top bars */
export const UNIT_CARD_ACCENTS = [
  "from-indigo-500 to-violet-500",
  "from-blue-500 to-indigo-500",
  "from-violet-500 to-pink-500",
  "from-emerald-500 to-blue-500",
  "from-amber-500 to-orange-500",
  "from-pink-500 to-violet-500",
] as const;

export const hubContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

export const hubCardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] },
  },
};
