import type { UnitData } from "./schema";
import { units } from "./units";

/** Tracks that share the same unit flow UI; units are disjoint slices of the 20-unit curriculum. */
export const HUB_LEVELS = ["beginner", "intermediate", "advanced"] as const;
export type HubLevel = (typeof HUB_LEVELS)[number];

export function isHubLevel(s: string | undefined): s is HubLevel {
  return s !== undefined && (HUB_LEVELS as readonly string[]).includes(s);
}

/**
 * Beginner: orders 1–5 (I–V). No overlap with other tracks.
 * Intermediate: orders 6–15 (10 units); UI labels I–X via {@link getRomanLabelForHub}.
 * Advanced: orders 16–20 (5 units); UI labels I–V via {@link getRomanLabelForHub}.
 */
export function getUnitsForHubLevel(level: HubLevel): UnitData[] {
  const sorted = [...units].sort((a, b) => a.order - b.order);
  switch (level) {
    case "beginner":
      return sorted.filter((u) => u.order >= 1 && u.order <= 5);
    case "intermediate":
      return sorted.filter((u) => u.order >= 6 && u.order <= 15);
    case "advanced":
      return sorted.filter((u) => u.order >= 16 && u.order <= 20);
  }
}

export function isUnitInHubLevel(unitId: string, level: HubLevel): boolean {
  return getUnitsForHubLevel(level).some((u) => u.id === unitId);
}

/** Roman numerals I–X for positional labels within a track (Intermediate + Advanced). */
const ROMAN_1_TO_X = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;

/**
 * Roman label shown in the hub and unit flow for this track.
 * Intermediate: I–X for the 10 course units (orders 6–15).
 * Advanced: I–V for the five course units (orders 16–20).
 * Beginner: canonical `unit.romanNumeral` from data (I–V).
 */
export function getRomanLabelForHub(unit: UnitData, hubLevel: HubLevel): string {
  const track = getUnitsForHubLevel(hubLevel);
  const idx = track.findIndex((u) => u.id === unit.id);
  if (idx < 0) return unit.romanNumeral;
  if (hubLevel === "intermediate" || hubLevel === "advanced") {
    return ROMAN_1_TO_X[idx] ?? unit.romanNumeral;
  }
  return unit.romanNumeral;
}
