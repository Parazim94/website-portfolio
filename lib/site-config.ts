export interface NavLink {
  label: string;
  href: string;
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
} as const;

export const navLinks: NavLink[] = [
  { label: "Start", href: "#hero" },
  { label: "Über mich", href: "#about" },
  { label: "Projekte", href: "#projects" },
  { label: "Ausbildung", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Kontakt", href: "#contact" },
];
