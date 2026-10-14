import type { L } from "@/lib/i18n";

export interface NavLink {
  label: L;
  href: string;
}

export const siteConfig = {
  name: "Denis Röder",
  role: { de: "Full-Stack Webentwickler", en: "Full-Stack Web Developer" },
  location: { de: "Berlin, Deutschland", en: "Berlin, Germany" },
  tagline: {
    de: "Full-Stack Entwickler mit Support-Hintergrund. Ich baue Produkte, die man gern benutzt.",
    en: "Full-stack developer with a support background. I build products people enjoy using.",
  },
  email: "d-roeder@hotmail.de",
  contactFromAddress: "kontakt@denis-roeder.com",
  github: "https://github.com/Parazim94",
  linkedin: "https://www.linkedin.com/in/denis-r-247797279",
} satisfies {
  name: string;
  role: L;
  location: L;
  tagline: L;
  email: string;
  contactFromAddress: string;
  github: string;
  linkedin: string;
};

export const navLinks: NavLink[] = [
  { label: { de: "Start", en: "Home" }, href: "#hero" },
  { label: { de: "Über mich", en: "About" }, href: "#about" },
  { label: { de: "Projekte", en: "Projects" }, href: "#projects" },
  { label: { de: "Ausbildung", en: "Education" }, href: "#education" },
  { label: { de: "Skills", en: "Skills" }, href: "#skills" },
  { label: { de: "Kontakt", en: "Contact" }, href: "#contact" },
];
