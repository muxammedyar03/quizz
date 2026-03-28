import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mic, RotateCcw, Square } from "lucide-react";
import { WAVE_COUNT } from "../constants";
import { cn } from "@/lib/utils";

type Props = {
  savedDuration: number | null;
  onComplete: (sec: number) => void;
};

export function VoiceRecorderCard({ savedDuration, onComplete }: Props) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [waveBars, setWaveBars] = useState(() => Array.from({ length: WAVE_COUNT }, () => 8));

  useEffect(() => {
    if (!recording) return;
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [recording]);

  useEffect(() => {
    if (!recording) {
      setWaveBars(Array.from({ length: WAVE_COUNT }, () => 8));
      return;
    }
    const t = window.setInterval(() => {
      setWaveBars((prev) =>
        prev.map((h) => Math.max(5, Math.min(36, h + (Math.random() * 14 - 7)))),
      );
    }, 150);
    return () => window.clearInterval(t);
  }, [recording]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleToggle = () => {
    if (recording) {
      onComplete(seconds);
      setRecording(false);
      setSeconds(0);
    } else {
      setSeconds(0);
      setRecording(true);
    }
  };

  return (
    <div
      className={cn(
        "relative flex min-h-64 flex-1 flex-col items-center justify-between overflow-hidden rounded-2xl px-4 py-4 transition-all duration-300",
        recording
          ? "border-2 border-indigo-300 bg-white shadow-lg shadow-indigo-100 dark:border-indigo-500/40 dark:bg-indigo-950/50 dark:shadow-xl dark:shadow-indigo-500/10"
          : "border border-indigo-100 bg-white shadow-sm shadow-indigo-50 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none",
      )}
    >
      <AnimatePresence>
        {recording && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute inset-0 rounded-2xl border border-indigo-400/20 dark:border-indigo-500/15"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1.04 + i * 0.06, opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-500">
        Voice response
      </span>

      <div className="flex h-10 flex-shrink-0 items-end justify-center gap-[2.5px]">
        {waveBars.map((h, i) => (
          <motion.div
            key={i}
            className={cn(
              "w-[3px] rounded-full",
              recording ? "bg-gradient-to-t from-indigo-600 to-violet-400" : "bg-indigo-200 dark:bg-white/15",
            )}
            animate={{ height: `${h}px` }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="flex flex-shrink-0 items-center gap-4">
        {savedDuration != null && savedDuration > 0 && !recording && (
          <button
            type="button"
            onClick={() => {
              setSeconds(0);
              setRecording(true);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-indigo-400 transition hover:bg-indigo-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-500 dark:hover:bg-white/10"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}

        <motion.button
          type="button"
          onClick={handleToggle}
          whileTap={{ scale: 0.92 }}
          className={cn(
            "relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300",
            recording
              ? "bg-gradient-to-br from-red-500 to-rose-600 shadow-xl shadow-red-500/40"
              : "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/35",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-full ring-4 transition-all",
              recording ? "ring-red-500/20" : "ring-indigo-500/20",
            )}
          />
          {recording && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/25"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {recording ? (
            <Square className="h-6 w-6 fill-white text-white" />
          ) : (
            <Mic className="h-6 w-6 text-white" />
          )}
        </motion.button>
      </div>

      <motion.div
        className={cn(
          "font-mono text-3xl font-extrabold tabular-nums tracking-widest",
          recording ? "text-indigo-600 dark:text-indigo-300" : "text-indigo-200 dark:text-gray-700",
        )}
        animate={recording ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {fmt(seconds)}
      </motion.div>

      <div className="min-h-[22px] flex-shrink-0">
        <AnimatePresence mode="wait">
          {savedDuration != null && savedDuration > 0 && !recording ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400"
            >
              <CheckCircle2 className="h-3 w-3" />
              Saved — {savedDuration.toFixed(1)}s
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-indigo-300 dark:text-gray-600"
            >
              {recording ? "Recording… tap to stop" : "Tap mic to start"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
