"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/sections/project-card";
import {
  allProjects,
  projectFilters,
  type ProjectCategory,
} from "@/lib/all-projects";
import { workExperience } from "@/lib/experience";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

type Filter = "all" | ProjectCategory;

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = allProjects
    .filter((project) => filter === "all" || project.category === filter)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <section
      id="projects"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow="Projekte"
        title="Was ich gebaut habe"
        description="Eigene Projekte, Arbeiten aus meiner Berufserfahrung und Projekte aus Ausbildung und Weiterbildung."
      />

      <div
        role="group"
        aria-label="Projekte filtern"
        className="mt-8 flex flex-wrap gap-2"
      >
        {projectFilters.map(({ id, label }) => {
          const count =
            id === "all"
              ? allProjects.length
              : allProjects.filter((project) => project.category === id).length;
          const active = filter === id;

          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
              <span className="ml-1.5 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {filter === "work" ? (
        <div className="mt-6 flex flex-col gap-1 border-b border-border/40 pb-4 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <p className="text-lg font-semibold">{workExperience.company}</p>
            <p className="text-sm text-muted-foreground">
              {workExperience.role}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {workExperience.period}
          </p>
        </div>
      ) : null}

      <motion.div
        key={filter}
        initial="hidden"
        animate="visible"
        variants={container}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
