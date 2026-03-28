import { motion } from "framer-motion";
import { units } from "@shared/units";
import { UNIT_CARD_ACCENTS, hubContainerVariants } from "../constants";
import { UnitGridCard } from "./UnitGridCard";
import type { UnitAttemptRecord } from "@/store/unit-attempt.store";

type Props = {
  attemptsByUnitId: Record<string, UnitAttemptRecord>;
  onUnitSelect: (unitId: string) => void;
  /** When set, completed units show a restart control that calls this (typically reset + navigate). */
  onRestartUnit?: (unitId: string) => void;
};

export function UnitGrid({ attemptsByUnitId, onUnitSelect, onRestartUnit }: Props) {
  return (
    <motion.div
      variants={hubContainerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {units.map((u, index) => (
        <UnitGridCard
          key={u.id}
          unit={u}
          index={index}
          accentGradient={UNIT_CARD_ACCENTS[index % UNIT_CARD_ACCENTS.length]}
          attempt={attemptsByUnitId[u.id]}
          onSelect={() => onUnitSelect(u.id)}
          onRestartUnit={onRestartUnit}
        />
      ))}
    </motion.div>
  );
}
