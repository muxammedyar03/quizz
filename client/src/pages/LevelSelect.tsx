import { motion } from "framer-motion";
import { LevelCard } from "@/features/level-select/ui/LevelCard";
import { Headphones, LucideInfo } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function LevelSelect() {
  const [, setLocation] = useLocation();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      {/* <div className="fixed top-0 p-2 left-0 right-0 z-50 backdrop-blur-sm border-b border-border flex justify-end">
        <Button variant="ghost" className="mr-2 border border-gray-400 dark:border-border" onClick={() => setLocation('/about')}>
          <LucideInfo className="w-4 h-4" /> About
        </Button>
        <ThemeToggle />
      </div> */}
       <div className="fixed top-2 p-3 right-2 rounded-xl z-50 backdrop-blur-sm border border-gray-700/30 flex justify-end">
        <Button variant="ghost" className="mr-2 border border-gray-400 dark:border-border" onClick={() => setLocation('/about')}>
          <LucideInfo className="w-4 h-4" /> About
        </Button>
        <ThemeToggle />
      </div>
      <main className="container mx-auto px-4 py-16 md:py-24">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2"
          >
            <Headphones className="w-4 h-4" />
            <span>English Listening Practice</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground"
          >
            Master Your Listening Skills
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Select your proficiency level to begin a tailored audio quiz designed to test and improve your comprehension.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          <motion.div variants={item} className="h-full">
            <LevelCard 
              title="Beginner" 
              description="Simple conversations and clear pronunciation. Perfect for those just starting their journey."
              level="beginner"
              questionCount={10}
              duration="10 min"
            />
          </motion.div>

          <motion.div variants={item} className="h-full">
            <LevelCard 
              title="Intermediate" 
              description="Natural speed conversations with varied topics. Challenge yourself with everyday scenarios."
              level="intermediate"
              questionCount={15}
              duration="15 min"
            />
          </motion.div>

          <motion.div variants={item} className="h-full">
            <LevelCard 
              title="Advanced" 
              description="Complex topics, fast-paced speech, and diverse accents. For those seeking mastery."
              level="advanced"
              questionCount={20}
              duration="20 min"
            />
          </motion.div>
        </motion.div>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-24 text-sm text-muted-foreground"
        >
          <p>© 2026 English Listening Quiz. Designed for students.</p>
        </motion.footer>
      </main>
    </div>
  );
}
