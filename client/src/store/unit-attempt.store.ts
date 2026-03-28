import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  computeUnitScore,
  RESULT_REVEAL_DELAY_MS,
  type ScoreBreakdown,
} from "@/lib/unitScoring";

export type UnitAttemptStatus = "draft" | "submitted_pending" | "revealed";

export interface UnitAttemptRecord {
  unitId: string;
  status: UnitAttemptStatus;
  phase: "pre" | "while" | "post";
  preRecordingDurationSec: number | null;
  whileAnswers: string[];
  videoUploaded: boolean;
  videoSize: number | null;
  submittedAt: number | null;
  resultsVisibleAfter: number | null;
  scoreBreakdown: ScoreBreakdown | null;
  revealedAt: number | null;
}

interface UnitAttemptState {
  attemptsByUnitId: Record<string, UnitAttemptRecord>;
  ensureReveals: () => void;
  getOrCreateDraft: (unitId: string, whileQuestionCount: number) => UnitAttemptRecord;
  patchDraft: (unitId: string, patch: Partial<UnitAttemptRecord>) => void;
  setWhileAnswers: (unitId: string, answers: string[]) => void;
  submitUnit: (unitId: string) => void;
  resetUnit: (unitId: string) => void;
}

function emptyDraft(unitId: string, nWhile: number): UnitAttemptRecord {
  return {
    unitId,
    status: "draft",
    phase: "pre",
    preRecordingDurationSec: null,
    whileAnswers: Array.from({ length: nWhile }, () => ""),
    videoUploaded: false,
    videoSize: null,
    submittedAt: null,
    resultsVisibleAfter: null,
    scoreBreakdown: null,
    revealedAt: null,
  };
}

export const useUnitAttemptStore = create<UnitAttemptState>()(
  persist(
    (set, get) => ({
      attemptsByUnitId: {},

      ensureReveals: () => {
        const now = Date.now();
        const { attemptsByUnitId } = get();
        let changed = false;
        const next = { ...attemptsByUnitId };
        for (const [id, att] of Object.entries(next)) {
          if (
            att.status === "submitted_pending" &&
            att.resultsVisibleAfter != null &&
            now >= att.resultsVisibleAfter
          ) {
            const breakdown = computeUnitScore(
              att.preRecordingDurationSec ?? 0,
              att.whileAnswers,
              att.videoUploaded,
            );
            next[id] = {
              ...att,
              status: "revealed",
              scoreBreakdown: breakdown,
              revealedAt: now,
            };
            changed = true;
          }
        }
        if (changed) set({ attemptsByUnitId: next });
      },

      getOrCreateDraft: (unitId, whileQuestionCount) => {
        get().ensureReveals();
        const existing = get().attemptsByUnitId[unitId];
        if (existing) {
          if (existing.status !== "draft") return existing;
          const answers = [...existing.whileAnswers];
          while (answers.length < whileQuestionCount) answers.push("");
          answers.length = whileQuestionCount;
          const same =
            answers.length === existing.whileAnswers.length &&
            answers.every((a, i) => a === existing.whileAnswers[i]);
          if (!same) {
            set((s) => ({
              attemptsByUnitId: {
                ...s.attemptsByUnitId,
                [unitId]: { ...existing, whileAnswers: answers },
              },
            }));
          }
          return get().attemptsByUnitId[unitId]!;
        }
        const draft = emptyDraft(unitId, whileQuestionCount);
        set((s) => ({
          attemptsByUnitId: { ...s.attemptsByUnitId, [unitId]: draft },
        }));
        return get().attemptsByUnitId[unitId]!;
      },

      patchDraft: (unitId, patch) =>
        set((s) => {
          const cur = s.attemptsByUnitId[unitId];
          if (!cur || cur.status !== "draft") return s;
          return {
            attemptsByUnitId: {
              ...s.attemptsByUnitId,
              [unitId]: { ...cur, ...patch },
            },
          };
        }),

      setWhileAnswers: (unitId, answers) =>
        set((s) => {
          const cur = s.attemptsByUnitId[unitId];
          if (!cur || cur.status !== "draft") return s;
          return {
            attemptsByUnitId: {
              ...s.attemptsByUnitId,
              [unitId]: { ...cur, whileAnswers: answers },
            },
          };
        }),

      submitUnit: (unitId) =>
        set((s) => {
          const cur = s.attemptsByUnitId[unitId];
          if (!cur) return s;
          const submittedAt = Date.now();
          return {
            attemptsByUnitId: {
              ...s.attemptsByUnitId,
              [unitId]: {
                ...cur,
                status: "submitted_pending",
                submittedAt,
                resultsVisibleAfter: submittedAt + RESULT_REVEAL_DELAY_MS,
              },
            },
          };
        }),

      resetUnit: (unitId) =>
        set((s) => {
          const { [unitId]: _, ...rest } = s.attemptsByUnitId;
          return { attemptsByUnitId: rest };
        }),
    }),
    { name: "unit-listening-attempts" },
  ),
);

export function isPendingResults(att: UnitAttemptRecord | undefined): boolean {
  if (!att || att.status !== "submitted_pending") return false;
  if (!att.resultsVisibleAfter) return false;
  return Date.now() < att.resultsVisibleAfter;
}

export function isRevealed(att: UnitAttemptRecord | undefined): boolean {
  return att?.status === "revealed" && att.scoreBreakdown != null;
}
