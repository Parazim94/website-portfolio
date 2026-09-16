"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillGroups, type SkillIntensity } from "@/lib/skills";
import { cn } from "@/lib/utils";

// Eine einzige Akzentfarbe für alle Kategorien; nur die Intensität
// (Opacity) der Header variiert leicht zwischen den Kategorien.
const headerIntensityStyles: Record<SkillIntensity, string> = {
  high: "text-sky-600 dark:text-sky-300",
  medium: "text-sky-600/80 dark:text-sky-300/80",
  low: "text-sky-600/60 dark:text-sky-300/60",
};

const badgeStyle = "border-sky-500/20 bg-foreground/5 text-sky-700 dark:text-sky-300";

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

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow="Skills"
        title="Womit ich arbeite"
        description="Ein Überblick über die Technologien und Werkzeuge, mit denen ich täglich arbeite."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <motion.div key={group.title} variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle
                  className={cn(
                    "flex items-center gap-2",
                    headerIntensityStyles[group.intensity],
                  )}
                >
                  <group.icon className="h-4 w-4" aria-hidden="true" />
                  {group.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className={badgeStyle}>
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
