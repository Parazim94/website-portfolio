export interface WorkExperience {
  company: string;
  role: string;
  period: string;
}

export interface WorkProject {
  slug: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  imageUrl?: string;
}

export const workExperience: WorkExperience = {
  company: "Plan B Net Zero",
  role: "Full-Stack Webentwickler",
  period: "MM/YYYY – MM/YYYY",
};

export const workProjects: WorkProject[] = [
  {
    slug: "projekt-1",
    title: "Projekt 1",
    period: "MM/YYYY – MM/YYYY",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "projekt-2",
    title: "Projekt 2",
    period: "MM/YYYY – MM/YYYY",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "projekt-3",
    title: "Projekt 3",
    period: "MM/YYYY – MM/YYYY",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
];
