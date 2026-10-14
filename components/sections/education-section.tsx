"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ExternalLink, GraduationCap, X } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { education, focusSkillLinks, type Education } from "@/lib/education";
import { focusSkill } from "@/lib/skill-focus";

// Chronologisch: ältester Eintrag oben, der Weg läuft nach unten.
const timeline = [...education].reverse();

const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const chip = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 20 },
  },
};

function CertificateLightbox({
  entry,
  onClose,
}: {
  entry: Education;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Zertifikat ${entry.institute}`}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-black/75 p-4 backdrop-blur-sm"
    >
      <motion.img
        layoutId={`certificate-${entry.slug}`}
        src={entry.certificatePreview}
        alt={`Zertifikat ${entry.institute}`}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[78vh] max-w-full rounded-lg bg-white object-contain shadow-2xl"
      />

      <div
        onClick={(event) => event.stopPropagation()}
        className="flex items-center gap-2"
      >
        {entry.certificateUrl ? (
          <Button asChild size="sm" variant="secondary">
            <a href={entry.certificateUrl} target="_blank" rel="noreferrer">
              <ExternalLink />
              Als PDF öffnen
            </a>
          </Button>
        ) : null}
        <Button ref={closeRef} size="sm" variant="secondary" onClick={onClose}>
          <X />
          Schließen
        </Button>
      </div>
    </motion.div>
  );
}

function TimelineCard({
  entry,
  index,
  openSlug,
  onOpen,
}: {
  entry: Education;
  index: number;
  openSlug: string | null;
  onOpen: (slug: string) => void;
}) {
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-border bg-card p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <GraduationCap
            className="h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          {entry.institute}
        </h3>
        <span className="shrink-0 text-xs text-muted-foreground">
          {entry.period}
        </span>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {entry.title} · {entry.location}
      </p>

      {entry.detail ? (
        <p className="mt-3 text-sm text-muted-foreground">{entry.detail}</p>
      ) : null}

      {entry.focusAreas ? (
        <motion.ul
          variants={chipContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-4 flex flex-wrap gap-1.5"
        >
          {entry.focusAreas.map((area) => {
            const skill = focusSkillLinks[area];

            return (
              <motion.li key={area} variants={chip}>
                {skill ? (
                  <motion.button
                    type="button"
                    onClick={() => focusSkill(skill)}
                    title={`${skill} in den Skills ansehen`}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="cursor-pointer rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium outline-none transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {area}
                  </motion.button>
                ) : (
                  <span className="block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {area}
                  </span>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      ) : null}

      {entry.finalProject ? (
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Abschlussprojekt:</span>{" "}
          <a
            href="#projects"
            className="underline decoration-primary/50 underline-offset-4 transition-colors hover:text-foreground"
          >
            {entry.finalProject}
          </a>
        </p>
      ) : null}

      {entry.languageLevel ? (
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Sprachniveau:</span>{" "}
          {entry.languageLevel}
        </p>
      ) : null}

      {entry.certificatePreview ? (
        <div className="mt-5 flex items-end gap-4">
          <button
            type="button"
            onClick={() => onOpen(entry.slug)}
            aria-label={`Zertifikat ${entry.institute} groß ansehen`}
            className="group relative block w-40 cursor-zoom-in outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <motion.div
              initial={{ rotate: fromLeft ? -3 : 3 }}
              whileHover={{ rotate: 0, y: -6, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="overflow-hidden rounded-md border border-border bg-white shadow-lg"
            >
              {openSlug !== entry.slug ? (
                <motion.img
                  layoutId={`certificate-${entry.slug}`}
                  src={entry.certificatePreview}
                  alt={`Zertifikat ${entry.institute}`}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="aspect-[3/4] w-full bg-muted"
                />
              )}
            </motion.div>
          </button>
          <p className="pb-1 text-xs text-muted-foreground">
            Klicken zum Vergrößern
          </p>
        </div>
      ) : null}
    </motion.div>
  );
}

export function EducationSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });
  const openEntry = timeline.find((entry) => entry.slug === openSlug);

  return (
    <section
      id="education"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow="Ausbildung"
        title="Ausbildung & Zertifikate"
        description="Mein Weg in die Webentwicklung, Station für Station."
      />

      <ol ref={trackRef} className="relative mt-12 flex flex-col gap-12">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-4 w-px -translate-x-1/2 bg-border md:left-1/2"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: progress, transformOrigin: "top" }}
          className="absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 bg-primary md:left-1/2"
        />

        {timeline.map((entry, index) => (
          <li
            key={entry.slug}
            className="relative pl-12 md:grid md:grid-cols-2 md:pl-0"
          >
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="absolute top-7 left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary ring-2 ring-primary/40 md:left-1/2"
            />

            <div
              className={
                index % 2 === 0
                  ? "md:col-start-1 md:pr-10"
                  : "md:col-start-2 md:pl-10"
              }
            >
              <TimelineCard
                entry={entry}
                index={index}
                openSlug={openSlug}
                onOpen={setOpenSlug}
              />
            </div>
          </li>
        ))}
      </ol>

      <AnimatePresence>
        {openEntry ? (
          <CertificateLightbox
            key={openEntry.slug}
            entry={openEntry}
            onClose={() => setOpenSlug(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
