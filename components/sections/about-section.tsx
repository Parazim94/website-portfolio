"use client";

import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading eyebrow="Über mich" title="Wer ich bin" />

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,260px)_1fr] md:items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/15 to-primary/5 md:mx-0"
        >
          {/*
            Platzhalter fürs Profilfoto. Sobald ein echtes Bild vorliegt,
            z.B. in public/images/profile.jpg, ersetzen durch:
            <Image src="/images/profile.jpg" alt={siteConfig.name} fill className="object-cover" />
          */}
          <div className="flex h-full w-full items-center justify-center">
            <UserRound
              className="h-20 w-20 text-primary/40"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <p className="text-sm font-medium text-muted-foreground">
            {siteConfig.role} · {siteConfig.location}
          </p>

          {siteConfig.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground">
              {paragraph}
            </p>
          ))}

          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {siteConfig.about.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-lg border border-border/60 p-3"
              >
                <dt className="text-xs text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="text-sm font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
