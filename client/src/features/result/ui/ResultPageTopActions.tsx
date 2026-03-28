import { Headphones, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppTopBar, AppTopBarAboutButton } from "@/components/layout/AppTopBar";

type Props = {
  onHome: () => void;
  onUnits: () => void;
};

export function ResultPageTopActions({ onHome, onUnits }: Props) {
  return (
    <AppTopBar>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <AppTopBarAboutButton />
      </div>
    </AppTopBar>
  );
}
