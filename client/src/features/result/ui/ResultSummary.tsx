import { motion } from "framer-motion";
import { CheckCircle, XCircle, Trophy, BarChart2, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ResultSummaryProps {
  score: number;
  total: number;
  level: string;
  onRetry: () => void;
  onGoHome?: () => void;
}

export function ResultSummary({ score, total, level, onRetry, onGoHome }: ResultSummaryProps) {
  const percentage = Math.round((score / total) * 100);
  
  let message = "Keep Practicing!";
  let subMessage = "Consistency is key to mastering listening skills.";
  let color = "text-orange-500";
  
  if (percentage >= 90) {
    message = "Outstanding!";
    subMessage = "You have excellent listening comprehension skills.";
    color = "text-yellow-500";
  } else if (percentage >= 70) {
    message = "Great Job!";
    subMessage = "You're doing very well, keep it up!";
    color = "text-green-500";
  } else if (percentage >= 50) {
    message = "Good Effort";
    subMessage = "You're getting there. Review your mistakes to improve.";
    color = "text-blue-500";
  }

  return (
    <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center max-w-4xl mx-auto mb-12">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-6 inline-flex p-4 rounded-full bg-secondary/50"
      >
        <Trophy className={`w-12 h-12 ${color}`} />
      </motion.div>
      
      <h2 className="text-3xl font-display font-bold mb-2">{message}</h2>
      <p className="text-muted-foreground mb-8">{subMessage}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div className="text-sm text-muted-foreground mb-1">Score</div>
          <div className={`text-3xl font-bold ${color}`}>{score}/{total}</div>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div className="text-sm text-muted-foreground mb-1">Percentage</div>
          <div className="text-3xl font-bold text-foreground">{percentage}%</div>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div className="text-sm text-muted-foreground mb-1">Level</div>
          <div className="text-3xl font-bold text-foreground capitalize">{level}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRetry} className="gap-2 h-12 px-8 text-base border border-border bg-transparent text-popover-foreground">
          <RotateCcw className="w-4 h-4" />
          Retry Quiz
        </Button>
        {onGoHome ? (
          <Button onClick={onGoHome} className="gap-2 h-12 px-8 text-base bg-primary hover:bg-primary/90">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        ) : (
          <Link href="/">
            <Button className="gap-2 h-12 px-8 text-base bg-primary hover:bg-primary/90">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
