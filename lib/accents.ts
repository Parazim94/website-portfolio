import type { L } from "@/lib/i18n";

export const ACCENT_STORAGE_KEY = "accent";

export const accents = [
  { id: "default", label: { de: "Neutral", en: "Neutral" } satisfies L, swatch: "oklch(0.35 0 0)" },
  { id: "blue", label: { de: "Blau", en: "Blue" } satisfies L, swatch: "oklch(0.58 0.2 260)" },
  { id: "violet", label: { de: "Violett", en: "Violet" } satisfies L, swatch: "oklch(0.58 0.22 295)" },
  { id: "green", label: { de: "Grün", en: "Green" } satisfies L, swatch: "oklch(0.62 0.17 155)" },
  { id: "orange", label: { de: "Orange", en: "Orange" } satisfies L, swatch: "oklch(0.7 0.18 50)" },
  { id: "rose", label: { de: "Rosa", en: "Pink" } satisfies L, swatch: "oklch(0.62 0.22 5)" },
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
