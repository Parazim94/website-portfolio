"use client";

import { useRouter } from "next/navigation";

import { FlagDE, FlagGB } from "@/components/icons";
import { useLocale, useUi } from "@/components/providers/locale-provider";
import { localeHref, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { locale: Locale; label: string; Flag: typeof FlagDE }[] = [
  { locale: "de", label: "Deutsch", Flag: FlagDE },
  { locale: "en", label: "English", Flag: FlagGB },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const current = useLocale();
  const ui = useUi();

  const switchTo = (locale: Locale) => {
    if (locale === current) return;
    router.push(`${localeHref(locale)}${window.location.hash}`, {
      scroll: false,
    });
  };

  return (
    <div
      role="group"
      aria-label={ui.nav.language}
      className="mr-1 flex items-center rounded-full border border-border bg-card p-0.5"
    >
      {options.map(({ locale, label, Flag }) => (
        <button
          key={locale}
          type="button"
          aria-pressed={locale === current}
          aria-label={label}
          title={label}
          lang={locale}
          onClick={() => switchTo(locale)}
          className={cn(
            "flex h-7 w-8 items-center justify-center rounded-full outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50",
            locale === current
              ? "bg-primary/20 ring-1 ring-primary"
              : "opacity-60 hover:opacity-100",
          )}
        >
          <Flag className="h-3.5 w-5 rounded-[2px] shadow-sm" />
        </button>
      ))}
    </div>
  );
}
