"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactTopics,
  EXTRA_FIELD_MAX,
  RESPONSE_TIME,
  type ContactTopic,
} from "@/lib/contact-topics";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle", message: "" };
const emptyValues: Record<string, string> = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
};
const MESSAGE_MAX = 2000;
const PLACEHOLDER_STYLE = "placeholder:text-muted-foreground/50";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

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

function ThankYou({ name, onReset }: { name?: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      role="status"
      className="mt-10 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-12 text-center"
    >
      <svg
        viewBox="0 0 52 52"
        className="h-20 w-20 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <motion.circle
          cx="26"
          cy="26"
          r="23"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.path
          d="M15 27l8 8 14-16"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        />
      </svg>

      <h3 className="text-2xl font-semibold tracking-tight">
        {name ? `Danke, ${name.split(" ")[0]}!` : "Danke!"}
      </h3>
      <p className="max-w-md text-muted-foreground">
        Deine Nachricht ist bei mir angekommen. Ich melde mich in der Regel{" "}
        {RESPONSE_TIME} bei dir.
      </p>

      <Button variant="outline" onClick={onReset} className="mt-2">
        Weitere Nachricht senden
      </Button>
    </motion.div>
  );
}

function ContactForm({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState(sendContactMessage, initialState);
  const values = state.values ?? emptyValues;
  const errors = state.errors ?? {};
  const [topicId, setTopicId] = useState(values.topic);
  const selectedTopic: ContactTopic | undefined = contactTopics.find(
    ({ id }) => id === topicId,
  );

  if (state.status === "success") {
    return <ThankYou name={state.values?.name} onReset={onReset} />;
  }

  return (
    <>
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
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              name="name"
              autoComplete="name"
              placeholder="Max Mustermann"
              defaultValue={values.name}
              minLength={2}
              required
              className={PLACEHOLDER_STYLE}
            />
            <FieldError id="contact-name-error" message={errors.name} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-email">E-Mail</Label>
            <Input
              id="contact-email"
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
              name="email"
              type="email"
              autoComplete="email"
              placeholder="max@mustermann.de"
              defaultValue={values.email}
              required
              className={PLACEHOLDER_STYLE}
            />
            <FieldError id="contact-email-error" message={errors.email} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-phone">
            Telefon{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>
          <Input
            id="contact-phone"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+49 170 1234567"
            defaultValue={values.phone}
            className={PLACEHOLDER_STYLE}
          />
          <FieldError id="contact-phone-error" message={errors.phone} />
        </div>

        <fieldset
          className="flex flex-col gap-2"
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? "contact-topic-error" : undefined}
        >
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
                  checked={topicId === topic.id}
                  onChange={() => setTopicId(topic.id)}
                  required={index === 0}
                  className="sr-only"
                />
                {topic.label}
              </label>
            ))}
          </div>
          <FieldError id="contact-topic-error" message={errors.topic} />
        </fieldset>

        <AnimatePresence initial={false} mode="wait">
          {selectedTopic?.fields ? (
            <motion.div
              key={selectedTopic.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="-m-1 overflow-hidden p-1"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {selectedTopic.fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <Label htmlFor={`contact-${field.name}`}>
                      {field.label}{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id={`contact-${field.name}`}
                      name={field.name}
                      placeholder={field.placeholder}
                      defaultValue={values[field.name] ?? ""}
                      maxLength={EXTRA_FIELD_MAX}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={
                        errors[field.name]
                          ? `contact-${field.name}-error`
                          : undefined
                      }
                      className={PLACEHOLDER_STYLE}
                    />
                    <FieldError
                      id={`contact-${field.name}-error`}
                      message={errors[field.name]}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-message">Nachricht</Label>
          <Textarea
            id="contact-message"
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            name="message"
            rows={6}
            minLength={10}
            maxLength={MESSAGE_MAX}
            placeholder="Hallo Denis, ich würde gern mit dir über … sprechen."
            defaultValue={values.message}
            required
            className={PLACEHOLDER_STYLE}
          />
          <FieldError id="contact-message-error" message={errors.message} />
        </div>

        {state.status === "error" ? (
          <Alert variant="destructive">
            <AlertTitle>Fehler</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        ) : null}

        <SubmitButton />
      </motion.form>
    </>
  );
}

export function ContactSection() {
  const [formKey, setFormKey] = useState(0);

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

      <ContactForm key={formKey} onReset={() => setFormKey((key) => key + 1)} />
    </section>
  );
}
