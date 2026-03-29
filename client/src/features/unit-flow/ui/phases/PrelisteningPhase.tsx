import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { UnitData } from "@shared/schema";
import { unitFlowCardClass } from "../../constants";
import { VoiceRecorderCard } from "../VoiceRecorderCard";
import { CtaButton } from "../CtaButton";
import { SectionLabel } from "../SectionLabel";

type Props = {
  unit: UnitData;
  savedDuration: number | null;
  onRecordingComplete: (seconds: number) => void;
  onContinue: () => void;
};

export function PrelisteningPhase({ unit, savedDuration, onRecordingComplete, onContinue }: Props) {
  const canContinue = !!(savedDuration && savedDuration > 0);

  return (
    <motion.div
      key="pre"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden"
    >
      <SectionLabel letter="A" label="Prelistening" />

      //<AudioPlayer src={unit.audioPreUrl} />

      <div className={unitFlowCardClass}>
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-500/70">
          Questions
        </p>
        <ol className="space-y-2">
          {unit.prelistening.questions.map((q, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-sm leading-snug text-indigo-800 dark:text-gray-300"
            >
              <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-400">
                {i + 1}
              </span>
              {q}
            </li>
          ))}
        </ol>
      </div>

      <VoiceRecorderCard savedDuration={savedDuration} onComplete={onRecordingComplete} />

      <CtaButton onClick={onContinue} disabled={!canContinue}>
        Continue to While listening
        <ArrowRight className="h-4 w-4" />
      </CtaButton>
    </motion.div>
  );
}
