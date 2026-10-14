"use client";

import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProjectCard } from "@/components/sections/project-card";
import { useT, useUi } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { PortfolioProject } from "@/lib/all-projects";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 60;
const MAX_VISIBLE_OFFSET = 2;

export function ProjectCarousel({
  projects,
  label,
  onOpen,
}: {
  projects: PortfolioProject[];
  label: string;
  onOpen?: (slug: string) => void;
}) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const t = useT();
  const ui = useUi();
  const count = projects.length;
  const half = Math.floor(count / 2);

  const go = (step: number) =>
    setActive((current) => (current + step + count) % count);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "ArrowRight") go(1);
  };

  return (
    <div
      role="group"
      aria-roledescription={ui.projects.carousel}
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      <motion.div
        onPanEnd={(_, info) => {
          if (info.offset.x < -SWIPE_THRESHOLD) go(1);
          else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
        }}
        className="relative mx-auto overflow-hidden py-4"
        style={{ perspective: 1400, touchAction: "pan-y" }}
      >
        <div
          className="mx-auto grid w-[min(20rem,78vw)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, index) => {
            const offset = ((index - active + count + half) % count) - half;
            const distance = Math.abs(offset);
            const isActive = offset === 0;
            const isVisible = distance <= MAX_VISIBLE_OFFSET;

            return (
              <motion.div
                key={project.slug}
                className="relative col-start-1 row-start-1"
                initial={false}
                animate={{
                  x: `${offset * 72}%`,
                  z: -distance * 160,
                  rotateY: -offset * 32,
                  scale: isActive ? 1 : 0.92,
                  opacity: !isVisible
                    ? 0
                    : isActive
                      ? 1
                      : distance === 1
                        ? 0.65
                        : 0.3,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 140, damping: 22 }
                }
                style={{
                  zIndex: 10 - distance,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <div inert={!isActive} className="h-full">
                  <ProjectCard
                    project={project}
                    onOpen={project.story ? onOpen : undefined}
                  />
                </div>
                {!isActive && isVisible ? (
                  <button
                    type="button"
                    aria-label={ui.projects.show(t(project.title))}
                    onClick={() => setActive(index)}
                    className="absolute inset-0 cursor-pointer rounded-xl"
                  />
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {count > 1 ? (
        <div className="mt-2 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            aria-label={ui.projects.previous}
            onClick={() => go(-1)}
          >
            <ChevronLeft />
          </Button>

          <div className="flex items-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                aria-label={ui.projects.goTo(t(project.title))}
                aria-current={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === active
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground",
                )}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            aria-label={ui.projects.next}
            onClick={() => go(1)}
          >
            <ChevronRight />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
