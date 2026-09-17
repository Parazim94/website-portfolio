export interface WorkExperience {
  company: string;
  role: string;
  period: string;
}

export interface WorkProject {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  images?: string[];
}

export const workExperience: WorkExperience = {
  company: "Plan B Net Zero",
  role: "Full-Stack Webentwickler",
  period: "2025 – 2026",
};

export const workProjects: WorkProject[] = [
  {
    slug: "gamification",
    title: "Gamification",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "ki-scanner",
    title: "KI Scanner",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "plan-b-neo-app",
    title: "Plan B Neo App",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "plan-b-sales-app",
    title: "Plan B Sales App",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "tarifrechner",
    title: "Tarifrechner",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
];
