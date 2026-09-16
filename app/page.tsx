import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col px-4 sm:px-6">
      <section
        id="hero"
        className="flex min-h-[calc(100vh-4rem)] scroll-mt-16 flex-col items-start justify-center gap-6"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Hallo, ich bin Dein Name 👋
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Frontend-Entwickler:in, die Ideen in schnelle, saubere Interfaces
          verwandelt.
        </p>
        <Button size="lg" asChild>
          <a href="#projects">Projekte ansehen</a>
        </Button>
      </section>

      <AboutSection />

      <ProjectsSection />

      <section
        id="skills"
        className="scroll-mt-16 border-t border-border/40 py-24"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Platzhalter – hier folgen Skill-Badges.
        </p>
      </section>

      <section
        id="contact"
        className="scroll-mt-16 border-t border-border/40 py-24"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Kontakt</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Platzhalter – hier folgt das Kontaktformular.
        </p>
      </section>
    </div>
  );
}
