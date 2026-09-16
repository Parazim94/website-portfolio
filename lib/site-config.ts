export interface NavLink {
  label: string;
  href: string;
}

export interface AboutFact {
  label: string;
  value: string;
}

export const siteConfig = {
  name: "Dein Name",
  role: "Frontend-Entwickler:in",
  location: "Berlin, Deutschland",
  tagline: "Frontend-Entwickler:in, die Ideen in schnelle, saubere Interfaces verwandelt.",
  email: "hallo@example.com",
  contactFromAddress: "kontakt@denis-roeder.com",
  github: "https://github.com/your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
  about: {
    paragraphs: [
      "Ich baue seit mehreren Jahren Web-Interfaces, die schnell laden, sich gut anfühlen und auf jedem Gerät funktionieren. Mein Fokus liegt auf React-basierten Stacks – von der ersten Komponente bis zum produktionsreifen Deployment.",
      "Neben sauberem Code interessiere ich mich für Design-Systeme, Barrierefreiheit und die Frage, wie man Teams dabei hilft, konsistent und schnell zu bauen.",
    ],
    facts: [
      { label: "Rolle", value: "Frontend-Entwickler:in" },
      { label: "Erfahrung", value: "5+ Jahre" },
      { label: "Standort", value: "Berlin (remote)" },
      { label: "Fokus", value: "React & TypeScript" },
    ] satisfies AboutFact[],
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "Start", href: "#hero" },
  { label: "Über mich", href: "#about" },
  { label: "Projekte", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Kontakt", href: "#contact" },
];
