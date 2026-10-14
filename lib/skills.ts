import type { L, Locale } from "@/lib/i18n";
import { Code2, Server, Sparkles, Wrench, type LucideIcon } from "lucide-react";

export type SkillIntensity = "high" | "medium" | "low";

export interface SkillDetail {
  name: L;
  text: L;
}

export interface SkillGroup {
  id: string;
  title: L;
  icon: LucideIcon;
  intensity: SkillIntensity;
  summary: L;
  skills: string[];
  details?: SkillDetail[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: { de: "Frontend", en: "Frontend" },
    summary: {
      de: "Oberflächen, die schnell laden, sich gut anfühlen und auf jedem Gerät funktionieren.",
      en: "Interfaces that load fast, feel good and work on every device.",
    },
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
    title: { de: "Backend", en: "Backend" },
    summary: {
      de: "APIs, Datenbanken und Echtzeit-Anbindungen, die die Oberfläche zuverlässig versorgen.",
      en: "APIs, databases and real-time connections that reliably feed the interface.",
    },
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
    title: { de: "KI & Agents", en: "AI & Agents" },
    icon: Sparkles,
    intensity: "high",
    summary: {
      de: "KI ist fester Teil meines Arbeitsalltags: vom Coden mit Agents bis zu KI-Funktionen in eigenen Apps.",
      en: "AI is a fixed part of my daily work: from coding with agents to AI features in my own apps.",
    },
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
        name: { de: "Agentisches Coding", en: "Agentic coding" },
        text: {
          de: "Features mit Claude Code planen, umsetzen und prüfen. Ich steuere, der Agent erledigt die Fleißarbeit.",
          en: "Planning, building and reviewing features with Claude Code. I steer, the agent does the legwork.",
        },
      },
      {
        name: { de: "Prompt & Context Engineering", en: "Prompt & context engineering" },
        text: {
          de: "Aufgaben so zuschneiden und mit Kontext versorgen, dass Ergebnisse verlässlich und nachvollziehbar sind.",
          en: "Cutting tasks to size and providing context so that results are reliable and traceable.",
        },
      },
      {
        name: { de: "MCP & Tool Use", en: "MCP & tool use" },
        text: {
          de: "Modelle über das Model Context Protocol und Function Calling mit Werkzeugen und Daten verbinden.",
          en: "Connecting models to tools and data via the Model Context Protocol and function calling.",
        },
      },
      {
        name: { de: "LLM-APIs in Apps", en: "LLM APIs in apps" },
        text: {
          de: "KI-Funktionen in eigene Produkte einbauen, etwa der Gesprächspartner im Karamasow-Begleiter über die Gemini-API.",
          en: "Building AI features into my own products, e.g. the conversation partner in the Karamasow companion via the Gemini API.",
        },
      },
    ],
  },
  {
    id: "tools",
    title: { de: "Tools", en: "Tools" },
    summary: {
      de: "Werkzeuge für sauberen Code, Zusammenarbeit und Design.",
      en: "Tools for clean code, collaboration and design.",
    },
    icon: Wrench,
    intensity: "low",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Linux", "Windows", "macOS"],
  },
];

// Anzeigename, falls er sich je nach Sprache unterscheidet (Skill-Namen dienen sonst als ID).
const skillLabels: Record<string, L> = {
  "Agentisches Coding": { de: "Agentisches Coding", en: "Agentic coding" },
};

export function skillLabel(skill: string, locale: Locale): string {
  return skillLabels[skill]?.[locale] ?? skill;
}
