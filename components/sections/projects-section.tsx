"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/lib/projects";

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

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow="Projekte"
        title="Ausgewählte Arbeiten"
        description="Eine Auswahl an Projekten, an denen ich zuletzt gearbeitet habe."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={item} className="h-full">
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-wrap content-start gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </CardContent>

              <CardFooter className="gap-2">
                {project.liveUrl ? (
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink />
                      Live Demo
                    </a>
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button asChild size="sm" variant="ghost">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GithubIcon className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                ) : null}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
