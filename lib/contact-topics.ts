export interface ContactTopicField {
  name: string;
  label: string;
  placeholder: string;
}

export interface ContactTopic {
  id: string;
  label: string;
  fields?: readonly ContactTopicField[];
}

export const contactTopics = [
  {
    id: "job",
    label: "Jobangebot",
    fields: [
      { name: "company", label: "Firma", placeholder: "Muster GmbH" },
      {
        name: "position",
        label: "Stelle",
        placeholder: "Full-Stack Entwickler (m/w/d)",
      },
    ],
  },
  {
    id: "freelance",
    label: "Freelance-Projekt",
    fields: [
      { name: "budget", label: "Budget", placeholder: "z. B. 3.000–5.000 €" },
      {
        name: "timeframe",
        label: "Zeitrahmen",
        placeholder: "z. B. Start im Januar, ca. 3 Monate",
      },
    ],
  },
  { id: "collaboration", label: "Zusammenarbeit" },
  { id: "question", label: "Frage zu einem Projekt" },
  { id: "other", label: "Sonstiges" },
] as const satisfies readonly ContactTopic[];

export const PHONE_PATTERN = /^\+?[\d\s()/-]{6,20}$/;

export const EXTRA_FIELD_MAX = 200;

export const RESPONSE_TIME = "innerhalb von 1–2 Werktagen";
