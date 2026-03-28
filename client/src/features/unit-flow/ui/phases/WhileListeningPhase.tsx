import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { UnitData } from "@shared/schema";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { unitFlowCardClass } from "../../constants";
import { SectionLabel } from "../SectionLabel";
import { CtaButton } from "../CtaButton";

type Props = {
  unit: UnitData;
  whileAnswers: string[];
  onAnswerChange: (index: number, value: string) => void;
  onBack: () => void;
  onNext: () => void;
};

export function WhileListeningPhase({ unit, whileAnswers, onAnswerChange, onBack, onNext }: Props) {
  return (
    <motion.div
      key="while"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
      className="flex min-h-0 flex-1 flex-col gap-3"
    >
      <SectionLabel letter="B" label="While listening" />

      <AudioPlayer src={unit.audioWhileUrl} />

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-0.5">
        {unit.whileListening.questions.map((q, i) => (
          <div key={i} className={unitFlowCardClass}>
            <Label className="mb-2 flex gap-2.5 text-sm font-semibold leading-snug text-indigo-800 dark:text-gray-200">
              <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-400">
                {i + 1}
              </span>
              {q}
            </Label>
            <Textarea
              className="min-h-[80px] resize-none rounded-xl border-indigo-100 bg-indigo-50/50 text-sm text-indigo-900 placeholder:text-indigo-300 focus:border-indigo-400 focus:ring-indigo-400/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-200 dark:placeholder:text-gray-600"
              value={whileAnswers[i] ?? ""}
              onChange={(e) => onAnswerChange(i, e.target.value)}
              placeholder="Write your answer here…"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-shrink-0 gap-2.5">
        <div className="min-w-0 flex-1">
          <CtaButton variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </CtaButton>
        </div>
        <div className="min-w-0 flex-1">
          <CtaButton onClick={onNext}>
            Post listening
            <ArrowRight className="h-4 w-4" />
          </CtaButton>
        </div>
      </div>
    </motion.div>
  );
}
