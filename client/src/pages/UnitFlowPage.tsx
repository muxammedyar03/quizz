import { useCallback, useEffect, useMemo } from "react";
import { useRoute, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";

import { getUnitById } from "@shared/units";
import {
  useUnitAttemptStore,
  isPendingResults,
  isRevealed,
} from "@/store/unit-attempt.store";

import { UnitFlowShell } from "@/features/unit-flow/ui/UnitFlowShell";
import { UnitFlowHeader } from "@/features/unit-flow/ui/UnitFlowHeader";
import { StepProgress } from "@/features/unit-flow/ui/StepProgress";
import { PendingResultsView } from "@/features/unit-flow/ui/PendingResultsView";
import { RevealedResultsView } from "@/features/unit-flow/ui/RevealedResultsView";
import { UnitFlowNotFound } from "@/features/unit-flow/ui/flow-states/UnitFlowNotFound";
import { UnitFlowLoading } from "@/features/unit-flow/ui/flow-states/UnitFlowLoading";
import { PrelisteningPhase } from "@/features/unit-flow/ui/phases/PrelisteningPhase";
import { WhileListeningPhase } from "@/features/unit-flow/ui/phases/WhileListeningPhase";
import { PostListeningPhase } from "@/features/unit-flow/ui/phases/PostListeningPhase";
import type { UnitFlowPhase } from "@/features/unit-flow/constants";

export default function UnitFlowPage() {
  const [, params] = useRoute("/quiz/intermediate/:unitId");
  const [, setLocation] = useLocation();
  const unitId = params?.unitId ?? "";
  const unit = useMemo(() => getUnitById(unitId), [unitId]);

  const ensureReveals = useUnitAttemptStore((s) => s.ensureReveals);
  const getOrCreateDraft = useUnitAttemptStore((s) => s.getOrCreateDraft);
  const patchDraft = useUnitAttemptStore((s) => s.patchDraft);
  const setWhileAnswers = useUnitAttemptStore((s) => s.setWhileAnswers);
  const submitUnit = useUnitAttemptStore((s) => s.submitUnit);
  const resetUnit = useUnitAttemptStore((s) => s.resetUnit);
  const attempt = useUnitAttemptStore((s) => s.attemptsByUnitId[unitId]);

  useEffect(() => {
    ensureReveals();
    const t = window.setInterval(() => ensureReveals(), 5000);
    return () => window.clearInterval(t);
  }, [ensureReveals]);

  useEffect(() => {
    if (unit) getOrCreateDraft(unit.id, unit.whileListening.questions.length);
  }, [unit, unitId, getOrCreateDraft]);

  const goBack = useCallback(() => setLocation("/quiz/intermediate"), [setLocation]);

  if (!unitId || !unit) {
    return (
      <UnitFlowShell onBack={() => setLocation("/")}>
        <UnitFlowNotFound onBack={goBack} />
      </UnitFlowShell>
    );
  }

  if (!attempt) {
    return (
      <UnitFlowShell onBack={goBack}>
        <UnitFlowLoading />
      </UnitFlowShell>
    );
  }

  const att = attempt;

  if (att.status === "submitted_pending" && isPendingResults(att)) {
    return (
      <UnitFlowShell onBack={goBack}>
        <PendingResultsView
          unitTitle={unit.title}
          resultsVisibleAfter={att.resultsVisibleAfter!}
          onBack={goBack}
        />
      </UnitFlowShell>
    );
  }

  if (isRevealed(att)) {
    return (
      <UnitFlowShell onBack={goBack}>
        <RevealedResultsView
          attempt={att}
          unitTitle={unit.title}
          onBack={goBack}
          onSeeResultPage={() => setLocation(`/result?unit=${encodeURIComponent(unit.id)}`)}
          onRestart={() => resetUnit(unit.id, unit.whileListening.questions.length)}
        />
      </UnitFlowShell>
    );
  }

  const phase = att.phase as UnitFlowPhase;

  return (
    <UnitFlowShell onBack={goBack}>
      <div className="relative z-10 mx-auto flex h-full w-full max-w-2xl flex-1 flex-col gap-0 px-4 pb-5 pt-3">
        <UnitFlowHeader unit={unit} />
        <StepProgress current={phase} />

        <AnimatePresence mode="wait">
          {phase === "pre" && (
            <PrelisteningPhase
              unit={unit}
              savedDuration={att.preRecordingDurationSec ?? null}
              onRecordingComplete={(sec) => patchDraft(unit.id, { preRecordingDurationSec: sec })}
              onContinue={() => patchDraft(unit.id, { phase: "while" })}
            />
          )}

          {phase === "while" && (
            <WhileListeningPhase
              unit={unit}
              whileAnswers={att.whileAnswers}
              onAnswerChange={(i, value) => {
                const next = [...att.whileAnswers];
                next[i] = value;
                setWhileAnswers(unit.id, next);
              }}
              onBack={() => patchDraft(unit.id, { phase: "pre" })}
              onNext={() => patchDraft(unit.id, { phase: "post" })}
            />
          )}


          {phase === "post" && (
            <PostListeningPhase
              discussionPrompts={unit.postlistening.discussionPrompts ?? []}
              videoUploaded={att.videoUploaded}
              videoSize={att.videoSize}
              onVideoFileChange={(f) =>
                patchDraft(unit.id, { videoUploaded: !!f, videoSize: f?.size ?? null })
              }
              onBack={() => patchDraft(unit.id, { phase: "while" })}
              onSubmit={() => {
                submitUnit(unit.id);
                ensureReveals();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </UnitFlowShell>
  );
}
