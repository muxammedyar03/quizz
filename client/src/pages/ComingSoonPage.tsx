import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Construction, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppTopBar } from "@/components/layout/AppTopBar";

export default function ComingSoonPage() {
  const [, params] = useRoute("/quiz/:level");
  const [, setLocation] = useLocation();
  const level = params?.level ?? "level";

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <AppTopBar />
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Construction className="h-10 w-10" />
          </div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">{level}</p>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Coming soon</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            This level is not available yet. Please try the Intermediate track with unit-based listening tasks.
          </p>
          <Button className="mt-8" onClick={() => setLocation("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to levels
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
