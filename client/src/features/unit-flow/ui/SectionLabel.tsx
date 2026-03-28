export function SectionLabel({ letter, label }: { letter: string; label: string }) {
  return (
    <div className="mb-3 flex flex-shrink-0 items-center gap-2.5">
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/15 text-[10px] font-bold text-indigo-500 dark:text-indigo-400">
        {letter}
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
        {label}
      </span>
    </div>
  );
}
