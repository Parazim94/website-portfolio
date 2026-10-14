import { allProjects, type PortfolioProject } from "@/lib/all-projects";

// Schreibweisen aus Projekt-Tags auf die Skill-Namen abbilden.
const ALIASES: Record<string, string> = {
  "tailwind css": "tailwind",
  express: "express.js",
};

function normalize(name: string) {
  const base = name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/\s+\d+(\.\d+)*$/, "")
    .trim();

  return ALIASES[base] ?? base;
}

export function projectsForSkill(skill: string): PortfolioProject[] {
  const wanted = normalize(skill);

  return allProjects.filter((project) =>
    project.tags.some((tag) => normalize(tag) === wanted),
  );
}
