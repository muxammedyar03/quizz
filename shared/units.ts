import raw from "./units.json";
import { UnitsBundleSchema, type UnitData } from "./schema";

export const unitsBundle = UnitsBundleSchema.parse(raw);
export const units: UnitData[] = unitsBundle.units;

export function getUnitById(id: string): UnitData | undefined {
  return units.find((u) => u.id === id);
}
