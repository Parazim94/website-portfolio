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
  imageFit?: "cover" | "contain" | "top";
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
    description:
      "Gamification-App mit Leveln, Fortschrittsbalken, Quests, Badges und Item Shop. Wer Lerninhalte abschließt, sammelt Energie, Diamanten und Tages-Streaks.",
    tags: ["React", "TypeScript", "Python"],
    imageFit: "contain",
    images: [
      "/images/projects/gamification/IMG_3706.PNG",
    ],
  },
  {
    slug: "ki-scanner",
    title: "KI Scanner",
    description:
      "KI-gestützter Scanner, der Dokumente wie Stromrechnungen automatisch auswertet und die relevanten Daten ausliest.",
    tags: ["React", "TypeScript", "Python"],
  },
  {
    slug: "plan-b-neo-app",
    title: "Plan B Neo App",
    description:
      "Kunden-App mit Wallet, Ein- und Auszahlung und Power Units für Stromguthaben. Dazu ein Tagespreis-Chart in 15-Minuten-Schritten, Tarifrechner und Freunde-werben-Prämien.",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    imageFit: "contain",
    images: [
      "/images/projects/plan-b-neo/IMG_3949.PNG",
      "/images/projects/plan-b-neo/IMG_3950.PNG",
    ],
  },
  {
    slug: "plan-b-sales-app",
    title: "Plan B Sales App",
    description:
      "App für Vertriebspartner mit Umsatz-, Team- und Bestellübersicht sowie Karrierestufe. Kundenliste mit Suche, Vertragsdetails und Kontaktaktionen.",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    imageFit: "contain",
    images: [
      "/images/projects/pbnz-sales/IMG_3931.PNG",
      "/images/projects/pbnz-sales/IMG_3961.PNG",
    ],
  },
  {
    slug: "tarifrechner",
    title: "Tarifrechner",
    description:
      "Interner Strompreis-Tarifrechner mit Reglern für Grund-, Arbeits- und Einkaufspreis. Berechnet Gesamtpreis, Marge und Neukundenbonus und zeigt die eigene Position im Marktvergleich.",
    tags: ["React", "TypeScript", "Python"],
    imageFit: "contain",
    images: [
      "/images/projects/tarifrechner/02.jpg",
      "/images/projects/tarifrechner/01.jpg",
    ],
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
