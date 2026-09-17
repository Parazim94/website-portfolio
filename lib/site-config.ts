export interface NavLink {
  label: string;
  href: string;
}

export interface AboutFact {
  label: string;
  value: string;
}

export const siteConfig = {
  name: "Denis Röder",
  role: "Full-Stack Webentwickler",
  location: "Berlin, Deutschland",
  tagline:
    "Ich entwickle moderne, skalierbare Weblösungen, die technisch und visuell überzeugen.",
  email: "d-roeder@hotmail.de",
  contactFromAddress: "kontakt@denis-roeder.com",
  github: "https://github.com/Parazim94",
  linkedin: "https://www.linkedin.com/in/denis-r-247797279",
  about: {
    paragraphs: [
      "Full-Stack Webentwickler mit über 2 Jahren Erfahrung in Programmierung und Webentwicklung, plus einem 3-jährigen Hintergrund als IT-Anwendungsbetreuer und Computer-Support-Spezialist.",
      "Ich kombiniere technisches Know-how mit kreativem Denken und praxisorientierter Problemlösungsfähigkeit, um innovative Weblösungen zu entwickeln.",
    ],
    facts: [
      { label: "Rolle", value: "Full-Stack Webentwickler" },
      { label: "Erfahrung", value: "2+ Jahre (+3 Jahre IT-Support)" },
      { label: "Standort", value: "Berlin, Deutschland" },
      { label: "Fokus", value: "React, Next.js, TypeScript" },
    ] satisfies AboutFact[],
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "Start", href: "#hero" },
  { label: "Über mich", href: "#about" },
  { label: "Ausbildung", href: "#education" },
  { label: "Berufserfahrung", href: "#experience" },
  { label: "Projekte", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Kontakt", href: "#contact" },
];
