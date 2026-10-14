import { Code2, Server, Sparkles, Wrench, type LucideIcon } from "lucide-react";

export type SkillIntensity = "high" | "medium" | "low";

export interface SkillDetail {
  name: string;
  text: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  intensity: SkillIntensity;
  summary: string;
  skills: string[];
  details?: SkillDetail[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    summary:
      "Oberflächen, die schnell laden, sich gut anfühlen und auf jedem Gerät funktionieren.",
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
    id: "backend",
    title: "Backend",
    summary:
      "APIs, Datenbanken und Echtzeit-Anbindungen, die die Oberfläche zuverlässig versorgen.",
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
    id: "ai",
    title: "KI & Agents",
    icon: Sparkles,
    intensity: "high",
    summary:
      "KI ist fester Teil meines Arbeitsalltags: vom Coden mit Agents bis zu KI-Funktionen in eigenen Apps.",
    skills: [
      "Claude Code",
      "Agentisches Coding",
      "Prompt Engineering",
      "Context Engineering",
      "MCP",
      "Gemini API",
      "Function Calling",
    ],
    details: [
      {
        name: "Agentisches Coding",
        text: "Features mit Claude Code planen, umsetzen und prüfen. Ich steuere, der Agent erledigt die Fleißarbeit.",
      },
      {
        name: "Prompt & Context Engineering",
        text: "Aufgaben so zuschneiden und mit Kontext versorgen, dass Ergebnisse verlässlich und nachvollziehbar sind.",
      },
      {
        name: "MCP & Tool Use",
        text: "Modelle über das Model Context Protocol und Function Calling mit Werkzeugen und Daten verbinden.",
      },
      {
        name: "LLM-APIs in Apps",
        text: "KI-Funktionen in eigene Produkte einbauen, etwa der Gesprächspartner im Karamasow-Begleiter über die Gemini-API.",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    summary: "Werkzeuge für sauberen Code, Zusammenarbeit und Design.",
    icon: Wrench,
    intensity: "low",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Linux", "Windows", "macOS"],
  },
];
