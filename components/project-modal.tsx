"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  MessageSquare,
  Star,
  Target,
  X,
} from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { useT, useUi } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PortfolioProject } from "@/lib/all-projects";
import { prefillContact } from "@/lib/contact-prefill";
import { cn } from "@/lib/utils";

const IMAGE_FIT_CLASS = {
  cover: "object-cover",
  contain: "object-contain",
  top: "object-cover object-top",
} as const;

const SWIPE_THRESHOLD = 60;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function subscribe() {
  return () => {};
}

function ModalBody({
  project,
  onAsk,
}: {
  project: PortfolioProject;
  onAsk: () => void;
}) {
  const t = useT();
  const ui = useUi();
  const [activeImage, setActiveImage] = useState(0);
  const images = project.images ?? [];
  const story = project.story;

  const stepImage = (step: number) =>
    setActiveImage(
      (current) => (current + step + images.length) % images.length,
    );

  const storyBlocks = story
    ? [
        { icon: Target, label: ui.projects.modal.problem, text: story.problem },
        {
          icon: Compass,
          label: ui.projects.modal.decision,
          text: story.decision,
        },
        {
          icon: CheckCircle2,
          label: ui.projects.modal.result,
          text: story.result,
        },
      ]
    : [];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
    >
      {images.length > 0 ? (
        <motion.div variants={rise} className="flex min-w-0 flex-col gap-3">
          <motion.div
            onPanEnd={(_, info) => {
              if (images.length < 2) return;
              if (info.offset.x < -SWIPE_THRESHOLD) stepImage(1);
              else if (info.offset.x > SWIPE_THRESHOLD) stepImage(-1);
            }}
            style={{ touchAction: "pan-y" }}
            className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted"
          >
            <Image
              key={images[activeImage]}
              src={images[activeImage]}
              alt={ui.projects.screenshot(t(project.title), activeImage + 1)}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className={IMAGE_FIT_CLASS[project.imageFit ?? "cover"]}
            />

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => stepImage(-1)}
                  aria-label={ui.projects.previousImage}
                  className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-background/70 p-2 transition-colors hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => stepImage(1)}
                  aria-label={ui.projects.nextImage}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-background/70 p-2 transition-colors hover:bg-background"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            ) : null}
          </motion.div>

          {images.length > 1 ? (
            <ul className="flex gap-2 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <li key={image} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={ui.projects.modal.image(index + 1)}
                    aria-current={index === activeImage}
                    className={cn(
                      "relative block aspect-video w-24 overflow-hidden rounded-md border bg-muted outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50",
                      index === activeImage
                        ? "border-primary ring-1 ring-primary"
                        : "border-border opacity-60 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="96px"
                      className={IMAGE_FIT_CLASS[project.imageFit ?? "cover"]}
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </motion.div>
      ) : null}

      <div className="flex min-w-0 flex-col gap-4">
        <motion.p variants={rise} className="text-muted-foreground">
          {t(project.description)}
        </motion.p>

        {storyBlocks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {storyBlocks.map(({ icon: Icon, label, text }) => (
              <motion.div
                key={label}
                variants={rise}
                className="rounded-xl border border-border bg-background/60 p-4"
              >
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  {label}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{t(text)}</p>
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>

      <motion.ul
        variants={rise}
        className="flex flex-wrap gap-1.5 lg:col-span-2"
      >
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="secondary">{tag}</Badge>
          </li>
        ))}
      </motion.ul>

      <motion.div
        variants={rise}
        className="flex flex-wrap items-center gap-2 lg:col-span-2"
      >
        {project.liveUrl ? (
          <Button asChild>
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink />
              {ui.projects.liveDemo}
            </a>
          </Button>
        ) : null}
        {project.githubUrl ? (
          <Button asChild variant="outline">
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <GithubIcon className="h-4 w-4" />
              {ui.projects.code}
            </a>
          </Button>
        ) : null}
        <Button variant="ghost" onClick={onAsk}>
          <MessageSquare />
          {ui.projects.modal.askAbout}
        </Button>
        {!project.liveUrl && !project.githubUrl && project.note ? (
          <span className="text-sm text-muted-foreground">
            {t(project.note)}
          </span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export function ProjectModal({
  projects,
  openSlug,
  onNavigate,
  onClose,
}: {
  projects: PortfolioProject[];
  openSlug: string | null;
  onNavigate: (slug: string) => void;
  onClose: () => void;
}) {
  const t = useT();
  const ui = useUi();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const index = projects.findIndex((project) => project.slug === openSlug);
  const project = index >= 0 ? projects[index] : undefined;
  const count = projects.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = Boolean(project);

  const go = (step: number) => {
    if (index < 0) return;
    onNavigate(projects[(index + step + count) % count].slug);
  };

  // Escape schließt, Pfeiltasten blättern durch die Projekte.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "ArrowRight") go(1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  // Hintergrund sperren und Fokus verwalten.
  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={ui.projects.modal.label(t(project.title))}
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 sm:px-6">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <h3 className="truncate text-lg font-semibold">
                  {t(project.title)}
                </h3>
                {project.featured ? (
                  <Badge variant="outline" className="gap-1 text-primary">
                    <Star className="h-3 w-3" aria-hidden="true" />
                    {ui.projects.highlight}
                  </Badge>
                ) : null}
              </div>

              <span className="hidden text-xs text-muted-foreground sm:block">
                {ui.projects.modal.position(index + 1, count)}
              </span>

              {count > 1 ? (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => go(-1)}
                    aria-label={ui.projects.modal.previous}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => go(1)}
                    aria-label={ui.projects.modal.next}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              ) : null}

              <Button
                ref={closeRef}
                variant="outline"
                size="icon"
                onClick={onClose}
                aria-label={ui.projects.modal.close}
              >
                <X />
              </Button>
            </div>

            <div className="overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.2 }}
                >
                  <ModalBody
                    project={project}
                    onAsk={() => {
                      const title = t(project.title);
                      onClose();
                      window.setTimeout(
                        () =>
                          prefillContact({
                            topic: "question",
                            message: ui.projects.modal.askMessage(title),
                          }),
                        80,
                      );
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
