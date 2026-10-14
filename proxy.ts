import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n";

// Deutsch ist die Standardsprache und liegt ohne Präfix unter "/".
// Intern wird "/" auf "/de" umgeschrieben, Englisch liegt unter "/en".
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const defaultPrefix = `/${defaultLocale}`;
  if (pathname === defaultPrefix || pathname.startsWith(`${defaultPrefix}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultPrefix.length) || "/";
    return NextResponse.redirect(url);
  }

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `${defaultPrefix}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Alle Seiten, aber keine internen Pfade und keine Dateien (mit Endung).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
