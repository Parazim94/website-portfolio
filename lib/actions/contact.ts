"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import {
  contactTopics,
  EXTRA_FIELD_MAX,
  PHONE_PATTERN,
  type ContactTopic,
} from "@/lib/contact-topics";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n";
import { getUi } from "@/lib/i18n/ui";
import { siteConfig } from "@/lib/site-config";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  values?: Record<string, string>;
  errors?: Record<string, string>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
// Pro Server-Instanz im Speicher: bremst Missbrauch, ersetzt aber kein verteiltes Limit.
const submissions = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(key, recent);
    return true;
  }

  submissions.set(key, [...recent, now]);

  if (submissions.size > 1000) {
    for (const [entry, times] of submissions) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        submissions.delete(entry);
      }
    }
  }

  return false;
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const requestedLocale = formData.get("locale");
  const locale: Locale =
    typeof requestedLocale === "string" && hasLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;
  const ui = getUi(locale);
  const text = ui.contact;

  // Honeypot: Menschen sehen das Feld nicht, Bots füllen es aus.
  if (formData.get("website")) {
    return { status: "success", message: text.success };
  }

  const read = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  const values: Record<string, string> = {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    topic: read("topic"),
    message: read("message"),
  };
  const topic: ContactTopic | undefined = contactTopics.find(
    ({ id }) => id === values.topic,
  );
  const extraFields = topic?.fields ?? [];

  for (const field of extraFields) {
    values[field.name] = read(field.name);
  }

  const errors: Record<string, string> = {};

  for (const field of extraFields) {
    if (values[field.name].length > EXTRA_FIELD_MAX) {
      errors[field.name] = text.errors.fieldLong(
        field.label[locale],
        EXTRA_FIELD_MAX,
      );
    }
  }

  if (values.name.length < 2) {
    errors.name = text.errors.name;
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = text.errors.email;
  }
  if (values.phone !== "" && !PHONE_PATTERN.test(values.phone)) {
    errors.phone = text.errors.phone;
  }
  if (!topic) {
    errors.topic = text.errors.topic;
  }
  if (values.message.length < 10) {
    errors.message = text.errors.messageShort(values.message.length);
  }

  if (!topic || Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: text.errors.invalid,
      values,
      errors,
    };
  }

  const requestHeaders = await headers();
  const clientIp =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(clientIp)) {
    return {
      status: "error",
      message: text.errors.rateLimit,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      status: "error",
      message: text.errors.notConfigured,
    };
  }

  const resend = new Resend(apiKey);
  const { name, email, phone, message } = values;
  const emailBody = [
    `Von: ${name} <${email}>`,
    `Telefon: ${phone || "–"}`,
    `Thema: ${topic.label.de}`,
    `Sprache der Seite: ${locale}`,
    ...extraFields
      .filter((field) => values[field.name])
      .map((field) => `${field.label.de}: ${values[field.name]}`),
    "",
    message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Kontaktformular <${siteConfig.contactFromAddress}>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `[${topic.label.de}] Neue Nachricht von ${name.replace(/\s+/g, " ")}`,
      text: emailBody,
    });

    if (error) {
      return {
        status: "error",
        message: text.errors.sendFailed,
        values,
      };
    }
  } catch {
    return {
      status: "error",
      message: text.errors.sendFailed,
      values,
    };
  }

  // Bestätigung an den Absender: Ein Fehler hier soll den Erfolg nicht kippen.
  try {
    await resend.emails.send({
      from: `${siteConfig.name} <${siteConfig.contactFromAddress}>`,
      to: email,
      replyTo: siteConfig.email,
      subject: text.confirmation.subject,
      text: [
        text.confirmation.greeting(name.replace(/\s+/g, " ")),
        "",
        text.confirmation.body(topic.label[locale]),
        "",
        text.confirmation.reminder,
        "",
        message
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n"),
        "",
        text.confirmation.regards,
        siteConfig.name,
        "",
        text.confirmation.automatic,
      ].join("\n"),
    });
  } catch {}

  return {
    status: "success",
    message: text.success,
    values: { name },
  };
}
