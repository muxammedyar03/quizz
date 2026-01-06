import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface QuizTimerProps {
  durationSeconds: number;
  onTimeUp: () => void;
  isFinished: boolean;
  className?: string;
}

export function QuizTimer({ durationSeconds, onTimeUp, isFinished, className }: QuizTimerProps) {
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
  let strokeColor = "hsl(var(--primary))";
  if (progressPercentage < 30) strokeColor = "hsl(var(--warning))";
  if (progressPercentage < 10) strokeColor = "hsl(var(--destructive))";

  // Circle parameters
  const size = 50;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Circular Progress */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-linear"
          />
        </svg>
        {/* Time text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${progressPercentage < 10 ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </div>
  );
}
