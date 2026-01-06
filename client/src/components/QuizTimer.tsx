import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizTimerProps {
  durationSeconds: number;
  onTimeUp: () => void;
  isFinished: boolean;
}

export function QuizTimer({ durationSeconds, onTimeUp, isFinished }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  
  useEffect(() => {
    if (isFinished) return;
    
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeLeft / durationSeconds) * 100;
  
  // Color logic for timer urgency
  let timerColor = "bg-primary";
  if (progressPercentage < 30) timerColor = "bg-warning";
  if (progressPercentage < 10) timerColor = "bg-destructive";

  return (
    <div className="flex flex-col gap-2 w-full max-w-[200px]">
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Time Remaining</span>
        </div>
        <span className={timeLeft < 30 ? "text-destructive font-bold animate-pulse" : "text-foreground"}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <Progress value={progressPercentage} className={`h-2 ${timerColor}`} />
    </div>
  );
}
