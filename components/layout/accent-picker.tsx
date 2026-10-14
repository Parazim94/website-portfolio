"use client";

import * as React from "react";
import { Check, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  accents,
  getAccent,
  setAccent,
  subscribeAccent,
} from "@/lib/accents";
import { cn } from "@/lib/utils";

export function AccentPicker() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const current = React.useSyncExternalStore(
    subscribeAccent,
    getAccent,
    () => "default" as const,
  );

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Akzentfarbe wählen"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Palette className="h-5 w-5" />
      </Button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 flex gap-2 rounded-lg border border-border bg-popover p-2 shadow-lg">
          {accents.map((accent) => (
            <button
              key={accent.id}
              type="button"
              aria-label={accent.label}
              aria-pressed={current === accent.id}
              title={accent.label}
              onClick={() => setAccent(accent.id)}
              style={{ backgroundColor: accent.swatch }}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-white outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring",
                current === accent.id &&
                  "ring-2 ring-foreground ring-offset-2 ring-offset-popover",
              )}
            >
              {current === accent.id ? <Check className="h-4 w-4" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
