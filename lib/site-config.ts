export interface NavLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Dein Name",
  tagline: "Frontend-Entwickler:in, die Ideen in schnelle, saubere Interfaces verwandelt.",
  email: "hallo@example.com",
  github: "https://github.com/your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
} as const;

export const navLinks: NavLink[] = [
  { label: "Start", href: "#hero" },
  { label: "Über mich", href: "#about" },
  { label: "Projekte", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Kontakt", href: "#contact" },
];
