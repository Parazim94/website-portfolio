"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useT, useUi } from "@/components/providers/locale-provider";
import type { L } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { heroTechStack } from "@/lib/tech-stack";

const roles: L[] = [
  { de: "Web-Apps", en: "web apps" },
  { de: "Mobile-Apps", en: "mobile apps" },
  { de: "KI-gestützte Tools", en: "AI-powered tools" },
  { de: "Echtzeit-Anwendungen", en: "real-time applications" },
];

const nameWords = siteConfig.name.split(" ");

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const nameWord = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const t = useT();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => setIndex((current) => (current + 1) % roles.length),
      2600,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={t(roles[index])}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="font-semibold whitespace-nowrap text-primary"
        >
          {t(roles[index])}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HeroSection() {
  const t = useT();
  const ui = useUi();
  const backdropRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    const rect = backdrop.getBoundingClientRect();
    backdrop.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    backdrop.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section
      id="hero"
      onMouseMove={onMouseMove}
      className="relative scroll-mt-16"
    >
      <div
        ref={backdropRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden mask-[linear-gradient(to_bottom,black_60%,transparent)]"
      >
        <div className="hero-blob hero-blob-a absolute top-[8%] left-[6%] h-72 w-72 sm:h-96 sm:w-96" />
        <div className="hero-blob hero-blob-b absolute top-[30%] right-[4%] h-64 w-64 sm:h-80 sm:w-80" />
        <div className="hero-blob hero-blob-c absolute bottom-[4%] left-[38%] h-56 w-56 sm:h-72 sm:w-72" />
        <div className="bg-dot-grid absolute inset-0" />
        <div className="hero-dots-lit absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col items-start justify-center gap-6 px-4 py-20 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col items-start gap-6"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-sm text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t(siteConfig.role)}
          </motion.div>

          <div className="flex flex-col gap-1">
            <motion.p variants={item} className="text-lg text-muted-foreground">
              {ui.hero.greeting}
            </motion.p>

            <motion.h1
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl"
            >
              {nameWords.map((word) => (
                <motion.span
                  key={word}
                  variants={nameWord}
                  className="hero-name mr-[0.25em] inline-block pb-[0.1em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            variants={item}
            className="text-xl text-muted-foreground sm:text-2xl"
          >
            {ui.hero.iBuild} <RotatingRole />
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-xl text-lg text-muted-foreground"
          >
            {t(siteConfig.tagline)}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3"
          >
            <Button size="lg" asChild>
              <a href="#projects">{ui.hero.projects}</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">{ui.hero.contact}</a>
            </Button>
            <Button size="icon-lg" variant="ghost" asChild>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button size="icon-lg" variant="ghost" asChild>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-4">
            {heroTechStack.map(({ name, icon: Icon }) => (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <span
                    tabIndex={0}
                    className="text-muted-foreground/60 outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
                  >
                    <Icon className="h-5 w-5" aria-label={name} />
                  </span>
                </TooltipTrigger>
                <TooltipContent>{name}</TooltipContent>
              </Tooltip>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground/60 transition-colors hover:text-foreground"
        aria-label={ui.hero.scrollDown}
      >
        <motion.span
          className="block"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
