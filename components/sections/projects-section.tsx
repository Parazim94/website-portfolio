"use client";

import { SectionHeading } from "@/components/section-heading";
import { ProjectCarousel } from "@/components/project-carousel";
import { allProjects, type ProjectCategory } from "@/lib/all-projects";
import { workExperience } from "@/lib/experience";

const groups: {
  id: ProjectCategory;
  title: string;
  subtitle: string;
}[] = [
  {
    id: "personal",
    title: "Eigene Projekte",
    subtitle: "Selbstständig konzipiert und umgesetzt",
  },
  {
    id: "work",
    title: "Berufserfahrung",
    subtitle: `${workExperience.company} · ${workExperience.role} · ${workExperience.period}`,
  },
  {
    id: "training",
    title: "Ausbildung & Weiterbildung",
    subtitle: "Projekte aus Ausbildung und Weiterbildung",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow="Projekte"
        title="Was ich gebaut habe"
        description="Wische oder klicke dich durch die Karussells, um die Projekte zu entdecken."
      />

      <div className="mt-12 flex flex-col gap-16">
        {groups.map((group) => {
          const projects = allProjects
            .filter((project) => project.category === group.id)
            .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

          return (
            <div key={group.id}>
              <div className="mb-4 border-b border-border/40 pb-4">
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {group.subtitle}
                </p>
              </div>
              <ProjectCarousel projects={projects} label={group.title} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
