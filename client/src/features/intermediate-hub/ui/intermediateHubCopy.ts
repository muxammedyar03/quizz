import type { HubLevel } from "@shared/levelUnits";

export const hubHeroCopy: Record<
  HubLevel,
  { badge: string; titleWord: string; subtitle: string }
> = {
  beginner: {
    badge: "Beginner",
    titleWord: "Unit",
    subtitle:
      "Five starter units (I–V), unique to this track: Prelistening, While listening, and Post listening.",
  },
  intermediate: {
    badge: "Intermediate",
    titleWord: "Unit",
    subtitle:
      "Ten core units, labeled I–X here (course VI–XV). No overlap with Beginner or Advanced—same three-step flow.",
  },
  advanced: {
    badge: "Advanced",
    titleWord: "Unit",
    subtitle:
      "Five challenge units labeled I–V here (course units XVI–XX). Same flow; deeper topics—exclusive to this track.",
  },
};
