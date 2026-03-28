import { useEffect, useMemo, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  PartyPopper,
  Upload,
} from "lucide-react";
import { getUnitById } from "@shared/units";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { VoiceRecorder } from "@/features/units/VoiceRecorder";
import {
  useUnitAttemptStore,
  isPendingResults,
  isRevealed,
  type UnitAttemptRecord,
} from "@/store/unit-attempt.store";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

function formatMsRemaining(until: number) {
  const ms = Math.max(0, until - Date.now());
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function PendingResultsView({
  unitTitle,
  resultsVisibleAfter,
  onBack,
}: {
  unitTitle: string;
  resultsVisibleAfter: number;
  onBack: () => void;
}) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const i = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(i);
  }, []);

  return (
    <Card className="mx-auto max-w-lg border-primary/20 p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
      <h2 className="font-display text-xl font-bold">Results submitted</h2>
      <p className="mt-2 text-muted-foreground">
        Your answers for <span className="font-medium text-foreground">{unitTitle}</span> have been sent.
        Results will be available in approximately{" "}
        <span className="font-mono font-semibold text-foreground">{formatMsRemaining(resultsVisibleAfter)}</span>.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        A clock icon is shown on this unit in the list until your score is ready.
      </p>
      <Button className="mt-6" variant="secondary" onClick={onBack}>
        Back to units
      </Button>
    </Card>
  );
}

