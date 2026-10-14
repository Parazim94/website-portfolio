"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { SKILL_FOCUS_EVENT } from "@/lib/skill-focus";
import { allProjects } from "@/lib/all-projects";
import { projectsForSkill } from "@/lib/skill-projects";
import { skillGroups, type SkillGroup } from "@/lib/skills";
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

const terminalCommands = [
  'claude "Plane das Feature und schlage einen Ansatz vor"',
  'claude "Setze den Plan um und teste ihn"',
  'claude "Prüfe den Diff auf Fehler und Randfälle"',
  'claude "Schreibe Tests für die neue API"',
];

function TypingTerminal() {
  const [text, setText] = useState(terminalCommands[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let command = 0;
    let length = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = terminalCommands[command];
      length += deleting ? -1 : 1;
      setText(current.slice(0, length));

      let delay = deleting ? 18 : 45;

      if (!deleting && length === current.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && length === 0) {
        deleting = false;
        command = (command + 1) % terminalCommands.length;
        delay = 350;
      }

      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="mt-6 overflow-hidden rounded-xl border border-border bg-background/70 font-mono text-sm"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
      </div>
      <p className="min-h-12 px-4 py-3 break-words">
        <span className="text-primary">&gt; </span>
        {text}
        <motion.span
          className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-primary"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            times: [0, 0.5, 0.5, 1],
          }}
        />
      </p>
    </div>
  );
}

interface Line {
  slug: string;
  d: string;
}

function SkillNetwork({
  group,
  initialSelected,
}: {
  group: SkillGroup;
  initialSelected: string | null;
}) {
  const [selected, setSelected] = useState<string | null>(initialSelected);
  const [hovered, setHovered] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef(new Map<string, HTMLElement>());
  const pillRefs = useRef(new Map<string, HTMLElement>());

  const focus = hovered ?? selected;
  const linked = focus ? projectsForSkill(focus) : [];
  const linkedSlugs = new Set(linked.map((project) => project.slug));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const chip = focus ? chipRefs.current.get(focus) : undefined;

      if (!focus || !chip) {
        setLines([]);
        return;
      }

      const origin = container.getBoundingClientRect();
      const from = chip.getBoundingClientRect();
      const x1 = from.left + from.width / 2 - origin.left;
      const y1 = from.bottom - origin.top;

      setLines(
        projectsForSkill(focus).flatMap((project) => {
          const pill = pillRefs.current.get(project.slug);
          if (!pill) return [];

          const to = pill.getBoundingClientRect();
          const x2 = to.left + to.width / 2 - origin.left;
          const y2 = to.top - origin.top;
          const mid = (y2 - y1) / 2;

          return [
            {
              slug: project.slug,
              d: `M ${x1} ${y1} C ${x1} ${y1 + mid}, ${x2} ${y2 - mid}, ${x2} ${y2}`,
            },
          ];
        }),
      );
    };

    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [focus]);

  return (
    <div ref={containerRef} className="relative mt-6">
      <motion.ul
        variants={chipContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-2"
      >
        {group.skills.map((skill) => {
          const count = projectsForSkill(skill).length;
          const isSelected = selected === skill;

          return (
            <motion.li key={skill} variants={chip}>
              <motion.button
                type="button"
                ref={(node) => {
                  if (node) chipRefs.current.set(skill, node);
                  else chipRefs.current.delete(skill);
                }}
                aria-pressed={isSelected}
                onClick={() => setSelected(isSelected ? null : skill)}
                onMouseEnter={() => setHovered(skill)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(skill)}
                onBlur={() => setHovered(null)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                  isSelected || hovered === skill
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/30 bg-primary/10 text-foreground",
                )}
              >
                {skill}
                {count > 0 ? (
                  <span className="ml-1.5 text-xs opacity-70">{count}</span>
                ) : null}
              </motion.button>
            </motion.li>
          );
        })}
      </motion.ul>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible sm:block"
      >
        {lines.map((line) => (
          <motion.path
            key={`${focus}-${line.slug}`}
            d={line.d}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        ))}
      </svg>

      <p className="mt-10 mb-3 text-xs text-muted-foreground">
        {focus
          ? linked.length > 0
            ? `${focus} kommt in ${linked.length} ${linked.length === 1 ? "Projekt" : "Projekten"} vor`
            : `${focus} ist eine Arbeitsweise oder ein Werkzeug ohne eigene Projekt-Zuordnung`
          : "Klicke oder fahre über einen Skill, um zu sehen, wo ich ihn eingesetzt habe."}
      </p>

      <ul className="flex flex-wrap gap-2">
        {allProjects.map((project) => {
          const isLinked = linkedSlugs.has(project.slug);

          return (
            <li key={project.slug}>
              <a
                href="#projects"
                ref={(node) => {
                  if (node) pillRefs.current.set(project.slug, node);
                  else pillRefs.current.delete(project.slug);
                }}
                className={cn(
                  "block rounded-lg border px-3 py-1.5 text-sm transition-all duration-300",
                  isLinked
                    ? "border-primary bg-primary/15 text-foreground"
                    : focus
                      ? "border-border text-muted-foreground opacity-35"
                      : "border-border text-muted-foreground",
                )}
              >
                {project.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SkillsSection() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const [pendingSkill, setPendingSkill] = useState<string | null>(null);
  const [focusNonce, setFocusNonce] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = skillGroups.find((group) => group.id === activeId)!;

  useEffect(() => {
    const onFocusSkill = (event: Event) => {
      const skill = (event as CustomEvent<string>).detail;
      const group = skillGroups.find((entry) => entry.skills.includes(skill));
      if (!group) return;

      setActiveId(group.id);
      setPendingSkill(skill);
      setFocusNonce((nonce) => nonce + 1);
    };

    window.addEventListener(SKILL_FOCUS_EVENT, onFocusSkill);
    return () => window.removeEventListener(SKILL_FOCUS_EVENT, onFocusSkill);
  }, []);

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
              onClick={() => {
                setActiveId(group.id);
                setPendingSkill(null);
              }}
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

            {active.id === "ai" ? <TypingTerminal /> : null}

            <SkillNetwork
              key={`${active.id}-${focusNonce}`}
              group={active}
              initialSelected={
                pendingSkill && active.skills.includes(pendingSkill)
                  ? pendingSkill
                  : null
              }
            />

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
