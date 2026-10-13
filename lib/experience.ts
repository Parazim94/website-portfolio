export interface WorkExperience {
  company: string;
  role: string;
  period: string;
}

export interface WorkProject {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  note?: string;
  imageFit?: "cover" | "contain";
}

export const workExperience: WorkExperience = {
  company: "Plan B Net Zero",
  role: "Full-Stack Webentwickler",
  period: "2025 – 2026",
};

export const workProjects: WorkProject[] = [
  {
    slug: "gamification",
    title: "Gamification",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "ki-scanner",
    title: "KI Scanner",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "plan-b-neo-app",
    title: "Plan B Neo App",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "plan-b-sales-app",
    title: "Plan B Sales App",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    slug: "tarifrechner",
    title: "Tarifrechner",
    description: "Kurze Beschreibung des Projekts und der eigenen Rolle darin.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
  },
];

export const personalProjectsGroup = {
  title: "Eigene Projekte",
  subtitle: "Selbstständig konzipiert und umgesetzt",
};

export const personalProjects: WorkProject[] = [
  {
    slug: "abgrund",
    title: "Abgrund",
    description:
      "Dungeon-Crawler im Browser mit zufällig generierten Ebenen, Bosskampf, Beute in vier Seltenheitsstufen und automatischem Speicherstand. Die Musik wird live im Code erzeugt, ohne Audiodateien.",
    tags: ["Phaser 4", "TypeScript", "Vite", "Web Audio API"],
    liveUrl: "https://abgrund-bay.vercel.app",
    githubUrl: "https://github.com/Parazim94/Diablo",
    images: ["gameplay", "boss", "inventory", "menu", "mobile"].map(
      (name) => `/images/projects/abgrund/${name}.png`,
    ),
  },
  {
    slug: "karamasow-begleiter",
    title: "Karamasow-Begleiter",
    description:
      "Spoilerfreier Lesebegleiter für „Die Brüder Karamasow“ als PWA. Inhalte schalten sich erst mit dem Lesestand frei, dazu Figuren, Beziehungskarte, Notizen und ein KI-Gesprächspartner über die Gemini-API.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PWA", "Gemini API"],
    liveUrl: "https://brueder-karamasow.vercel.app",
    githubUrl: "https://github.com/Parazim94/Br-der-Karamasow",
    imageFit: "contain",
    images: [
      "overview",
      "01-heute",
      "02-kapitel",
      "04-figur",
      "05-beziehungen",
      "06-notizen",
      "07-tipps",
      "08-philosophieren",
    ].map((name) => `/images/projects/karamasow-begleiter/${name}.png`),
  },
  {
    slug: "run-analytics",
    title: "Run Analytics",
    description:
      "Lokales Dashboard für Lauf- und Fitnessdaten mit Karte, Kilometer-Splits, Trainingsbelastung und Schlafauswertung. Statistik mit Bootstrap-Intervallen, die ausweist, wie belastbar die Zahlen sind.",
    tags: ["Next.js 16", "React 19", "TypeScript", "SQLite", "Python", "Recharts", "Leaflet"],
    note: "Läuft lokal – Demo auf Anfrage",
  },
];