function RevealedView({
  attempt,
  unitTitle,
  onBack,
  onSeeResultPage,
}: {
  attempt: UnitAttemptRecord;
  unitTitle: string;
  onBack: () => void;
  onSeeResultPage: () => void;
}) {
  const b = attempt.scoreBreakdown!;
  const pct = Math.round((b.total / b.maxTotal) * 100);
  return (
    <Card className="mx-auto max-w-lg border-green-500/20 p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
        <PartyPopper className="h-8 w-8" />
      </div>
      <h2 className="font-display text-xl font-bold">Results ready</h2>
      <p className="mt-1 text-muted-foreground">{unitTitle}</p>
      <p className="mt-6 text-4xl font-bold tabular-nums">{pct}%</p>
      <p className="text-sm text-muted-foreground">
        {b.total} / {b.maxTotal} points
      </p>
      <div className="mt-6 space-y-2 text-left text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Prelistening (recording)</span>
          <span>
            {b.prelisteningPoints}/{b.prelisteningMax}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">While listening (text)</span>
          <span>
            {b.whileListeningPoints}/{b.whileListeningMax}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Video upload</span>
          <span>
            {b.videoPoints}/{b.videoMax}
          </span>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button variant="secondary" onClick={onBack}>
          Units
        </Button>
        <Button onClick={onSeeResultPage}>Open results page</Button>
      </div>
    </Card>
  );
}

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
  const attempt = useUnitAttemptStore((s) => s.attemptsByUnitId[unitId]);

  useEffect(() => {
    ensureReveals();
    const t = window.setInterval(() => ensureReveals(), 5000);
    return () => window.clearInterval(t);
  }, [ensureReveals]);

  useEffect(() => {
    if (unit) {
      getOrCreateDraft(unit.id, unit.whileListening.questions.length);
    }
  }, [unit, unitId, getOrCreateDraft]);

  if (!unitId || !unit) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-muted-foreground">Unit not found.</p>
        <Button className="ml-4" onClick={() => setLocation("/quiz/intermediate")}>
          Back
        </Button>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-muted-foreground">Loading unit…</span>
      </div>
    );
  }

  const att = attempt;

  if (att.status === "submitted_pending" && isPendingResults(att)) {
    return (
      <div className="min-h-screen bg-background px-4 py-24">
        <AppTopBar />
        <PendingResultsView
          unitTitle={unit.title}
          resultsVisibleAfter={att.resultsVisibleAfter!}
          onBack={() => setLocation("/quiz/intermediate")}
        />
      </div>
    );
  }

  if (isRevealed(att)) {
    return (
      <div className="min-h-screen bg-background px-4 py-24">
        <AppTopBar />
        <RevealedView
          attempt={att}
          unitTitle={unit.title}
          onBack={() => setLocation("/quiz/intermediate")}
          onSeeResultPage={() => setLocation(`/result?unit=${encodeURIComponent(unit.id)}`)}
        />
      </div>
    );
  }

  const phase = att.phase;
  const stepIndex = phase === "pre" ? 0 : phase === "while" ? 1 : 2;
  const progressPct = ((stepIndex + 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <AppTopBar>
        <Button
          variant="ghost"
          className="gap-2 border border-gray-400 dark:border-border"
          onClick={() => setLocation("/quiz/intermediate")}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Units
        </Button>
      </AppTopBar>

      <main className="container mx-auto max-w-3xl px-4 pb-24 pt-20">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Unit {unit.romanNumeral}</p>
          <h1 className="font-display text-2xl font-bold md:text-3xl">{unit.title}</h1>
          <p className="text-muted-foreground">{unit.theme}</p>
          <Progress value={progressPct} className="mt-4 h-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            Step {stepIndex + 1} of 3 —{" "}
            {phase === "pre" ? "Prelistening" : phase === "while" ? "While listening" : "Post listening"}
          </p>
        </div>

        {phase === "pre" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <p className="text-sm font-medium text-primary">A) Prelistening</p>
            <AudioPlayer src={unit.audioPreUrl} />
            <div className="space-y-3">
              <h3 className="font-semibold">Questions</h3>
              <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                {unit.prelistening.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </div>
            <Card className="p-4">
              <p className="mb-3 text-sm font-medium">Voice response</p>
              <VoiceRecorder
                onComplete={(sec) => patchDraft(unit.id, { preRecordingDurationSec: sec })}
              />
              {att.preRecordingDurationSec != null && att.preRecordingDurationSec > 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Saved recording length: {att.preRecordingDurationSec.toFixed(1)}s
                </p>
              )}
            </Card>
            <Button
              className="w-full sm:w-auto"
              disabled={!att.preRecordingDurationSec || att.preRecordingDurationSec <= 0}
              onClick={() => patchDraft(unit.id, { phase: "while" })}
            >
              Continue to While listening
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {phase === "while" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <p className="text-sm font-medium text-primary">B) While listening</p>
            <AudioPlayer src={unit.audioWhileUrl} />
            <div className="space-y-6">
              {unit.whileListening.questions.map((q, i) => (
                <div key={i}>
                  <Label className="text-base font-medium leading-snug">
                    {i + 1}. {q}
                  </Label>
                  <Textarea
                    className="mt-2 min-h-[100px]"
                    value={att.whileAnswers[i] ?? ""}
                    onChange={(e) => {
                      const next = [...att.whileAnswers];
                      next[i] = e.target.value;
                      setWhileAnswers(unit.id, next);
                    }}
                    placeholder="Write your answer."
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => patchDraft(unit.id, { phase: "pre" })}>
                Back
              </Button>
              <Button onClick={() => patchDraft(unit.id, { phase: "post" })}>
                Next: Post listening
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {phase === "post" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <p className="text-sm font-medium text-primary">C) Post listening</p>
            <Card className="p-4">
              <h3 className="mb-2 font-semibold">Audio transcript</h3>
              <div className="max-h-64 overflow-y-auto whitespace-pre-wrap text-sm text-muted-foreground">
                {unit.postlistening.transcript?.trim()
                  ? unit.postlistening.transcript
                  : "Transcript will appear here when you add it to the unit data."}
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="mb-2 font-semibold">Group video</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Upload a short video of your group (file is not stored in the browser; only whether you submitted
                counts toward your score).
              </p>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border py-10">
                <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Choose video file</span>
                <input
                  type="file"
                  accept="video/*"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    patchDraft(unit.id, {
                      videoUploaded: !!f,
                      videoSize: f?.size ?? null,
                    });
                  }}
                />
              </label>
              {att.videoUploaded && (
                <p className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  File selected
                  {att.videoSize != null ? ` (${Math.round(att.videoSize / 1024)} KB)` : ""}
                </p>
              )}
            </Card>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => patchDraft(unit.id, { phase: "while" })}>
                Back
              </Button>
              <Button
                onClick={() => {
                  submitUnit(unit.id);
                  ensureReveals();
                }}
              >
                Submit test
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
