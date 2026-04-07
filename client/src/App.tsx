import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

import LevelSelect from "@/pages/LevelSelect";
import AboutPage from "@/pages/AboutPageNew";
import IntermediateHubPage from "@/pages/IntermediateHubPage";
import UnitFlowPage from "@/pages/UnitFlowPage";
import ResultPage from "@/pages/ResultPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LevelSelect} />
      <Route path="/about" component={AboutPage} />
      <Route path="/quiz/:level/:unitId" component={UnitFlowPage} />
      <Route path="/quiz/:level" component={IntermediateHubPage} />
      <Route path="/result" component={ResultPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
