export interface Education {
  slug: string;
  title: string;
  institute: string;
  location: string;
  period: string;
  detail?: string;
  focusAreas?: string[];
  finalProject?: string;
  languageLevel?: string;
  certificateUrl?: string;
}

export const education: Education[] = [
  {
    slug: "dci",
    title: "Zertifizierte Weiterbildung in Webentwicklung",
    institute: "Digital Career Institute (DCI)",
    location: "Berlin",
    period: "04/2024 – 06/2025",
    detail: "1.800 Unterrichtseinheiten",
    focusAreas: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Node.js/Express",
      "MongoDB",
      "REST APIs",
      "Authentifizierung",
    ],
    finalProject: "Broke Chain (Gruppenarbeit)",
    languageLevel: "Englisch C2",
    certificateUrl: "/certificates/dci-zertifikat.pdf",
  },
  {
    slug: "ironhack",
    title: "Zertifizierte Weiterbildung in Webentwicklung",
    institute: "Ironhack",
    location: "Berlin",
    period: "03/2023 – 06/2023",
  },
];
