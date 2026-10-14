"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/site-config";
import { heroTechStack } from "@/lib/tech-stack";

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

export function HeroSection() {
  return (
    <section id="hero" className="relative scroll-mt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden mask-[linear-gradient(to_bottom,black,transparent)]"
      >
        <div className="hero-glow absolute top-1/4 left-1/4 h-xl w-xl -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="bg-dot-grid absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[65vh] max-w-5xl flex-col items-start justify-center gap-6 px-4 py-16 sm:px-6">
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
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
            </span>
            {siteConfig.role}
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.p variants={item} className="text-lg text-muted-foreground">
              Hallo, ich bin
            </motion.p>

            <motion.h1
              variants={item}
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            >
              <span className="bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>{" "}
              <motion.span
                className="inline-block origin-[70%_70%]"
                animate={{ rotate: [0, 15, -10, 15, -10, 15, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              >
                👋
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            variants={item}
            className="max-w-xl text-lg text-muted-foreground"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div variants={item}>
            <Button size="lg" asChild>
              <a href="#projects">Projekte ansehen</a>
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
        aria-label="Zur nächsten Sektion scrollen"
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
