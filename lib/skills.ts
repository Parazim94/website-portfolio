import { Code2, Palette, Server, Wrench, type LucideIcon } from "lucide-react";

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "REST APIs", "PostgreSQL"],
  },
  {
    title: "Design",
    icon: Palette,
    skills: ["Figma", "Design Systems", "Barrierefreiheit"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "Docker", "Vercel", "CI/CD"],
  },
];
