export interface Project {
  slug: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "dataglobe",
    title: "DataGlobe",
    period: "11/2024 – 12/2024",
    description:
      "Interaktive 3D-Webanwendung zur benutzerfreundlichen Darstellung komplexer Datenvisualisierungen.",
    tags: ["React", "Three.js", "HTML", "CSS", "Tailwind"],
    liveUrl: "https://dataglobe.vercel.app",
    githubUrl: "https://github.com/Parazim94/dataglobe",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    period: "11/2024 – 12/2024",
    description:
      "Diese Seite: persönliche Portfolio-Website zur professionellen Präsentation eigener Projekte und Fähigkeiten.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Parazim94/website-portfolio",
  },
  {
    slug: "pokemon-spiel",
    title: "Pokémon-Spiel",
    period: "08/2024",
    description:
      "Pokémon-inspiriertes Spiel mit Canvas-Element für Grafik, inklusive Bewegungssteuerung und Kollisionsabfrage.",
    tags: ["HTML", "CSS", "JavaScript", "Canvas"],
    liveUrl: "https://pokemon-spiel.vercel.app",
    githubUrl: "https://github.com/Parazim94/pokemon-spiel",
  },
  {
    slug: "passwort-generator",
    title: "Passwort-Generator",
    period: "09/2023 – 12/2023",
    description:
      "Benutzerfreundlicher Passwort-Generator für sichere, anpassbare Passwörter. Umgesetzt für die Aspeo GmbH.",
    tags: ["HTML", "JavaScript", "Bootstrap"],
    liveUrl: "https://passwort-generator.vercel.app",
    githubUrl: "https://github.com/Parazim94/passwort-generator",
  },
];
