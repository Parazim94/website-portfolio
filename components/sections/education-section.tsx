"use client";

import { motion } from "framer-motion";
import { FileText, GraduationCap } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { education } from "@/lib/education";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function EducationSection() {
  return (
    <section
      id="education"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow="Ausbildung"
        title="Ausbildung & Zertifikate"
        description="Meine formale Ausbildung im Bereich Webentwicklung."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mt-10 grid gap-6 sm:grid-cols-2"
      >
        {education.map((entry) => (
          <motion.div key={entry.slug} variants={item} className="h-full">
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  {entry.institute}
                </CardTitle>
                <CardAction className="text-xs text-muted-foreground">
                  {entry.period}
                </CardAction>
                <CardDescription>
                  {entry.title} · {entry.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-3">
                {entry.detail ? (
                  <p className="text-sm text-muted-foreground">
                    {entry.detail}
                  </p>
                ) : null}

                {entry.focusAreas ? (
                  <div className="flex flex-wrap gap-1.5">
                    {entry.focusAreas.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                {entry.finalProject ? (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Abschlussprojekt:
                    </span>{" "}
                    {entry.finalProject}
                  </p>
                ) : null}

                {entry.languageLevel ? (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Sprachniveau:
                    </span>{" "}
                    {entry.languageLevel}
                  </p>
                ) : null}
              </CardContent>

              {entry.certificateUrl ? (
                <CardFooter>
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={entry.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText />
                      Zertifikat ansehen
                    </a>
                  </Button>
                </CardFooter>
              ) : null}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
