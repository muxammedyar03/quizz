import { motion } from "framer-motion";
import { LevelCard } from "@/features/level-select/ui/LevelCard";
import { Headphones } from "lucide-react";
import { AppTopBar, AppTopBarAboutButton } from "@/components/layout/AppTopBar";

export default function LevelSelect() {
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
      <AppTopBar>
        <AppTopBarAboutButton />
      </AppTopBar>
      <main className="container mx-auto px-4 py-16 md:py-24">
        
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2"
          >
            <Headphones className="w-4 h-4" />
            <span>Listening and speaking practice</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground"
          >
            PodCastle - a voice-led path to knowledge
            </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            PodCastle – making learning through educational podcasts accessible, free, and enjoyable for everyone, while also developing listeners&apos; speaking and listening comprehension skills.

            <br />“Dawıs jeteklegen bilim jolı” <br />
            PodCastle – ta’limiy podkastlar arqalı bilim alıwdı hámme ushın qolay, tegin hám kewilli etedi, sonday-aq tıńlawshılardıń sóylew hám tıńlap túsiniw qábiletlerin rawajlandıradı.

          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 max-w-6xl mx-auto"
        >
          <motion.div variants={item} className="h-full">
            <LevelCard 
              title="Beginner" 
              description="Five units only—no overlap with Intermediate or Advanced. Pre, while, and post listening."
              level="beginner"
              questionCount={5}
              countLabel="Units"
              duration="Self-paced"
            />
          </motion.div>

          <motion.div variants={item} className="h-full">
            <LevelCard 
              title="Intermediate" 
              description="Ten units Disjoint from Beginner and Advanced; pre, while and post tasks."
              level="intermediate"
              questionCount={10}
              countLabel="Units"
              duration="Self-paced"
            />
          </motion.div>

          <motion.div variants={item} className="h-full">
            <LevelCard 
              title="Advanced" 
              description="Five challenge units labeled in the app. Same flow—exclusive to this track."
              level="advanced"
              questionCount={5}
              countLabel="Units"
              duration="Self-paced"
            />
          </motion.div>
        </motion.div>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-24 text-sm text-muted-foreground"
        >
          <p>© 2026 PodCastle - podcast based speaking trainer. Designed for students. <br /> Education is now in your pocket.</p>
        </motion.footer>
      </main>
    </div>
  );
}
