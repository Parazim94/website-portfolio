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
      "JavaScript (ES6)",
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "MongoDB", "REST-API", "Axios"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code"],
  },
];
