"use client";

import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { skillGroups } from "@/lib/skills";
import { cn } from "@/lib/utils";

const marqueeRows = [
  skillGroups.flatMap((group) => group.skills),
  skillGroups.flatMap((group) => group.skills).reverse(),
];

const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const chip = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 20 },
  },
};

function MarqueeRow({
  skills,
  reverse,
}: {
  skills: string[];
  reverse?: boolean;
}) {
  return (
    <div className="marquee overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={cn(
          "animate-marquee flex w-max gap-3",
          reverse && "animate-marquee-reverse",
        )}
      >
        {[...skills, ...skills].map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm whitespace-nowrap text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = skillGroups.find((group) => group.id === activeId)!;

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    panel.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section
      id="skills"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow="Skills"
        title="Womit ich arbeite"
        description="Ein Überblick über die Technologien und Werkzeuge, mit denen ich täglich arbeite."
      />

      <div className="mt-10 flex flex-col gap-3" aria-hidden="true">
        {marqueeRows.map((skills, index) => (
          <MarqueeRow key={index} skills={skills} reverse={index === 1} />
        ))}
      </div>

      <div
        role="tablist"
        aria-label="Skill-Kategorien"
        className="mt-10 flex flex-wrap gap-2"
      >
        {skillGroups.map((group) => {
          const isActive = group.id === activeId;

          return (
            <button
              key={group.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls="skills-panel"
              onClick={() => setActiveId(group.id)}
              className={cn(
                "relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive
                  ? "border-transparent text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="skills-tab"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
              <group.icon
                className={cn(
                  "relative h-4 w-4",
                  group.id === "ai" && !isActive && "text-primary",
                )}
                aria-hidden="true"
              />
              <span className="relative">{group.title}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        id="skills-panel"
        role="tabpanel"
        onMouseMove={onMouseMove}
        className="group relative mt-4 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <p className="max-w-2xl text-muted-foreground">{active.summary}</p>

            <motion.ul
              variants={chipContainer}
              initial="hidden"
              animate="visible"
              className="mt-6 flex flex-wrap gap-2"
            >
              {active.skills.map((skill) => (
                <motion.li
                  key={skill}
                  variants={chip}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-foreground"
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>

            {active.details ? (
              <motion.div
                variants={chipContainer}
                initial="hidden"
                animate="visible"
                className="mt-8 grid gap-4 sm:grid-cols-2"
              >
                {active.details.map((detail) => (
                  <motion.div
                    key={detail.name}
                    variants={chip}
                    className="rounded-xl border border-border bg-background/60 p-4"
                  >
                    <p className="font-medium">{detail.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {detail.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
