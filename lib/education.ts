import type { L } from "@/lib/i18n";

export interface FocusArea {
  label: L;
  // Skill-Name aus lib/skills.ts, zu dem der Chip springt
  skill?: string;
}

export interface Education {
  slug: string;
  title: L;
  institute: string;
  location: string;
  period: string;
  detail?: L;
  focusAreas?: FocusArea[];
  finalProject?: L;
  languageLevel?: L;
  certificateUrl?: string;
  certificatePreview?: string;
}

const same = (text: string): L => ({ de: text, en: text });

export const education: Education[] = [
  {
    slug: "dci",
    title: {
      de: "Zertifizierte Weiterbildung in Webentwicklung",
      en: "Certified further training in web development",
    },
    institute: "Digital Career Institute (DCI)",
    location: "Berlin",
    period: "04/2024 – 06/2025",
    detail: { de: "1.800 Unterrichtseinheiten", en: "1,800 teaching units" },
    focusAreas: [
      { label: same("HTML/CSS"), skill: "HTML" },
      { label: same("JavaScript"), skill: "JavaScript (ES6)" },
      { label: same("React"), skill: "React" },
      { label: same("Node.js/Express"), skill: "Node.js" },
      { label: same("MongoDB"), skill: "MongoDB" },
      { label: same("REST APIs"), skill: "REST-API" },
      { label: { de: "Authentifizierung", en: "Authentication" } },
    ],
    finalProject: {
      de: "Broke Chain (Gruppenarbeit)",
      en: "Broke Chain (group project)",
    },
    languageLevel: { de: "Englisch C2", en: "English C2" },
    certificateUrl: "/certificates/dci-zertifikat.pdf",
    certificatePreview: "/certificates/previews/dci.jpg",
  },
  {
    slug: "ironhack",
    title: same("Web Development Course"),
    institute: "Ironhack School",
    location: "Berlin",
    period: "03/2023 – 06/2023",
    detail: {
      de: "Intensiver Full-Stack JavaScript Web Development Kurs (inkl. Pre-Work und Career Development).",
      en: "Intensive full-stack JavaScript web development course (incl. pre-work and career development).",
    },
    focusAreas: [
      { label: same("HTML5"), skill: "HTML" },
      { label: same("CSS3"), skill: "CSS" },
      { label: same("ReactJS"), skill: "React" },
      { label: same("ExpressJS"), skill: "Express.js" },
      { label: same("MongoDB"), skill: "MongoDB" },
    ],
    certificateUrl: "/certificates/ironhack-zertifikat.pdf",
    certificatePreview: "/certificates/previews/ironhack.jpg",
  },
];
