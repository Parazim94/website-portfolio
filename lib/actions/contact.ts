"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { contactTopics, PHONE_PATTERN } from "@/lib/contact-topics";
import { siteConfig } from "@/lib/site-config";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  values?: Record<"name" | "email" | "phone" | "topic" | "message", string>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const SUCCESS_MESSAGE =
  "Danke für deine Nachricht! Ich melde mich so schnell wie möglich.";

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
  // Honeypot: Menschen sehen das Feld nicht, Bots füllen es aus.
  if (formData.get("website")) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const read = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  const values = {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    topic: read("topic"),
    message: read("message"),
  };
  const topic = contactTopics.find(({ id }) => id === values.topic);

  if (
    values.name.length < 2 ||
    !EMAIL_PATTERN.test(values.email) ||
    (values.phone !== "" && !PHONE_PATTERN.test(values.phone)) ||
    !topic ||
    values.message.length < 10
  ) {
    return {
      status: "error",
      message:
        "Bitte prüfe deine Angaben: Name, gültige E-Mail, Thema und eine Nachricht mit mind. 10 Zeichen sind nötig. Die Telefonnummer ist optional, muss aber gültig sein.",
      values,
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
      message:
        "Du hast gerade mehrere Nachrichten gesendet. Bitte warte ein paar Minuten oder schreib mir direkt per E-Mail.",
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      status: "error",
      message:
        "E-Mail-Versand ist aktuell nicht konfiguriert. Bitte kontaktiere mich direkt per E-Mail.",
    };
  }

  const resend = new Resend(apiKey);
  const { name, email, phone, message } = values;
  const emailBody = [
    `Von: ${name} <${email}>`,
    `Telefon: ${phone || "–"}`,
    `Thema: ${topic.label}`,
    "",
    message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Kontaktformular <${siteConfig.contactFromAddress}>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `[${topic.label}] Neue Nachricht von ${name.replace(/\s+/g, " ")}`,
      text: emailBody,
    });

    if (error) {
      return {
        status: "error",
        message:
          "Die Nachricht konnte nicht gesendet werden. Bitte versuch es später erneut.",
        values,
      };
    }
  } catch {
    return {
      status: "error",
      message:
        "Die Nachricht konnte nicht gesendet werden. Bitte versuch es später erneut.",
      values,
    };
  }

  // Bestätigung an den Absender: Ein Fehler hier soll den Erfolg nicht kippen.
  try {
    await resend.emails.send({
      from: `${siteConfig.name} <${siteConfig.contactFromAddress}>`,
      to: email,
      replyTo: siteConfig.email,
      subject: "Deine Nachricht ist angekommen",
      text: [
        `Hallo ${name.replace(/\s+/g, " ")},`,
        "",
        `danke für deine Nachricht zum Thema „${topic.label}“. Ich habe sie erhalten und melde mich so schnell wie möglich bei dir.`,
        "",
        "Zur Erinnerung, das hast du geschrieben:",
        "",
        message
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n"),
        "",
        "Viele Grüße",
        siteConfig.name,
        "",
        "Diese Nachricht wurde automatisch versendet. Du kannst direkt darauf antworten.",
      ].join("\n"),
    });
  } catch {}

  return { status: "success", message: SUCCESS_MESSAGE };
}
