import Link from "next/link";
import { Mail } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { getUi } from "@/lib/i18n/ui";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const ui = getUi(locale);

  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {year} {siteConfig.name}. {ui.footer.rights}
        </p>

        <div className="flex items-center gap-3">
          <Link
            href={`mailto:${siteConfig.email}`}
            aria-label={ui.footer.sendEmail}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-5 w-5" />
          </Link>
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            aria-label={ui.footer.github}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="h-5 w-5" />
          </Link>
          <Link
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={ui.footer.linkedin}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
