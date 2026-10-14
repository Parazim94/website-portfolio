import { personalProjects, workProjects, type WorkProject } from "@/lib/experience";
import { projects as trainingProjects } from "@/lib/projects";

export type ProjectCategory = "personal" | "work" | "training";

export interface PortfolioProject extends WorkProject {
  category: ProjectCategory;
  period?: string;
  featured?: boolean;
}

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "Alle" },
  { id: "personal", label: "Eigene Projekte" },
  { id: "work", label: "Berufserfahrung" },
  { id: "training", label: "Ausbildung" },
];

const featuredSlugs = new Set(["abgrund", "plan-b-neo-app", "karamasow-begleiter"]);

const withCategory = (
  list: WorkProject[],
  category: ProjectCategory,
): PortfolioProject[] =>
  list.map((project) => ({
    ...project,
    category,
    featured: featuredSlugs.has(project.slug),
  }));

export const allProjects: PortfolioProject[] = [
  ...withCategory(personalProjects, "personal"),
  ...withCategory(workProjects, "work"),
  ...trainingProjects.map(
    (project): PortfolioProject => ({ ...project, category: "training" }),
  ),
];
