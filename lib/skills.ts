import { Code2, Server, Wrench, type LucideIcon } from "lucide-react";

export type SkillIntensity = "high" | "medium" | "low";

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  intensity: SkillIntensity;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    intensity: "high",
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
    intensity: "medium",
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
    intensity: "low",
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
