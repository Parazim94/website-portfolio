"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  aboutFacts,
  aboutHeadline,
  aboutParagraph,
  aboutPrinciples,
  aboutStats,
  availability,
  interests,
  journey,
  type AboutStat,
  type JourneyStep,
} from "@/lib/about";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, margin: "-80px" } as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function Headline() {
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
      className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
    >
      {aboutHeadline.map((word, index) => (
        <motion.span
          key={`${word.text}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.4 }}
          className={cn(
            "mr-[0.3em] inline-block",
            word.highlight && "text-primary",
          )}
        >
          {word.text}
        </motion.span>
      ))}
    </motion.h2>
  );
}

function RevealWord({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className="text-lg leading-relaxed">
      {words.map((word, index) => (
        <RevealWord
          key={`${word}-${index}`}
          word={word}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
        />
      ))}
    </p>
  );
}

function Counter({ stat }: { stat: AboutStat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const controls = animate(0, stat.value, {
      duration: reduceMotion ? 0 : 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <div className="min-w-0">
      <p className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        <span ref={ref}>{value.toLocaleString("de-DE")}</span>
        {stat.suffix}
      </p>
      <p className="mt-1 text-xs wrap-break-word hyphens-auto text-muted-foreground sm:text-sm">
        {stat.label}
      </p>
    </div>
  );
}

function TiltPhoto() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 14);
    rotateX.set(-y * 14);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-65 md:mx-0">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-3xl bg-primary/25 blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, filter: "blur(16px)", scale: 0.95 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ perspective: 800 }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative"
      >
        <motion.div
          style={{ rotateX: springX, rotateY: springY }}
          className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-muted"
        >
          <Image
            src="/images/profile.jpg"
            alt={siteConfig.name}
            fill
            sizes="(min-width: 768px) 260px, 60vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function SpotlightCard({
  className,
  children,
  href,
}: {
  className?: string;
  children: React.ReactNode;
  href?: string;
}) {
  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--my",
      `${event.clientY - rect.top}px`,
    );
  };

  const classes = cn(
    "group relative block overflow-hidden rounded-xl border border-border bg-card p-4 transition-colors",
    href && "hover:border-primary/50",
    className,
  );
  const spotlight = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)",
      }}
    />
  );

  return href ? (
    <a href={href} onMouseMove={onMouseMove} className={classes}>
      {spotlight}
      <span className="relative block">{children}</span>
    </a>
  ) : (
    <div onMouseMove={onMouseMove} className={classes}>
      {spotlight}
      <div className="relative">{children}</div>
    </div>
  );
}

function JourneyNode({
  step,
  index,
  progress,
}: {
  step: JourneyStep;
  index: number;
  progress: MotionValue<number>;
}) {
  const threshold = index / (journey.length - 1);
  const reached = useTransform(
    progress,
    [Math.max(threshold - 0.08, 0), threshold],
    [0, 1],
  );
  const scale = useTransform(reached, [0, 1], [0.85, 1.1]);
  const background = useTransform(
    reached,
    [0, 1],
    ["var(--card)", "var(--primary)"],
  );
  const color = useTransform(
    reached,
    [0, 1],
    ["var(--muted-foreground)", "var(--primary-foreground)"],
  );

  return (
    <motion.span
      style={{ scale, backgroundColor: background, color }}
      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/50"
    >
      <step.icon className="h-5 w-5" aria-hidden="true" />
    </motion.span>
  );
}

function JourneyTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <ol ref={ref} className="relative mt-6 grid gap-10 md:grid-cols-4 md:gap-6">
      <div
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-5 w-px bg-border md:hidden"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: progress, transformOrigin: "top" }}
        className="absolute top-5 bottom-5 left-5 w-0.5 -translate-x-px bg-primary md:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px bg-border md:block"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress, transformOrigin: "left" }}
        className="absolute top-[19px] right-[12.5%] left-[12.5%] hidden h-0.5 bg-primary md:block"
      />

      {journey.map((step, index) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="relative flex gap-4 md:flex-col md:items-center md:text-center"
        >
          <JourneyNode step={step} index={index} progress={progress} />

          <div className="flex-1 rounded-xl border border-border bg-card p-4 md:w-full md:flex-none">
            <p className="text-xs font-medium text-primary">{step.period}</p>
            <p className="mt-1 font-semibold">{step.title}</p>
            <p className="text-sm text-muted-foreground">{step.place}</p>
            <p className="mt-3 text-sm text-muted-foreground">{step.text}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5 md:justify-center">
              {step.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <span className="text-sm font-medium text-primary">Über mich</span>
      <div className="mt-2">
        <Headline />
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,260px)_1fr] md:items-start">
        <div className="flex flex-col gap-5">
          <TiltPhoto />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto flex w-full max-w-65 flex-col gap-3 md:mx-0"
          >
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-3 py-1 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {availability}
            </span>

            <div className="flex gap-2">
              <Button asChild size="icon" variant="outline">
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="E-Mail schreiben"
                >
                  <Mail />
                </a>
              </Button>
              <Button asChild size="icon" variant="outline">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="icon" variant="outline">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8">
          <ScrollRevealText text={aboutParagraph} />

          <div className="grid grid-cols-3 gap-3 border-y border-border/60 py-6 sm:gap-4">
            {aboutStats.map((stat) => (
              <Counter key={stat.label} stat={stat} />
            ))}
          </div>

          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid grid-cols-2 gap-3"
          >
            {aboutFacts.map((fact) => (
              <motion.div key={fact.label} variants={rise}>
                <SpotlightCard href={fact.href}>
                  <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                    <fact.icon
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-lg font-semibold">Wie ich arbeite</h3>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-4 grid gap-4 sm:grid-cols-3"
        >
          {aboutPrinciples.map((principle) => (
            <motion.div
              key={principle.title}
              variants={rise}
              className="h-full"
            >
              <SpotlightCard className="h-full">
                <principle.icon
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                <p className="mt-3 font-medium">{principle.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {principle.text}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16">
        <h3 className="text-lg font-semibold">Mein Weg</h3>
        <JourneyTimeline />
      </div>

      <div className="mt-16">
        <h3 className="text-lg font-semibold">Abseits vom Code</h3>
        <ul className="mt-4 flex flex-wrap gap-3">
          {interests.map((interest) => (
            <motion.li
              key={interest.label}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <a
                href="#projects"
                className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/50"
              >
                <interest.icon
                  className="h-4 w-4 text-primary"
                  aria-hidden="true"
                />
                <span>
                  {interest.label}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {interest.hint}
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
