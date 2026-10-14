import {
  BookOpen,
  Brain,
  Briefcase,
  Code2,
  Eye,
  Footprints,
  Gamepad2,
  GraduationCap,
  Headset,
  MapPin,
  Rocket,
  Search,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import type { L, Locale } from "@/lib/i18n";

export interface HeadlineWord {
  text: string;
  highlight?: boolean;
}

export interface AboutFact {
  label: L;
  value: L;
  href: string;
  icon: LucideIcon;
}

export interface AboutStat {
  value: number;
  suffix?: string;
  label: L;
}

export interface AboutPrinciple {
  title: L;
  text: L;
  icon: LucideIcon;
}

export interface JourneyStep {
  period: L;
  title: L;
  place: L;
  text: L;
  highlights: L[];
  icon: LucideIcon;
}

export interface AboutInterest {
  label: L;
  hint: string;
  icon: LucideIcon;
}

const same = (text: string): L => ({ de: text, en: text });

export const aboutHeadline: Record<Locale, HeadlineWord[]> = {
  de: [
    { text: "Ich" },
    { text: "baue" },
    { text: "Web-" },
    { text: "und" },
    { text: "Mobile-Apps," },
    { text: "die" },
    { text: "funktionieren", highlight: true },
    { text: "und" },
    { text: "sich" },
    { text: "gut", highlight: true },
    { text: "anfühlen.", highlight: true },
  ],
  en: [
    { text: "I" },
    { text: "build" },
    { text: "web" },
    { text: "and" },
    { text: "mobile" },
    { text: "apps" },
    { text: "that" },
    { text: "work", highlight: true },
    { text: "and" },
    { text: "feel", highlight: true },
    { text: "good.", highlight: true },
  ],
};

export const aboutParagraph: L = {
  de: "Full-Stack Webentwickler mit über 2 Jahren Erfahrung in Programmierung und Webentwicklung, plus einem 3-jährigen Hintergrund als IT-Anwendungsbetreuer und Computer-Support-Spezialist. Deshalb denke ich beim Bauen immer an die Menschen, die es später benutzen. Ich verbinde technisches Know-how mit kreativem Denken und löse Probleme praxisnah. Dabei arbeite ich viel mit KI-Agents, um schneller und sauberer zu liefern.",
  en: "Full-stack web developer with over 2 years of experience in programming and web development, plus a 3-year background as an IT application support specialist and computer support specialist. That's why I always think about the people who will use what I build. I combine technical know-how with creative thinking and solve problems in a practical way. I work a lot with AI agents to deliver faster and cleaner.",
};

export const aboutStats: AboutStat[] = [
  {
    value: 2,
    suffix: "+",
    label: { de: "Jahre Webentwicklung", en: "Years of web development" },
  },
  { value: 3, label: { de: "Jahre IT-Support", en: "Years of IT support" } },
  {
    value: 1800,
    label: {
      de: "Unterrichts­einheiten Weiterbildung",
      en: "Teaching units of further training",
    },
  },
];

export const aboutFacts: AboutFact[] = [
  {
    label: { de: "Rolle", en: "Role" },
    value: { de: "Full-Stack Webentwickler", en: "Full-Stack Web Developer" },
    href: "#projects",
    icon: UserRound,
  },
  {
    label: { de: "Erfahrung", en: "Experience" },
    value: {
      de: "2+ Jahre (+3 Jahre IT-Support)",
      en: "2+ years (+3 years IT support)",
    },
    href: "#education",
    icon: GraduationCap,
  },
  {
    label: { de: "Standort", en: "Location" },
    value: { de: "Berlin, Deutschland", en: "Berlin, Germany" },
    href: "#contact",
    icon: MapPin,
  },
  {
    label: { de: "Fokus", en: "Focus" },
    value: same("React, Next.js, TypeScript"),
    href: "#skills",
    icon: Code2,
  },
];

export const aboutPrinciples: AboutPrinciple[] = [
  {
    title: { de: "Erst verstehen, dann bauen", en: "Understand first, then build" },
    text: {
      de: "Aus dem Support weiß ich: Gute Software beginnt mit der Frage, was Nutzer wirklich brauchen.",
      en: "From support I know: good software starts with the question of what users really need.",
    },
    icon: Search,
  },
  {
    title: { de: "Mit KI, aber mit Kontrolle", en: "With AI, but in control" },
    text: {
      de: "Agents nehmen mir Fleißarbeit ab. Architektur, Review und Verantwortung bleiben bei mir.",
      en: "Agents take the grunt work off my plate. Architecture, review and responsibility stay with me.",
    },
    icon: Brain,
  },
  {
    title: { de: "Auf Details achten", en: "Sweat the details" },
    text: {
      de: "Ladezeiten, Barrierefreiheit und kleine Animationen entscheiden, ob sich etwas hochwertig anfühlt.",
      en: "Load times, accessibility and small animations decide whether something feels high quality.",
    },
    icon: Eye,
  },
];

export const journey: JourneyStep[] = [
  {
    period: { de: "3 Jahre", en: "3 years" },
    title: { de: "IT-Support", en: "IT support" },
    place: {
      de: "Anwendungsbetreuer & Computer-Support",
      en: "Application support & computer support",
    },
    text: {
      de: "Täglich mit echten Problemen von Anwendern gearbeitet. Daher kommt mein Blick für die Nutzerseite.",
      en: "Worked every day on real problems of users. That's where my eye for the user side comes from.",
    },
    highlights: [
      { de: "Anwenderbetreuung", en: "User support" },
      { de: "Fehleranalyse", en: "Troubleshooting" },
    ],
    icon: Headset,
  },
  {
    period: same("03/2023 – 06/2023"),
    title: { de: "Einstieg in die Entwicklung", en: "Getting into development" },
    place: same("Ironhack, Berlin"),
    text: {
      de: "Intensiver Full-Stack-Kurs: Der Wechsel vom Support in die Webentwicklung.",
      en: "Intensive full-stack course: the switch from support to web development.",
    },
    highlights: [same("React"), same("Express"), same("MongoDB")],
    icon: Rocket,
  },
  {
    period: same("04/2024 – 06/2025"),
    title: { de: "Weiterbildung", en: "Further training" },
    place: same("Digital Career Institute, Berlin"),
    text: {
      de: "Zertifizierte Weiterbildung, Praktikum bei ESS Energy & Sales Services und Abschlussprojekt Broke Chain im Team.",
      en: "Certified further training, internship at ESS Energy & Sales Services and the final project Broke Chain in a team.",
    },
    highlights: [
      { de: "1.800 UE", en: "1,800 units" },
      { de: "Praktikum", en: "Internship" },
      same("Broke Chain"),
    ],
    icon: GraduationCap,
  },
  {
    period: same("2025 – 2026"),
    title: { de: "Full-Stack Entwickler", en: "Full-stack developer" },
    place: same("Plan B Net Zero"),
    text: {
      de: "Produktive Apps für Kunden und Vertrieb im Energiebereich, vom Datenbank-Schema bis zur Oberfläche.",
      en: "Production apps for customers and sales in the energy sector, from database schema to interface.",
    },
    highlights: [
      same("Neo App"),
      same("Sales App"),
      { de: "Tarifrechner", en: "Tariff calculator" },
    ],
    icon: Briefcase,
  },
];

export const interests: AboutInterest[] = [
  { label: { de: "Laufen", en: "Running" }, hint: "Run Analytics", icon: Footprints },
  { label: { de: "Lesen", en: "Reading" }, hint: "Karamasow-Begleiter", icon: BookOpen },
  { label: { de: "Spiele", en: "Games" }, hint: "Abgrund", icon: Gamepad2 },
];

export const availability: L = {
  de: "Offen für Angebote",
  en: "Open to offers",
};
