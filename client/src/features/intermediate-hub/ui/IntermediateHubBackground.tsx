export function IntermediateHubBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-indigo-300/20 blur-[120px] dark:bg-indigo-600/10" />
      <div className="absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full bg-violet-300/15 blur-[120px] dark:bg-violet-600/10" />
      <div className="absolute right-20 top-1/3 h-[280px] w-[280px] rounded-full bg-sky-300/12 blur-[100px] dark:bg-blue-600/5" />
      <div className="absolute left-1/2 top-0 hidden h-[160px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-200/20 blur-[60px] dark:hidden" />
    </div>
  );
}
