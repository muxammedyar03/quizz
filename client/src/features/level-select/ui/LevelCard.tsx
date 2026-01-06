import { Link } from "wouter";
import { ArrowRight, BookOpen, Music, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelCardProps {
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  questionCount: number;
  duration: string;
}

export function LevelCard({ title, description, level, questionCount, duration }: LevelCardProps) {
  const icons = {
    beginner: <BookOpen className="w-6 h-6 text-green-500" />,
    intermediate: <Music className="w-6 h-6 text-blue-500" />,
    advanced: <Zap className="w-6 h-6 text-purple-500" />,
  };

  const gradients = {
    beginner: "from-green-500/20 to-green-500/5 hover:to-green-500/10 border-green-200 dark:border-green-900",
    intermediate: "from-blue-500/20 to-blue-500/5 hover:to-blue-500/10 border-blue-200 dark:border-blue-900",
    advanced: "from-purple-500/20 to-purple-500/5 hover:to-purple-500/10 border-purple-200 dark:border-purple-900",
  };

  const textColors = {
    beginner: "text-green-700 dark:text-green-400",
    intermediate: "text-blue-700 dark:text-blue-400",
    advanced: "text-purple-700 dark:text-purple-400",
  };

  return (
    <Link href={`/quiz/${level}`} className="group block h-full">
      <div className={cn(
        "h-full relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        gradients[level]
      )}>
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          {icons[level]}
        </div>

        <div className="flex flex-col h-full justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white dark:bg-black/20 rounded-lg shadow-sm">
                {icons[level]}
              </div>
              <span className={cn("text-xs font-bold uppercase tracking-wider py-1 px-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm", textColors[level])}>
                {level}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 group-hover:text-foreground transition-colors">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5">
            <div className="flex gap-4 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" /> {questionCount} Questions
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3" /> {duration}
              </span>
            </div>
            
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
              level === 'beginner' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
              level === 'intermediate' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
              'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
            )}>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
