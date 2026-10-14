"use client";

import { SectionHeading } from "@/components/section-heading";
import { ProjectCarousel } from "@/components/project-carousel";
import { allProjects, type ProjectCategory } from "@/lib/all-projects";
import { personalProjectsGroup, workExperience } from "@/lib/experience";
import type { L } from "@/lib/i18n";
import { useT, useUi } from "@/components/providers/locale-provider";

const groups: {
  id: ProjectCategory;
  title: L;
  subtitle: L;
}[] = [
  {
    id: "personal",
    title: personalProjectsGroup.title,
    subtitle: personalProjectsGroup.subtitle,
  },
  {
    id: "work",
    title: { de: "Berufserfahrung", en: "Work experience" },
    subtitle: {
      de: `${workExperience.company} · ${workExperience.role.de} · ${workExperience.period}`,
      en: `${workExperience.company} · ${workExperience.role.en} · ${workExperience.period}`,
    },
  },
  {
    id: "training",
    title: {
      de: "Ausbildung & Weiterbildung",
      en: "Education & further training",
    },
    subtitle: {
      de: "Projekte aus Ausbildung und Weiterbildung",
      en: "Projects from education and further training",
    },
  },
];

export function ProjectsSection() {
  const t = useT();
  const ui = useUi();

  return (
    <section
      id="projects"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow={ui.projects.eyebrow}
        title={ui.projects.title}
        description={ui.projects.description}
      />

      <div className="mt-12 flex flex-col gap-16">
        {groups.map((group) => {
          const projects = allProjects
            .filter((project) => project.category === group.id)
            .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

          return (
            <div key={group.id}>
              <div className="mb-4 border-b border-border/40 pb-4">
                <h3 className="text-lg font-semibold">{t(group.title)}</h3>
                <p className="text-sm text-muted-foreground">
                  {t(group.subtitle)}
                </p>
              </div>
              <ProjectCarousel projects={projects} label={t(group.title)} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
