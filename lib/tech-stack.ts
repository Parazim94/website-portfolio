import {
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export interface TechStackItem {
  name: string;
  icon: typeof SiReact;
}

export const heroTechStack: TechStackItem[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb },
];
