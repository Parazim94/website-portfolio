import type { Locale } from "@/lib/i18n";

const de = {
  meta: {
    title: (name: string) => `${name} – Portfolio`,
  },
  nav: {
    openMenu: "Menü öffnen",
    toggleTheme: "Farbschema umschalten",
    chooseAccent: "Akzentfarbe wählen",
    language: "Sprache wählen",
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
    sendEmail: "E-Mail senden",
    github: "GitHub-Profil",
    linkedin: "LinkedIn-Profil",
  },
  hero: {
    greeting: "Hallo, ich bin",
    iBuild: "Ich baue",
    projects: "Projekte ansehen",
    contact: "Kontakt",
    scrollDown: "Zur nächsten Sektion scrollen",
  },
  about: {
    eyebrow: "Über mich",
    howIWork: "Wie ich arbeite",
    myPath: "Mein Weg",
    beyondCode: "Abseits vom Code",
    writeEmail: "E-Mail schreiben",
  },
  projects: {
    eyebrow: "Projekte",
    title: "Was ich gebaut habe",
    description:
      "Wische oder klicke dich durch die Karussells, um die Projekte zu entdecken.",
    carousel: "Karussell",
    previous: "Vorheriges Projekt",
    next: "Nächstes Projekt",
    goTo: (title: string) => `Zu ${title}`,
    show: (title: string) => `${title} anzeigen`,
    highlight: "Highlight",
    liveDemo: "Live Demo",
    code: "Code",
    confidential: "Vertraulich – Details auf Anfrage",
    previousImage: "Vorheriges Bild",
    nextImage: "Nächstes Bild",
    goToImage: (n: number) => `Zu Bild ${n}`,
    screenshot: (title: string, n: number) => `${title} – Screenshot ${n}`,
    details: "Details",
    modal: {
      label: (title: string) => `Projektdetails: ${title}`,
      close: "Schließen",
      previous: "Vorheriges Projekt",
      next: "Nächstes Projekt",
      position: (i: number, n: number) => `${i} von ${n}`,
      image: (n: number) => `Bild ${n} anzeigen`,
      problem: "Problem",
      decision: "Entscheidung",
      result: "Ergebnis",
      askAbout: "Dazu schreiben",
      askMessage: (title: string) =>
        `Hallo Denis, ich habe eine Frage zu „${title}“: `,
    },
  },
  education: {
    eyebrow: "Ausbildung",
    title: "Ausbildung & Zertifikate",
    description: "Mein Weg in die Webentwicklung, Station für Station.",
    finalProject: "Abschlussprojekt:",
    languageLevel: "Sprachniveau:",
    clickToEnlarge: "Klicken zum Vergrößern",
    viewSkill: (skill: string) => `${skill} in den Skills ansehen`,
    certificate: (institute: string) => `Zertifikat ${institute}`,
    enlarge: (institute: string) => `Zertifikat ${institute} groß ansehen`,
    openPdf: "Als PDF öffnen",
    close: "Schließen",
  },
  skills: {
    eyebrow: "Skills",
    title: "Womit ich arbeite",
    description:
      "Ein Überblick über die Technologien und Werkzeuge, mit denen ich täglich arbeite.",
    categories: "Skill-Kategorien",
    hint: "Klicke oder fahre über einen Skill, um zu sehen, wo ich ihn eingesetzt habe.",
    usedIn: (skill: string, n: number) =>
      `${skill} kommt in ${n} ${n === 1 ? "Projekt" : "Projekten"} vor`,
    noProjects: (skill: string) =>
      `${skill} ist eine Arbeitsweise oder ein Werkzeug ohne eigene Projekt-Zuordnung`,
    terminal: [
      'claude "Plane das Feature und schlage einen Ansatz vor"',
      'claude "Setze den Plan um und teste ihn"',
      'claude "Prüfe den Diff auf Fehler und Randfälle"',
      'claude "Schreibe Tests für die neue API"',
    ],
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Lass uns sprechen",
    description:
      "Du hast ein Projekt, eine Frage oder einfach Lust auf Austausch? Schreib mir.",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    optional: "(optional)",
    topic: "Worum geht es?",
    message: "Nachricht",
    messagePlaceholder: "Hallo Denis, ich würde gern mit dir über … sprechen.",
    send: "Nachricht senden",
    error: "Fehler",
    honeypot: "Website (bitte leer lassen)",
    thanks: (name?: string) => (name ? `Danke, ${name}!` : "Danke!"),
    thanksText: (time: string) =>
      `Deine Nachricht ist bei mir angekommen. Ich melde mich in der Regel ${time} bei dir.`,
    another: "Weitere Nachricht senden",
    responseTime: "innerhalb von 1–2 Werktagen",
    errors: {
      name: "Bitte gib deinen Namen an (mindestens 2 Zeichen).",
      email:
        "Bitte gib eine gültige E-Mail-Adresse an, z. B. max@mustermann.de.",
      phone:
        "Die Telefonnummer ist ungültig. Erlaubt sind Ziffern, Leerzeichen und + ( ) / -, z. B. +49 170 1234567. Oder lass das Feld leer.",
      topic: "Bitte wähle aus, worum es geht.",
      messageShort: (length: number) =>
        `Deine Nachricht ist zu kurz (${length} von mindestens 10 Zeichen).`,
      fieldLong: (label: string, max: number) =>
        `${label} ist zu lang (maximal ${max} Zeichen).`,
      invalid:
        "Die Nachricht wurde nicht gesendet. Bitte korrigiere die markierten Felder.",
      rateLimit:
        "Du hast gerade mehrere Nachrichten gesendet. Bitte warte ein paar Minuten oder schreib mir direkt per E-Mail.",
      notConfigured:
        "E-Mail-Versand ist aktuell nicht konfiguriert. Bitte kontaktiere mich direkt per E-Mail.",
      sendFailed:
        "Die Nachricht konnte nicht gesendet werden. Bitte versuch es später erneut.",
    },
    success:
      "Danke für deine Nachricht! Ich melde mich so schnell wie möglich.",
    confirmation: {
      subject: "Deine Nachricht ist angekommen",
      greeting: (name: string) => `Hallo ${name},`,
      body: (topic: string) =>
        `danke für deine Nachricht zum Thema „${topic}“. Ich habe sie erhalten und melde mich so schnell wie möglich bei dir.`,
      reminder: "Zur Erinnerung, das hast du geschrieben:",
      regards: "Viele Grüße",
      automatic:
        "Diese Nachricht wurde automatisch versendet. Du kannst direkt darauf antworten.",
    },
  },
};

