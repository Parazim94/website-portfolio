import type { L } from "@/lib/i18n";

export interface Project {
  slug: string;
  title: L;
  period: string;
  description: L;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "brokechain",
    title: { de: "BrokeChain", en: "BrokeChain" },
    period: "02/2025 – 04/2025",
    description: {
      de: "Plattformübergreifende Mobile-App mit Echtzeit-Marktdaten für über 100 Kryptowährungen. Sichere Anmeldung über Google OAuth 2.0 und verschlüsselte Speicherung sensibler Nutzerdaten.",
      en: "Cross-platform mobile app with real-time market data for over 100 cryptocurrencies. Secure sign-in via Google OAuth 2.0 and encrypted storage of sensitive user data.",
    },
    tags: ["React Native", "Expo", "Node.js", "Express", "WebSockets", "OAuth 2.0"],
    githubUrl: "https://github.com/Parazim94/BrokeChain",
  },
  {
    slug: "dataglobe",
    title: { de: "DataGlobe", en: "DataGlobe" },
    period: "11/2024 – 12/2024",
    description: {
      de: "Interaktive 3D-Webanwendung zur benutzerfreundlichen Darstellung komplexer Datenvisualisierungen.",
      en: "Interactive 3D web application for presenting complex data visualizations in a user-friendly way.",
    },
    tags: ["React", "Three.js", "HTML", "CSS", "Tailwind"],
    liveUrl: "https://dataglobe.netlify.app/",
    githubUrl: "https://github.com/k0miker/project-dataglobe",
  },
  {
    slug: "roeder-web-alchemy",
    title: { de: "RoederWebAlchemy", en: "RoederWebAlchemy" },
    period: "07/2024",
    description: {
      de: "Interaktives Portfolio mit einem Space-Invaders-inspirierten Spiel, das Besucher spielerisch durch meine Arbeiten und Fähigkeiten führt – voll responsiv für jede Bildschirmgröße.",
      en: "Interactive portfolio with a Space Invaders-inspired game that playfully guides visitors through my work and skills – fully responsive for every screen size.",
    },
    tags: ["HTML", "CSS", "JavaScript", "Canvas"],
    liveUrl: "https://roederwebalchemy.netlify.app/",
    githubUrl: "https://github.com/Parazim94/RoederWebAlchemy",
  },
  {
    slug: "pokemon-spiel",
    title: { de: "Pokémon-Spiel", en: "Pokémon Game" },
    period: "08/2024",
    description: {
      de: "Pokémon-inspiriertes Spiel mit Canvas-Element für Grafik, inklusive Bewegungssteuerung und Kollisionsabfrage.",
      en: "Pokémon-inspired game using a canvas element for graphics, including movement controls and collision detection.",
    },
    tags: ["HTML", "CSS", "JavaScript", "Canvas"],
    liveUrl: "https://pokemon-three-rust.vercel.app/",
    githubUrl: "https://github.com/Parazim94/Pokemon",
  },
  {
    slug: "passwort-generator",
    title: { de: "Passwort-Generator", en: "Password Generator" },
    period: "09/2023 – 12/2023",
    description: {
      de: "Benutzerfreundlicher Passwort-Generator für sichere, anpassbare Passwörter. Umgesetzt für die Aspeo GmbH.",
      en: "User-friendly password generator for secure, customizable passwords. Built for Aspeo GmbH.",
    },
    tags: ["HTML", "JavaScript", "Bootstrap"],
    liveUrl: "https://parazim94.github.io/ASPEO-Passwort-Generator/",
    githubUrl: "https://github.com/Parazim94/ASPEO-Passwort-Generator",
  },
];
