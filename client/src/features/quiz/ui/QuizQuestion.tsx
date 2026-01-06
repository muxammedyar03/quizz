import { motion } from "framer-motion";
import { type Question } from "@shared/schema";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: Question;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export function QuizQuestion({ question, selectedOptionId, onSelectOption }: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl md:text-2xl font-bold leading-relaxed text-foreground/90">
          {question.text}
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;
          
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => onSelectOption(option.id)}
              className={cn(
                "relative flex items-center w-full p-4 text-left rounded-xl border-2 transition-all duration-200 group",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 mr-4 text-sm font-bold transition-colors",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary"
              )}>
                {String.fromCharCode(65 + index)}
              </div>
              
              <span className={cn(
                "flex-1 font-medium",
                isSelected ? "text-primary-foreground text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {option.text}
              </span>

              {isSelected && (
                <div className="absolute right-4 w-3 h-3 rounded-full bg-primary animate-pulse" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