export type Ui = typeof de;

const en: Ui = {
  meta: {
    title: (name) => `${name} – Portfolio`,
  },
  nav: {
    openMenu: "Open menu",
    toggleTheme: "Toggle color scheme",
    chooseAccent: "Choose accent color",
    language: "Choose language",
  },
  footer: {
    rights: "All rights reserved.",
    sendEmail: "Send email",
    github: "GitHub profile",
    linkedin: "LinkedIn profile",
  },
  hero: {
    greeting: "Hi, I'm",
    iBuild: "I build",
    projects: "View projects",
    contact: "Contact",
    scrollDown: "Scroll to the next section",
  },
  about: {
    eyebrow: "About me",
    howIWork: "How I work",
    myPath: "My path",
    beyondCode: "Beyond code",
    writeEmail: "Write an email",
  },
  projects: {
    eyebrow: "Projects",
    title: "What I've built",
    description:
      "Swipe or click through the carousels to explore the projects.",
    carousel: "Carousel",
    previous: "Previous project",
    next: "Next project",
    goTo: (title) => `Go to ${title}`,
    show: (title) => `Show ${title}`,
    highlight: "Highlight",
    liveDemo: "Live demo",
    code: "Code",
    confidential: "Confidential – details on request",
    previousImage: "Previous image",
    nextImage: "Next image",
    goToImage: (n) => `Go to image ${n}`,
    screenshot: (title, n) => `${title} – screenshot ${n}`,
    details: "Details",
    modal: {
      label: (title) => `Project details: ${title}`,
      close: "Close",
      previous: "Previous project",
      next: "Next project",
      position: (i, n) => `${i} of ${n}`,
      image: (n) => `Show image ${n}`,
      problem: "Problem",
      decision: "Decision",
      result: "Result",
      askAbout: "Ask about this",
      askMessage: (title) => `Hi Denis, I have a question about "${title}": `,
    },
  },
  education: {
    eyebrow: "Education",
    title: "Education & certificates",
    description: "My path into web development, step by step.",
    finalProject: "Final project:",
    languageLevel: "Language level:",
    clickToEnlarge: "Click to enlarge",
    viewSkill: (skill) => `View ${skill} in skills`,
    certificate: (institute) => `Certificate ${institute}`,
    enlarge: (institute) => `View certificate ${institute} enlarged`,
    openPdf: "Open as PDF",
    close: "Close",
  },
  skills: {
    eyebrow: "Skills",
    title: "What I work with",
    description:
      "An overview of the technologies and tools I work with every day.",
    categories: "Skill categories",
    hint: "Click or hover a skill to see where I've used it.",
    usedIn: (skill, n) =>
      `${skill} is used in ${n} ${n === 1 ? "project" : "projects"}`,
    noProjects: (skill) =>
      `${skill} is a way of working or a tool without its own project link`,
    terminal: [
      'claude "Plan the feature and suggest an approach"',
      'claude "Implement the plan and test it"',
      'claude "Review the diff for bugs and edge cases"',
      'claude "Write tests for the new API"',
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk",
    description:
      "Got a project, a question, or just want to chat? Drop me a message.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    optional: "(optional)",
    topic: "What is it about?",
    message: "Message",
    messagePlaceholder: "Hi Denis, I'd love to talk to you about …",
    send: "Send message",
    error: "Error",
    honeypot: "Website (please leave empty)",
    thanks: (name) => (name ? `Thanks, ${name}!` : "Thanks!"),
    thanksText: (time) => `Your message has arrived. I usually reply ${time}.`,
    another: "Send another message",
    responseTime: "within 1–2 business days",
    errors: {
      name: "Please enter your name (at least 2 characters).",
      email: "Please enter a valid email address, e.g. max@mustermann.de.",
      phone:
        "The phone number is invalid. Digits, spaces and + ( ) / - are allowed, e.g. +49 170 1234567. Or leave the field empty.",
      topic: "Please choose what it is about.",
      messageShort: (length) =>
        `Your message is too short (${length} of at least 10 characters).`,
      fieldLong: (label, max) =>
        `${label} is too long (maximum ${max} characters).`,
      invalid:
        "The message was not sent. Please correct the highlighted fields.",
      rateLimit:
        "You have just sent several messages. Please wait a few minutes or email me directly.",
      notConfigured:
        "Email sending is currently not configured. Please contact me directly by email.",
      sendFailed: "The message could not be sent. Please try again later.",
    },
    success:
      "Thanks for your message! I'll get back to you as soon as possible.",
    confirmation: {
      subject: "Your message has arrived",
      greeting: (name) => `Hi ${name},`,
      body: (topic) =>
        `thanks for your message about "${topic}". I have received it and will get back to you as soon as possible.`,
      reminder: "As a reminder, this is what you wrote:",
      regards: "Best regards",
      automatic:
        "This message was sent automatically. You can reply to it directly.",
    },
  },
};

const dictionaries: Record<Locale, Ui> = { de, en };

export function getUi(locale: Locale): Ui {
  return dictionaries[locale];
}
