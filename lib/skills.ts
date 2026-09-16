import { Code2, Server, Wrench, type LucideIcon } from "lucide-react";

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      "HTML",
      "CSS",
      "Scss",
      "JavaScript (ES6)",
      "React",
      "React Native",
      "TypeScript",
      "Next.js",
      "Astro.js",
      "Tailwind",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "REST-API",
      "Axios",
      "MongoDB",
      "NoSQL",
      "MySQL",
      "PostgreSQL",
      "Supabase",
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Figma",
      "Linux",
      "Windows",
      "macOS",
    ],
  },
];
