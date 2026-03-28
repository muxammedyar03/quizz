/** 5 minutes — results unlock after submit */
export const RESULT_REVEAL_DELAY_MS = 5 * 60 * 1000;

export type ScoreBreakdown = {
  prelisteningPoints: number;
  prelisteningMax: number;
  whileListeningPoints: number;
  whileListeningMax: number;
  videoPoints: number;
  videoMax: number;
  total: number;
  maxTotal: number;
  preBand: "low" | "medium" | "high";
};

const PRE_MAX = 30;
const WHILE_MAX = 50;
const VIDEO_MAX = 20;

/** Recording length: &lt;10s low, 10–30s medium, &gt;30s high */
export function scorePrelisteningDuration(seconds: number): { points: number; band: ScoreBreakdown["preBand"] } {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return { points: 0, band: "low" };
  }
  if (seconds < 10) {
    return { points: Math.round(PRE_MAX / 3), band: "low" };
  }
  if (seconds <= 30) {
    return { points: Math.round((PRE_MAX * 2) / 3), band: "medium" };
  }
  return { points: PRE_MAX, band: "high" };
}

function scoreAnswerLength(chars: number): number {
  if (chars <= 0) return 0;
  if (chars < 40) return 0.33;
  if (chars < 120) return 0.66;
  return 1;
}

/** Per-answer share of WHILE_MAX; bonus if all answers meet minimum length */
export function scoreWhileListeningAnswers(answers: string[]): { points: number; perAnswer: number[] } {
  const n = answers.length;
  if (n === 0) return { points: 0, perAnswer: [] };
  const share = WHILE_MAX / n;
  const perAnswer = answers.map((a) => scoreAnswerLength(a.trim().length) * share);
  let points = perAnswer.reduce((s, p) => s + p, 0);
  const allAboveMin = answers.every((a) => a.trim().length >= 40);
  if (allAboveMin && n > 0) {
    points = Math.min(WHILE_MAX, points + 2);
  }
  return { points: Math.round(Math.min(WHILE_MAX, points)), perAnswer };
}

export function scoreVideoUpload(uploaded: boolean): number {
  return uploaded ? VIDEO_MAX : 0;
}

export function computeUnitScore(
  preRecordingDurationSec: number,
  whileAnswers: string[],
  videoUploaded: boolean,
): ScoreBreakdown {
  const pre = scorePrelisteningDuration(preRecordingDurationSec);
  const wh = scoreWhileListeningAnswers(whileAnswers);
  const vid = scoreVideoUpload(videoUploaded);
  const total = pre.points + wh.points + vid;
  return {
    prelisteningPoints: pre.points,
    prelisteningMax: PRE_MAX,
    whileListeningPoints: wh.points,
    whileListeningMax: WHILE_MAX,
    videoPoints: vid,
    videoMax: VIDEO_MAX,
    total,
    maxTotal: PRE_MAX + WHILE_MAX + VIDEO_MAX,
    preBand: pre.band,
  };
}
