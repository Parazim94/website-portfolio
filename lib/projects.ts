export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "portfolio-website",
    title: "Portfolio-Website",
    description:
      "Diese Seite: eine performante, responsive Portfolio-Website mit Dark-Mode und sauber getrennten Komponenten.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-handle/portfolio-website",
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    description:
      "Eine Kanban-artige Aufgabenverwaltung mit Drag & Drop, optimistischen Updates und geteiltem State zwischen Team-Mitgliedern.",
    tags: ["React", "TypeScript", "Zustand", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-handle/task-manager",
  },
  {
    slug: "recipe-finder",
    title: "Recipe Finder",
    description:
      "Rezeptsuche mit Filtern nach Zutaten, Diätformen und Zubereitungszeit, angebunden an eine öffentliche REST-API.",
    tags: ["Next.js", "React Query", "Tailwind CSS"],
    githubUrl: "https://github.com/your-handle/recipe-finder",
  },
];
