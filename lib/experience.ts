import type { L } from "@/lib/i18n";

export interface WorkExperience {
  company: string;
  role: L;
  period: string;
}

export interface ProjectStory {
  problem: L;
  decision: L;
  result: L;
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
  story?: ProjectStory;
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
    images: ["/images/projects/gamification/IMG_3706.PNG"],
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
    story: {
      problem: {
        de: "Ich wollte ein stimmungsvolles 3D-Spiel bauen, das im Browser sofort startet: ohne Download, ohne Ladezeiten und ohne fertige Grafiken oder Sounds.",
        en: "I wanted to build an atmospheric 3D game that starts instantly in the browser: no download, no loading times and no ready-made graphics or sounds.",
      },
      decision: {
        de: "Alles entsteht im Code: Modelle aus Primitiven, Texturen auf Canvas, Himmel und Gras per Shader, Musik und Geräusche über die Web Audio API. Gegner sind Zustandsautomaten mit klarer Vorwarnung, damit Kämpfe fair bleiben.",
        en: "Everything is created in code: models from primitives, textures on canvas, sky and grass via shaders, music and sound effects through the Web Audio API. Enemies are state machines with a clear warning before they attack, which keeps fights fair.",
      },
      result: {
        de: "Ein spielbares Level mit drei Gegnertypen, Mini-Boss, Hacking-Minispiel und Dialogen, das ohne ein einziges Asset auskommt und live auf Vercel läuft.",
        en: "A playable level with three enemy types, a mini-boss, a hacking mini-game and dialogue that needs no assets at all and runs live on Vercel.",
      },
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
    story: {
      problem: {
        de: "Ich wollte einen Dungeon-Crawler im Stil klassischer Action-RPGs bauen, den man ohne Download und Anmeldung sofort spielen kann.",
        en: "I wanted to build a dungeon crawler in the style of classic action RPGs that you can play instantly, without a download or sign-up.",
      },
      decision: {
        de: "Jede Ebene wird bei jedem Besuch zufällig erzeugt, Wegfindung und Gegner-Verhalten laufen im Spiel selbst. Die Musik entsteht live im Code, der Fortschritt wird automatisch im Browser gespeichert, und die Steuerung funktioniert auch per Touch.",
        en: "Every level is randomly generated on each visit, with pathfinding and enemy behavior running inside the game. The music is created live in code, progress is saved automatically in the browser, and the controls also work by touch.",
      },
      result: {
        de: "Fünf Ebenen, vier Gegnertypen, ein Bosskampf und Beute in vier Seltenheitsstufen, dazu eine zweite Runde gegen härtere Gegner. Spielbar am Desktop und auf dem Handy.",
        en: "Five levels, four enemy types, a boss fight and loot in four rarity tiers, plus a second run against tougher enemies. Playable on desktop and on mobile.",
      },
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
      en: 'Spoiler-free reading companion for "The Brothers Karamazov" as a PWA. Content unlocks as you progress through the book, plus characters, a relationship map, notes and an AI conversation partner via the Gemini API.',
    },
    story: {
      problem: {
        de: "Der Roman hat über tausend Seiten, Dutzende Figuren und mehrere Namen pro Person. Wer liest, verliert schnell den Überblick, und Nachschlagen verrät Spoiler.",
        en: "The novel has over a thousand pages, dozens of characters and several names per person. Readers quickly lose track, and looking things up gives away spoilers.",
      },
      decision: {
        de: "Statt Spoiler-Warnungen kennt die App nur den Lesestand: Jeder Inhalt hat einen Freischaltpunkt, alles dahinter existiert nicht. Die KI bekommt nur das freigeschaltete Wissen, der API-Schlüssel bleibt auf dem Server, und Anfragen sind durch Passwort und Limit abgesichert.",
        en: "Instead of spoiler warnings, the app only knows your reading progress: every piece of content has an unlock point, and everything beyond it doesn't exist for you. The AI only receives unlocked knowledge, the API key stays on the server, and requests are protected by a passphrase and a limit.",
      },
      result: {
        de: "Eine installierbare Handy-App mit 96 Kapiteln, Figuren, Beziehungskarte, Notizen, Vorhersage-Tagebuch und KI-Gesprächspartner, die ohne Account auskommt. Die Daten bleiben auf dem Gerät.",
        en: "An installable mobile app with 96 chapters, characters, a relationship map, notes, a prediction journal and an AI conversation partner that needs no account. The data stays on the device.",
      },
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PWA",
      "Gemini API",
    ],
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
    story: {
      problem: {
        de: "Fitness-Apps zeigen hübsche Zahlen, sagen aber nicht, wie verlässlich sie sind.",
        en: "Fitness apps show pretty numbers but don't tell you how reliable they are.",
      },
      decision: {
        de: "Alles läuft lokal: Ein Python-Sync legt die Daten in SQLite ab, die Website liest sie nur. Die Statistik ist selbst geschrieben, mit Bootstrap-Intervallen, Plausibilitätsfiltern für falsche Gerätewerte und Texten, die bei jedem Aufruf aus den Daten berechnet werden.",
        en: "Everything runs locally: a Python sync stores the data in SQLite and the website only reads it. The statistics are written from scratch, with bootstrap intervals, plausibility filters for faulty device values and texts that are computed from the data on every request.",
      },
      result: {
        de: "Ein Dashboard mit Karte, Kilometer-Splits, Trainingsbelastung, Laufanalyse und Schlaf. Die berechneten Splits weichen höchstens 0,4 Sekunden von den Uhrwerten ab, und jede Aussage nennt ihre Belastbarkeit.",
        en: "A dashboard with map, kilometer splits, training load, run analysis and sleep. The calculated splits differ by at most 0.4 seconds from the watch values, and every statement states how reliable it is.",
      },
    },
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "SQLite",
      "Python",
      "Recharts",
      "Leaflet",
    ],
    note: {
      de: "Läuft lokal – Demo auf Anfrage",
      en: "Runs locally – demo on request",
    },
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
