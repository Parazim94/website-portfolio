import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col px-4 sm:px-6">
      <section
        id="hero"
        className="flex min-h-[calc(100vh-4rem)] scroll-mt-16 flex-col items-start justify-center gap-6"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Hallo, ich bin {siteConfig.name} 👋
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          {siteConfig.tagline}
        </p>
        <Button size="lg" asChild>
          <a href="#projects">Projekte ansehen</a>
        </Button>
      </section>

      <AboutSection />

      <ProjectsSection />

      <SkillsSection />

      <ContactSection />
    </div>
  );
}
