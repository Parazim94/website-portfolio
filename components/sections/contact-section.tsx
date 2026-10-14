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
import { contactTopics, PHONE_PATTERN } from "@/lib/contact-topics";
import { sendContactMessage, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle", message: "" };
const emptyValues = { name: "", email: "", phone: "", topic: "", message: "" };
const MESSAGE_MAX = 2000;
const PLACEHOLDER_STYLE = "placeholder:text-muted-foreground/50";

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
  const values = state.values ?? emptyValues;

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
        className="mt-10 flex max-w-2xl flex-col gap-5"
      >
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="contact-website">Website (bitte leer lassen)</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Max Mustermann"
              defaultValue={values.name}
              minLength={2}
              required
              className={PLACEHOLDER_STYLE}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-email">E-Mail</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="max@mustermann.de"
              defaultValue={values.email}
              required
              className={PLACEHOLDER_STYLE}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-phone">
            Telefon{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+49 170 1234567"
            defaultValue={values.phone}
            pattern={PHONE_PATTERN.source}
            title="Telefonnummer, z. B. +49 170 1234567"
            className={PLACEHOLDER_STYLE}
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm font-medium">Worum geht es?</legend>
          <div className="flex flex-wrap gap-2">
            {contactTopics.map((topic, index) => (
              <label
                key={topic.id}
                className="cursor-pointer rounded-full border border-input bg-card px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
              >
                <input
                  type="radio"
                  name="topic"
                  value={topic.id}
                  defaultChecked={values.topic === topic.id}
                  required={index === 0}
                  className="sr-only"
                />
                {topic.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-message">Nachricht</Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            minLength={10}
            maxLength={MESSAGE_MAX}
            placeholder="Hallo Denis, ich würde gern mit dir über … sprechen."
            defaultValue={values.message}
            required
            className={PLACEHOLDER_STYLE}
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
