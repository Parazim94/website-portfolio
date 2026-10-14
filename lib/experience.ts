import type { L } from "@/lib/i18n";

export interface WorkExperience {
  company: string;
  role: L;
  period: string;
}

export interface WorkProject {
  slug: string;
  title: L;
  description: L;
  tags: string[];
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  note?: L;
  imageFit?: "cover" | "contain" | "top";
}

export const workExperience: WorkExperience = {
  company: "Plan B Net Zero",
  role: { de: "Full-Stack Webentwickler", en: "Full-Stack Web Developer" },
  period: "2025 – 2026",
};

export const workProjects: WorkProject[] = [
  {
    slug: "gamification",
    title: { de: "Gamification", en: "Gamification" },
    description: {
      de: "Gamification-App mit Leveln, Fortschrittsbalken, Quests, Badges und Item Shop. Wer Lerninhalte abschließt, sammelt Energie, Diamanten und Tages-Streaks.",
      en: "Gamification app with levels, progress bars, quests, badges and an item shop. Completing learning content earns energy, diamonds and daily streaks.",
    },
    tags: ["React", "TypeScript", "Python"],
    imageFit: "contain",
    images: [
      "/images/projects/gamification/IMG_3706.PNG",
    ],
  },
  {
    slug: "plan-b-neo-app",
    title: { de: "Plan B Neo App", en: "Plan B Neo App" },
    description: {
      de: "Kunden-App mit Wallet, Ein- und Auszahlung und Power Units für Stromguthaben. Dazu ein Tagespreis-Chart in 15-Minuten-Schritten, Tarifrechner und Freunde-werben-Prämien.",
      en: "Customer app with wallet, deposits and withdrawals, and Power Units for energy credit. Plus a daily price chart in 15-minute steps, a tariff calculator and refer-a-friend rewards.",
    },
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    imageFit: "contain",
    images: [
      "/images/projects/plan-b-neo/IMG_3949.PNG",
      "/images/projects/plan-b-neo/IMG_3950.PNG",
    ],
  },
  {
    slug: "plan-b-sales-app",
    title: { de: "Plan B Sales App", en: "Plan B Sales App" },
    description: {
      de: "App für Vertriebspartner mit Umsatz-, Team- und Bestellübersicht sowie Karrierestufe. Kundenliste mit Suche, Vertragsdetails und Kontaktaktionen.",
      en: "App for sales partners with an overview of revenue, team and orders as well as career level. Customer list with search, contract details and contact actions.",
    },
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    imageFit: "contain",
    images: [
      "/images/projects/pbnz-sales/IMG_3931.PNG",
      "/images/projects/pbnz-sales/IMG_3961.PNG",
    ],
  },
  {
    slug: "tarifrechner",
    title: { de: "Tarifrechner", en: "Tariff Calculator" },
    description: {
      de: "Interner Strompreis-Tarifrechner mit Reglern für Grund-, Arbeits- und Einkaufspreis. Berechnet Gesamtpreis, Marge und Neukundenbonus und zeigt die eigene Position im Marktvergleich.",
      en: "Internal electricity tariff calculator with sliders for base, unit and purchase price. Calculates total price, margin and new customer bonus and shows its own position in the market comparison.",
    },
    tags: ["React", "TypeScript", "Python"],
    imageFit: "contain",
    images: [
      "/images/projects/tarifrechner/02.jpg",
      "/images/projects/tarifrechner/01.jpg",
    ],
  },
];

export const personalProjectsGroup = {
  title: { de: "Eigene Projekte", en: "Personal projects" } satisfies L,
  subtitle: {
    de: "Selbstständig konzipiert und umgesetzt",
    en: "Designed and built independently",
  } satisfies L,
};

export const personalProjects: WorkProject[] = [
  {
    slug: "hollow-unit",
    title: { de: "Hollow Unit", en: "Hollow Unit" },
    description: {
      de: "Atmosphärisches 3D-Action-Spiel im Browser mit Schwertkämpfen, drei Gegnertypen, Mini-Boss und Hacking-Minispiel. Alles ist im Code erzeugt: Modelle, Texturen, Shader und Musik, ganz ohne Assets.",
      en: "Atmospheric 3D action game in the browser with sword combat, three enemy types, a mini-boss and a hacking mini-game. Everything is generated in code: models, textures, shaders and music, with no assets at all.",
    },
    tags: ["three.js", "TypeScript", "Vite", "GLSL", "Web Audio API"],
    liveUrl: "https://hollow-unit.vercel.app",
    githubUrl: "https://github.com/Parazim94/hollow-unit",
    images: [
      "menu",
      "combat",
      "walkers",
      "boss",
      "hacking",
      "dialogue",
      "gameover",
    ].map((name) => `/images/projects/hollow-unit/${name}.jpg`),
  },
  {
    slug: "abgrund",
    title: { de: "Abgrund", en: "Abgrund" },
    description: {
      de: "Dungeon-Crawler im Browser mit zufällig generierten Ebenen, Bosskampf, Beute in vier Seltenheitsstufen und automatischem Speicherstand. Die Musik wird live im Code erzeugt, ohne Audiodateien.",
      en: "Dungeon crawler in the browser with randomly generated levels, a boss fight, loot in four rarity tiers and automatic saving. The music is generated live in code, without audio files.",
    },
    tags: ["Phaser 4", "TypeScript", "Vite", "Web Audio API"],
    liveUrl: "https://abgrund-bay.vercel.app",
    githubUrl: "https://github.com/Parazim94/Diablo",
    images: ["gameplay", "boss", "inventory", "menu", "mobile"].map(
      (name) => `/images/projects/abgrund/${name}.png`,
    ),
  },
  {
    slug: "karamasow-begleiter",
    title: { de: "Karamasow-Begleiter", en: "Karamasow-Begleiter" },
    description: {
      de: "Spoilerfreier Lesebegleiter für „Die Brüder Karamasow“ als PWA. Inhalte schalten sich erst mit dem Lesestand frei, dazu Figuren, Beziehungskarte, Notizen und ein KI-Gesprächspartner über die Gemini-API.",
      en: "Spoiler-free reading companion for \"The Brothers Karamazov\" as a PWA. Content unlocks as you progress through the book, plus characters, a relationship map, notes and an AI conversation partner via the Gemini API.",
    },
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
    title: { de: "Run Analytics", en: "Run Analytics" },
    description: {
      de: "Lokales Dashboard für Lauf- und Fitnessdaten mit Karte, Kilometer-Splits, Trainingsbelastung und Schlafauswertung. Statistik mit Bootstrap-Intervallen, die ausweist, wie belastbar die Zahlen sind.",
      en: "Local dashboard for running and fitness data with a map, kilometer splits, training load and sleep analysis. Statistics with bootstrap intervals that show how reliable the numbers are.",
    },
    tags: ["Next.js 16", "React 19", "TypeScript", "SQLite", "Python", "Recharts", "Leaflet"],
    note: { de: "Läuft lokal – Demo auf Anfrage", en: "Runs locally – demo on request" },
    imageFit: "top",
    images: [
      "01-dashboard",
      "03-lauf-detail",
      "04-laufanalyse",
      "05-strecken",
      "06-vergleich",
      "07-belastung",
      "08-schlaf",
      "09-gesundheit",
      "02-aktivitaeten",
    ].map((name) => `/images/projects/run-analytics/${name}.png`),
  },
];
