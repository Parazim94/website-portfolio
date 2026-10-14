"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { L, Locale } from "@/lib/i18n";
import { getUi, type Ui } from "@/lib/i18n/ui";

const LocaleContext = createContext<Locale>("de");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useUi(): Ui {
  return getUi(useContext(LocaleContext));
}

// Wählt aus einem mehrsprachigen Text die aktuelle Sprache.
export function useT() {
  const locale = useContext(LocaleContext);
  return (text: L) => text[locale];
}
