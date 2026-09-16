"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

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
    <section
      id="hero"
      className="relative isolate flex min-h-[65vh] scroll-mt-16 flex-col items-start justify-center gap-6 overflow-hidden py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black,transparent)]"
      >
        <div className="hero-glow absolute top-1/4 left-1/4 h-144 w-144 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="bg-dot-grid absolute inset-0" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex flex-col items-start gap-6"
      >
        <motion.h1
          variants={item}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Hallo, ich bin {siteConfig.name}{" "}
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
      </motion.div>
    </section>
  );
}
