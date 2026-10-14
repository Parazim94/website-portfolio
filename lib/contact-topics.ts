export const contactTopics = [
  { id: "job", label: "Jobangebot" },
  { id: "freelance", label: "Freelance-Projekt" },
  { id: "collaboration", label: "Zusammenarbeit" },
  { id: "question", label: "Frage zu einem Projekt" },
  { id: "other", label: "Sonstiges" },
] as const;

export type ContactTopicId = (typeof contactTopics)[number]["id"];

export const PHONE_PATTERN = /^\+?[\d\s()/-]{6,20}$/;
