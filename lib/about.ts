import {
  BookOpen,
  Brain,
  Code2,
  Eye,
  Footprints,
  Gamepad2,
  GraduationCap,
  Briefcase,
  Headset,
  MapPin,
  Rocket,
  Search,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export interface HeadlineWord {
  text: string;
  highlight?: boolean;
}

export interface AboutFact {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export interface AboutStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface AboutPrinciple {
  title: string;
  text: string;
  icon: LucideIcon;
}

export interface JourneyStep {
  period: string;
  title: string;
  place: string;
  text: string;
  highlights: string[];
  icon: LucideIcon;
}

export interface AboutInterest {
  label: string;
  hint: string;
  icon: LucideIcon;
}

export const aboutHeadline: HeadlineWord[] = [
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
];

export const aboutParagraph =
  "Ich bin Full-Stack-Webentwickler in Berlin. Bevor ich Entwickler wurde, habe ich drei Jahre als IT-Anwendungsbetreuer und im Computer-Support gearbeitet. Deshalb denke ich beim Bauen immer an die Menschen, die es später benutzen. Ich verbinde technisches Know-how mit kreativem Denken und löse Probleme praxisnah. Dabei arbeite ich viel mit KI-Agents, um schneller und sauberer zu liefern.";

export const aboutStats: AboutStat[] = [
  { value: 2, suffix: "+", label: "Jahre Webentwicklung" },
  { value: 3, label: "Jahre IT-Support" },
  { value: 1800, label: "Unterrichtseinheiten Weiterbildung" },
];

export const aboutFacts: AboutFact[] = [
  {
    label: "Rolle",
    value: "Full-Stack Webentwickler",
    href: "#projects",
    icon: UserRound,
  },
  {
    label: "Erfahrung",
    value: "2+ Jahre (+3 Jahre IT-Support)",
    href: "#education",
    icon: GraduationCap,
  },
  {
    label: "Standort",
    value: "Berlin, Deutschland",
    href: "#contact",
    icon: MapPin,
  },
  {
    label: "Fokus",
    value: "React, Next.js, TypeScript",
    href: "#skills",
    icon: Code2,
  },
];

export const aboutPrinciples: AboutPrinciple[] = [
  {
    title: "Erst verstehen, dann bauen",
    text: "Aus dem Support weiß ich: Gute Software beginnt mit der Frage, was Nutzer wirklich brauchen.",
    icon: Search,
  },
  {
    title: "Mit KI, aber mit Kontrolle",
    text: "Agents nehmen mir Fleißarbeit ab. Architektur, Review und Verantwortung bleiben bei mir.",
    icon: Brain,
  },
  {
    title: "Auf Details achten",
    text: "Ladezeiten, Barrierefreiheit und kleine Animationen entscheiden, ob sich etwas hochwertig anfühlt.",
    icon: Eye,
  },
];

export const journey: JourneyStep[] = [
  {
    period: "3 Jahre",
    title: "IT-Support",
    place: "Anwendungsbetreuer & Computer-Support",
    text: "Täglich mit echten Problemen von Anwendern gearbeitet. Daher kommt mein Blick für die Nutzerseite.",
    highlights: ["Anwenderbetreuung", "Fehleranalyse"],
    icon: Headset,
  },
  {
    period: "03/2023 – 06/2023",
    title: "Einstieg in die Entwicklung",
    place: "Ironhack, Berlin",
    text: "Intensiver Full-Stack-Kurs: Der Wechsel vom Support in die Webentwicklung.",
    highlights: ["React", "Express", "MongoDB"],
    icon: Rocket,
  },
  {
    period: "04/2024 – 06/2025",
    title: "Weiterbildung",
    place: "Digital Career Institute, Berlin",
    text: "Zertifizierte Weiterbildung, Praktikum bei ESS Energy & Sales Services und Abschlussprojekt Broke Chain im Team.",
    highlights: ["1.800 UE", "Praktikum", "Broke Chain"],
    icon: GraduationCap,
  },
  {
    period: "2025 – 2026",
    title: "Full-Stack Entwickler",
    place: "Plan B Net Zero",
    text: "Produktive Apps für Kunden und Vertrieb im Energiebereich, vom Datenbank-Schema bis zur Oberfläche.",
    highlights: ["Neo App", "Sales App", "Tarifrechner"],
    icon: Briefcase,
  },
];

export const interests: AboutInterest[] = [
  { label: "Laufen", hint: "Run Analytics", icon: Footprints },
  { label: "Lesen", hint: "Karamasow-Begleiter", icon: BookOpen },
  { label: "Spiele", hint: "Abgrund", icon: Gamepad2 },
];

export const availability = "Offen für Angebote";
