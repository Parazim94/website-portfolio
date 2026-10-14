export const ACCENT_STORAGE_KEY = "accent";

export const accents = [
  { id: "default", label: "Neutral", swatch: "oklch(0.35 0 0)" },
  { id: "blue", label: "Blau", swatch: "oklch(0.58 0.2 260)" },
  { id: "violet", label: "Violett", swatch: "oklch(0.58 0.22 295)" },
  { id: "green", label: "Grün", swatch: "oklch(0.62 0.17 155)" },
  { id: "orange", label: "Orange", swatch: "oklch(0.7 0.18 50)" },
  { id: "rose", label: "Rosa", swatch: "oklch(0.62 0.22 5)" },
] as const;

export type AccentId = (typeof accents)[number]["id"];

const listeners = new Set<() => void>();

export function subscribeAccent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getAccent(): AccentId {
  return (document.documentElement.dataset.accent as AccentId) ?? "default";
}

export function setAccent(id: AccentId) {
  document.documentElement.dataset.accent = id;
  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, id);
  } catch {}
  listeners.forEach((listener) => listener());
}

export const accentInitScript = `try{var a=localStorage.getItem("${ACCENT_STORAGE_KEY}");if(a)document.documentElement.dataset.accent=a}catch(e){}`;
