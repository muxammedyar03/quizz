import { motion } from "framer-motion";
import type { UnitData } from "@shared/schema";
import type { HubLevel } from "@shared/levelUnits";
import { getRomanLabelForHub } from "@shared/levelUnits";

type Props = { unit: UnitData; hubLevel: HubLevel };

export function UnitFlowHeader({ unit, hubLevel }: Props) {
  const roman = getRomanLabelForHub(unit, hubLevel);
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-3 flex-shrink-0">
      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-500">
        Unit {roman}
      </span>
      <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-indigo-950 dark:text-gray-50 md:text-3xl">
        {unit.title}
      </h1>
      <p className="mt-0.5 text-xs text-indigo-400 dark:text-gray-500">{unit.theme}</p>
    </motion.div>
  );
}
