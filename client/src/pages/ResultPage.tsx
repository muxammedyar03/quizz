import { useLocation, useSearch } from "wouter";

import { ResultPageShell } from "@/features/result/ui/ResultPageShell";
import { ResultPageTopActions } from "@/features/result/ui/ResultPageTopActions";
import { UnitResultView } from "@/features/result/ui/UnitResultView";
import { McqResultView } from "@/features/result/ui/McqResultView";
import { parseUnitIdFromSearch } from "@/features/result/utils/parseResultQuery";

export default function ResultPage() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const unitId = parseUnitIdFromSearch(search);

  return (
    <ResultPageShell>
      <ResultPageTopActions
        onHome={() => setLocation("/")}
        onUnits={() => setLocation("/quiz/intermediate")}
      />
      <main className="relative z-10 container mx-auto max-w-4xl px-4 pb-24 pt-14">
        {unitId ? <UnitResultView unitId={unitId} /> : <McqResultView />}
      </main>
    </ResultPageShell>
  );
}
