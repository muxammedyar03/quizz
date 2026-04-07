import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

import { getUnitById } from "@shared/units";
import { type HubLevel, getUnitsForHubLevel, isHubLevel } from "@shared/levelUnits";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { useUnitAttemptStore } from "@/store/unit-attempt.store";
import { IntermediateHubBackground } from "@/features/intermediate-hub/ui/IntermediateHubBackground";
import { IntermediateHubHero } from "@/features/intermediate-hub/ui/IntermediateHubHero";
import { IntermediateHubHomeButton } from "@/features/intermediate-hub/ui/IntermediateHubHomeButton";
import { UnitsRomanTabBar } from "@/features/intermediate-hub/ui/UnitsRomanTabBar";
import { UnitsSectionDivider } from "@/features/intermediate-hub/ui/UnitsSectionDivider";
import { UnitGrid } from "@/features/intermediate-hub/ui/UnitGrid";
import NotFound from "@/pages/not-found";

const sectionDividerLabel: Record<HubLevel, string> = {
  beginner: "Starter units (I–V)",
  intermediate: "Core units (I–X)",
  advanced: "Challenge units (I–V)",
};

export default function IntermediateHubPage() {
  const [, params] = useRoute("/quiz/:level");
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const ensureReveals = useUnitAttemptStore((s) => s.ensureReveals);
  const resetUnit = useUnitAttemptStore((s) => s.resetUnit);
  const attemptsByUnitId = useUnitAttemptStore((s) => s.attemptsByUnitId);

  const rawLevel = params?.level;

  useEffect(() => {
    ensureReveals();
    const t = window.setInterval(() => ensureReveals(), 10_000);
    return () => window.clearInterval(t);
  }, [ensureReveals]);

  if (!isHubLevel(rawLevel)) {
    return <NotFound />;
  }
  const hubLevel: HubLevel = rawLevel;

  const hubUnits = getUnitsForHubLevel(hubLevel);

  const handleUnitNavigate = (unitId: string) => {
    setActiveTab(unitId);
    setLocation(`/quiz/${hubLevel}/${unitId}`);
  };

  const handleRestartUnit = (unitId: string) => {
    const u = getUnitById(unitId);
    if (!u) return;
    resetUnit(unitId, u.whileListening.questions.length);
    handleUnitNavigate(unitId);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-violet-50/60 to-sky-50 dark:bg-[#0d1117] dark:[background-image:none]"
    >
      <IntermediateHubBackground />

      <AppTopBar>
        <IntermediateHubHomeButton onClick={() => setLocation("/")} />
      </AppTopBar>

      <main className="relative z-10 container mx-auto px-4 pb-20 pt-16">
        <IntermediateHubHero hubLevel={hubLevel} />

        <UnitsRomanTabBar
          hubLevel={hubLevel}
          units={hubUnits}
          attemptsByUnitId={attemptsByUnitId}
          activeTab={activeTab}
          onUnitSelect={handleUnitNavigate}
        />

        <UnitsSectionDivider label={sectionDividerLabel[hubLevel]} />

        <UnitGrid
          hubLevel={hubLevel}
          attemptsByUnitId={attemptsByUnitId}
          onUnitSelect={handleUnitNavigate}
          onRestartUnit={handleRestartUnit}
          units={hubUnits}
        />
      </main>
    </div>
  );
}
