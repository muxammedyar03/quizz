import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { useLocation } from "wouter";

import { AppTopBar } from "@/components/layout/AppTopBar";
import { Button } from "@/components/ui/button";

const AVATAR_URL = "/author-avatar.png";

const paragraphs = [
  "I am Altinay Turejanova, a researcher at Karakalpak State University named after Berdakh, specializing in English language teaching methodology. I have completed my Bachelor's and Master's degrees and am currently pursuing my doctoral studies.",
  "My research focuses on developing upper secondary school students' English speaking skills through the use of podcasts, with particular attention to Karakalpak-medium schools. My academic interests include modern educational technologies, multimedia tools in language education, podcast-based learning, and the improvement of learners' oral communication competence.",
  "I am actively involved in academic research and in the creation of digital educational resources aimed at supporting effective English language teaching and learning.",
] as const;

export default function AboutPage() {
  const [, setLocation] = useLocation();
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const floatLoop = reduceMotion
    ? {}
    : {
        animate: { y: [0, -6, 0] },
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -right-24 top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          {...(reduceMotion
            ? {}
            : { animate: { opacity: [0.35, 0.55, 0.35] }, transition: { duration: 8, repeat: Infinity } })}
        />
        <motion.div
          aria-hidden
          className="absolute -left-20 bottom-40 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
          {...(reduceMotion
            ? {}
            : { animate: { opacity: [0.25, 0.45, 0.25] }, transition: { duration: 10, repeat: Infinity } })}
        />
      </div>

      <AppTopBar>
        <Button
          variant="ghost"
          className="gap-2 border border-gray-400 dark:border-border rounded-xl"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back
        </Button>
      </AppTopBar>

      <main className="container relative mx-auto px-4 pb-20 pt-24 md:pb-28 md:pt-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14 lg:gap-16"
        >
          <motion.div
            variants={item}
            className="flex flex-col items-center md:items-start"
          >
            <motion.div className="relative w-full max-w-[280px] md:max-w-none" {...floatLoop}>
              <motion.div
                className="relative"
                {...(!reduceMotion
                  ? {
                      initial: { opacity: 0, scale: 0.94 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
                    }
                  : {})}
              >
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/40 via-accent/30 to-primary/20 opacity-80 blur-md" />
                <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/40 shadow-2xl shadow-primary/10 ring-1 ring-border/50 backdrop-blur-sm">
                  <img
                    src={AVATAR_URL}
                    alt="Portrait of Altinay Turejanova"
                    className="aspect-[3/4] w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </motion.div>
            </motion.div>
            <div className="mt-6 text-center md:text-left">
              <p className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Altinay Turejanova
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
                Karakalpak State University named after Berdakh
              </p>
            </div>
          </motion.div>

          <motion.article variants={item} className="min-w-0">
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.div variants={item}>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  About the author
                </span>
                <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  Biography
                </h1>
              </motion.div>

              <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {paragraphs.map((text, i) => (
                  <motion.p key={i} variants={item}>
                    {text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.article>
        </motion.div>
      </main>
    </div>
  );
}
