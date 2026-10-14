export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

// Ein Text in allen Sprachen, direkt neben den Daten gepflegt.
export type L = Record<Locale, string>;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeHref(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}`;
}
