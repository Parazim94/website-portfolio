"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle", message: "" };

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : null}
      Nachricht senden
    </Button>
  );
}

export function ContactSection() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t border-border/40 py-24"
    >
      <SectionHeading
        eyebrow="Kontakt"
        title="Lass uns sprechen"
        description="Du hast ein Projekt, eine Frage oder einfach Lust auf Austausch? Schreib mir."
      />

      <motion.form
        action={formAction}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="mt-10 flex max-w-xl flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            minLength={2}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">E-Mail</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-message">Nachricht</Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={5}
            minLength={10}
            required
          />
        </div>

        {state.status !== "idle" ? (
          <Alert variant={state.status === "error" ? "destructive" : "default"}>
            <AlertTitle>
              {state.status === "error" ? "Fehler" : "Nachricht gesendet"}
            </AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        ) : null}

        <SubmitButton />
      </motion.form>
    </section>
  );
}
