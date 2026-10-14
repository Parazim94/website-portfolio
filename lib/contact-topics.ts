import type { L } from "@/lib/i18n";

export interface ContactTopicField {
  name: string;
  label: L;
  placeholder: L;
}

export interface ContactTopic {
  id: string;
  label: L;
  fields?: readonly ContactTopicField[];
}

export const contactTopics = [
  {
    id: "job",
    label: { de: "Jobangebot", en: "Job offer" },
    fields: [
      {
        name: "company",
        label: { de: "Firma", en: "Company" },
        placeholder: { de: "Muster GmbH", en: "Example Inc." },
      },
      {
        name: "position",
        label: { de: "Stelle", en: "Position" },
        placeholder: {
          de: "Full-Stack Entwickler (m/w/d)",
          en: "Full-Stack Developer (m/f/d)",
        },
      },
    ],
  },
  {
    id: "freelance",
    label: { de: "Freelance-Projekt", en: "Freelance project" },
    fields: [
      {
        name: "budget",
        label: { de: "Budget", en: "Budget" },
        placeholder: { de: "z. B. 3.000–5.000 €", en: "e.g. €3,000–5,000" },
      },
      {
        name: "timeframe",
        label: { de: "Zeitrahmen", en: "Timeframe" },
        placeholder: {
          de: "z. B. Start im Januar, ca. 3 Monate",
          en: "e.g. start in January, about 3 months",
        },
      },
    ],
  },
  { id: "collaboration", label: { de: "Zusammenarbeit", en: "Collaboration" } },
  {
    id: "question",
    label: { de: "Frage zu einem Projekt", en: "Question about a project" },
  },
  { id: "other", label: { de: "Sonstiges", en: "Other" } },
] as const satisfies readonly ContactTopic[];

export const PHONE_PATTERN = /^\+?[\d\s()/-]{6,20}$/;

export const EXTRA_FIELD_MAX = 200;
