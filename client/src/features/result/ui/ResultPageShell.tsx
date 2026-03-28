import type { ReactNode } from "react";
import { IntermediateHubBackground } from "@/features/intermediate-hub/ui/IntermediateHubBackground";

type Props = {
  children: ReactNode;
};

/**
 * Same visual shell as Intermediate hub / unit flow: gradient, blobs, dark solid bg.
 */
export function ResultPageShell({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-violet-50/60 to-sky-50 dark:bg-[#0d1117] dark:[background-image:none]">
      <IntermediateHubBackground />
      {children}
    </div>
  );
}
