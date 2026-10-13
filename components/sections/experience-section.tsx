"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ImageIcon,
  Lock,
} from "lucide-react";

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
import {
  personalProjects,
  personalProjectsGroup,
  workExperience,
  workProjects,
  type WorkProject,
} from "@/lib/experience";

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

const IMAGE_FIT_CLASS = {
  cover: "object-cover",
  contain: "object-contain",
  top: "object-cover object-top",
} as const;

function ProjectImageGallery({
  images,
  title,
  fit = "cover",
}: {
  images: string[];
  title: string;
  fit?: "cover" | "contain" | "top";
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <>
      <Image
        src={images[activeIndex]}
        alt={`${title} – Screenshot ${activeIndex + 1}`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className={`rounded-t-xl ${IMAGE_FIT_CLASS[fit]}`}
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Vorheriges Bild"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1 text-foreground transition-colors hover:bg-background"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Nächstes Bild"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1 text-foreground transition-colors hover:bg-background"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Zu Bild ${index + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  index === activeIndex ? "bg-primary" : "bg-background/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function ProjectCard({ project }: { project: WorkProject }) {
  return (
    <motion.div variants={item} className="h-full">
      <Card className="flex h-full flex-col overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
          {project.images && project.images.length > 0 ? (
            <ProjectImageGallery
              images={project.images}
              title={project.title}
              fit={project.imageFit}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageIcon className="h-6 w-6" aria-hidden="true" />
              <span className="text-xs">Screenshot folgt</span>
            </div>
          )}
        </div>

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
          {project.liveUrl || project.githubUrl ? (
            <>
              {project.liveUrl ? (
                <Button asChild size="sm" variant="outline">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink />
                    Live Demo
                  </a>
                </Button>
              ) : null}
              {project.githubUrl ? (
                <Button asChild size="sm" variant="ghost">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <GithubIcon className="h-4 w-4" />
                    Code
                  </a>
                </Button>
              ) : null}
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              {project.note ?? "Vertraulich – Details auf Anfrage"}
            </span>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function ProjectGrid({ projects }: { projects: WorkProject[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
      className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}

export function PersonalProjectsSection() {
  return (
    <section
      id="personal-projects"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow={personalProjectsGroup.title}
        title={personalProjectsGroup.title}
        description={personalProjectsGroup.subtitle}
      />

      <ProjectGrid projects={personalProjects} />
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow="Berufserfahrung"
        title="Berufserfahrung"
        description="Ausgewählte Projekte aus meiner beruflichen Praxis."
      />

      <div className="mt-10 flex flex-col gap-1 border-b border-border/40 pb-6 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="text-lg font-semibold">{workExperience.company}</p>
          <p className="text-sm text-muted-foreground">
            {workExperience.role}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {workExperience.period}
        </p>
      </div>

      <ProjectGrid projects={workProjects} />
    </section>
  );
}
