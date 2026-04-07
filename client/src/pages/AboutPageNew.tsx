import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, GraduationCap, HomeIcon } from "lucide-react";
import { useLocation } from "wouter";

import { AppTopBar } from "@/components/layout/AppTopBar";
import { Button } from "@/components/ui/button";

const AVATAR_URL = "/author-avatar.png";

const paragraphs = [
  {
    text: (
      <>
        I am Altinay Turejanova, a researcher at{" "}
        <strong className="font-semibold text-foreground">
          Karakalpak State University named after Berdakh
        </strong>
        , specializing in English language teaching methodology. I have
        completed my Bachelor's and Master's degrees and am currently pursuing
        my doctoral studies.
      </>
    ),
  },
  {
    text: (
      <>
        My research focuses on developing upper secondary school students'{" "}
        <strong className="font-semibold text-foreground">
          English speaking skills through the use of podcasts
        </strong>
        , with particular attention to Karakalpak-medium schools. My academic
        interests include modern educational technologies, multimedia tools in
        language education, podcast-based learning, and the improvement of
        learners' oral communication competence.
      </>
    ),
  },
  {
    text: (
      <>
        I am actively involved in academic research and in the creation of{" "}
        <strong className="font-semibold text-foreground">
          digital educational resources
        </strong>{" "}
        aimed at supporting effective English language teaching and learning.
      </>
    ),
  },
  {
    text: (
      <>* * *</>
    ),
  },
  {
    text: (
      <>
        "Men Altınay Túrejanova, 
        <strong className="font-semibold text-foreground"> Berdiaq atındaǵı Qaraqalpaqstan mámleketlik universitetinde</strong> anglichan tilin oqıtıw metodikası boyınsha izertlewshi. 
        Men bakalavr hám magistr dárejelerin tamamlaǵanman hám házir doktorlıq izertlewlerimdi aparıp atırman."
      </>
    ),
  },
  {
    text: (
      <>
       "Meniń izertlewm orta bilim beriwdiń joqarı basqıshındaǵı oqıwshılardıń anglichan tilinde <strong className="font-semibold text-foreground"> sóylew qábiletin podkastlardan paydalanıw arqalı rawajlandırıw</strong>ǵa qaratılǵan bolıp, 
        ásirese, qaraqalpaq tilinde tálim beriletuǵın mekteplerge bólek itibar qaratıladı.
        Meniń ilimiy qızıǵıwshılıǵım zamanagóy tálim texnologiyaları, 
        til táliminde multimedia qurallarınan paydalanıw, podkastga tiykarlanǵan oqıtıw hám oqıwshılardıń awızsha baylanıs qábiletin jaqsılawdı óz ishine aladı.",
      </>
    ),
  },
  {
    text: (
      <>
        "Men aktiv túrde ilimiy izertlewler menen shuǵıllanaman hám nátiyjeli anglichan tilin oqıtıw hám úyreniwdi qollap-quwatlawǵa qaratılǵan <strong className="font-semibold text-foreground"> cifrlı tálim resursların jaratıwda </strong> qatnasıw etemen."
      </>
    ),
  },
] as const;

const researchAreas = [
  "Podcast-based English speaking skill development",
  "Modern educational technologies in ELT",
  "Oral communication competence improvement",
  "Multimedia tools for language education",
];

const stats = [
  { value: "2", label: "Degrees completed" },
  { value: "PhD", label: "Currently pursuing" },
  { value: "ELT", label: "Specialization" },
];

const tags = [
  {
    label: "PhD Candidate",
    color:
      "border-indigo-500/30 bg-indigo-500/10 text-indigo-800 dark:border-indigo-500/25 dark:text-indigo-300",
  },
  {
    label: "ELT Research",
    color:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:border-emerald-500/25 dark:text-emerald-300",
  },
  {
    label: "Podcasts",
    color: "border-blue-500/30 bg-blue-500/10 text-blue-800 dark:border-blue-500/25 dark:text-blue-300",
  },
];

export default function AboutPage() {
  const [, setLocation] = useLocation();
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-background to-background dark:from-primary/15">
      {/* Ambient orbs — softer in light mode */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-36 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px] dark:bg-indigo-600/15" />
        <div className="absolute -bottom-24 -right-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px] dark:bg-violet-600/12" />
        <div className="absolute right-24 top-48 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px] dark:bg-emerald-600/8" />
      </div>

      <AppTopBar className="top-2 right-4">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="gap-2 rounded-xl h-10 border border-gray-400 dark:border-border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-sm hover:bg-muted text-foreground"
        >
          <HomeIcon className="h-4 w-4 shrink-0" />
          Home
        </Button>
      </AppTopBar>

      {/* Main content */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-12 md:pt-16">
        {/* Badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            About the author
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-[280px_1fr] md:gap-10"
        >
          {/* Left column */}
          <motion.div variants={item} className="flex flex-col items-center">
            {/* Photo */}
            <div className="relative mb-5 w-44 h-44 md:w-full md:h-auto overflow-hidden rounded-full md:rounded-xl">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary/40 via-accent/25 to-primary/15 opacity-70 blur-lg dark:from-indigo-500/40 dark:via-violet-500/25 dark:to-emerald-500/15" />
              <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <img
                  src={AVATAR_URL}
                  alt="Portrait of Altinay Turejanova"
                  className="aspect-[3/4] w-full object-cover"
                  width={600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            </div>

            {/* Name card */}
            <div className="w-full rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
              <p className="text-lg font-bold tracking-tight text-foreground">
                Altinay Turejanova
              </p>
              <div className="mt-2 flex items-start justify-center gap-1.5">
                <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Karakalpak State University named after Berdakh
                </p>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-md border px-2.5 py-1 text-[11px] font-medium ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.article variants={item}>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Biography
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              About the{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Researcher
              </span>
            </h1>
            <div className="mb-6 mt-5 h-[3px] w-9 rounded-full bg-gradient-to-r from-primary to-accent" />

            {/* Paragraphs */}
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  variants={item}
                  className="text-sm leading-[1.85] text-muted-foreground"
                >
                  {p.text}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-7 grid grid-cols-3 gap-2.5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-card p-3 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold tracking-tight text-primary">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Research focus */}
            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/[0.06]">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Research focus areas
              </p>
              <div className="space-y-2">
                {researchAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-[13px] text-muted-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </motion.div>
      </main>
    </div>
  );
}
