import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Upload } from "lucide-react";
import { unitFlowCardClass } from "../../constants";
import { SectionLabel } from "../SectionLabel";
import { CtaButton } from "../CtaButton";
import { cn } from "@/lib/utils";

type Props = {
  discussionPrompts: string[];
  videoUploaded: boolean;
  videoSize: number | null;
  onVideoFileChange: (file: File | undefined) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export function PostListeningPhase({
  discussionPrompts,
  videoUploaded,
  videoSize,
  onVideoFileChange,
  onBack,
  onSubmit,
}: Props) {
  return (
    <motion.div
      key="post"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
      className="flex min-h-0 flex-1 flex-col gap-3"
    >
      <SectionLabel letter="C" label="Post listening" />

      {discussionPrompts.length > 0 && (
        <div className={cn(unitFlowCardClass, "flex min-h-0 max-h-[40vh] flex-col overflow-y-auto")}>
          <p className="mb-2 flex-shrink-0 text-xs font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-500/70">
            Tasks
          </p>
          <ol className="list-decimal space-y-2 pl-4 text-sm leading-relaxed text-indigo-800 dark:text-gray-300">
            {discussionPrompts.map((text, i) => (
              <li key={i} className="whitespace-pre-wrap pl-1">
                {text}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className={cn(unitFlowCardClass, "flex min-h-0 flex-1 flex-col")}>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-500/70">
          Group video
        </p>
        <p className="mb-3 text-xs text-indigo-400 dark:text-gray-600">
          Upload a short group video. Only submission counts for scoring.
        </p>
        <label
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-7 transition-colors",
            videoUploaded
              ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/5"
              : "border-indigo-100 bg-indigo-50/50 hover:border-indigo-300 hover:bg-indigo-50 dark:border-white/30 dark:bg-white/[0.02] dark:hover:border-indigo-500/30",
          )}
        >
          {videoUploaded ? (
            <>
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Selected{videoSize != null ? ` (${Math.round(videoSize / 1024)} KB)` : ""}
              </span>
            </>
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/10">
                <Upload className="h-5 w-5 text-indigo-400" />
              </div>
              <span className="text-xs text-indigo-400 dark:text-gray-600">Choose video file</span>
            </>
          )}
          <input
            type="file"
            accept="video/*"
            className="sr-only"
            onChange={(e) => onVideoFileChange(e.target.files?.[0] ?? undefined)}
          />
        </label>
      </div>

      <div className="flex flex-shrink-0 gap-2.5">
        <div className="min-w-0 flex-1">
          <CtaButton variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </CtaButton>
        </div>
        <div className="min-w-0 flex-1">
          <CtaButton variant="success" onClick={onSubmit}>
            <CheckCircle2 className="h-4 w-4" />
            Submit test
          </CtaButton>
        </div>
      </div>
    </motion.div>
  );
}
