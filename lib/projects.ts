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
    slug: "brokechain",
    title: "BrokeChain",
    period: "02/2025 – 04/2025",
    description:
      "Plattformübergreifende Mobile-App mit Echtzeit-Marktdaten für über 100 Kryptowährungen. Sichere Anmeldung über Google OAuth 2.0 und verschlüsselte Speicherung sensibler Nutzerdaten.",
    tags: ["React Native", "Expo", "Node.js", "Express", "WebSockets", "OAuth 2.0"],
    githubUrl: "https://github.com/Parazim94/BrokeChain",
  },
  {
    slug: "dataglobe",
    title: "DataGlobe",
    period: "11/2024 – 12/2024",
    description:
      "Interaktive 3D-Webanwendung zur benutzerfreundlichen Darstellung komplexer Datenvisualisierungen.",
    tags: ["React", "Three.js", "HTML", "CSS", "Tailwind"],
    liveUrl: "https://dataglobe.netlify.app/",
    githubUrl: "https://github.com/k0miker/project-dataglobe",
  },
  {
    slug: "roeder-web-alchemy",
    title: "RoederWebAlchemy",
    period: "07/2024",
    description:
      "Interaktives Portfolio mit einem Space-Invaders-inspirierten Spiel, das Besucher spielerisch durch meine Arbeiten und Fähigkeiten führt – voll responsiv für jede Bildschirmgröße.",
    tags: ["HTML", "CSS", "JavaScript", "Canvas"],
    liveUrl: "https://roederwebalchemy.netlify.app/",
    githubUrl: "https://github.com/Parazim94/RoederWebAlchemy",
  },
  {
    slug: "pokemon-spiel",
    title: "Pokémon-Spiel",
    period: "08/2024",
    description:
      "Pokémon-inspiriertes Spiel mit Canvas-Element für Grafik, inklusive Bewegungssteuerung und Kollisionsabfrage.",
    tags: ["HTML", "CSS", "JavaScript", "Canvas"],
    liveUrl: "https://pokemon-three-rust.vercel.app/",
    githubUrl: "https://github.com/Parazim94/Pokemon",
  },
  {
    slug: "passwort-generator",
    title: "Passwort-Generator",
    period: "09/2023 – 12/2023",
    description:
      "Benutzerfreundlicher Passwort-Generator für sichere, anpassbare Passwörter. Umgesetzt für die Aspeo GmbH.",
    tags: ["HTML", "JavaScript", "Bootstrap"],
    liveUrl: "https://parazim94.github.io/ASPEO-Passwort-Generator/",
    githubUrl: "https://github.com/Parazim94/ASPEO-Passwort-Generator",
  },
];
