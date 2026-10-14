"use server";

import { Resend } from "resend";

import { contactTopics, PHONE_PATTERN } from "@/lib/contact-topics";
import { siteConfig } from "@/lib/site-config";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  values?: Record<"name" | "email" | "phone" | "topic" | "message", string>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
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
      subject: `[${topic.label}] Neue Nachricht von ${name}`,
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

  return {
    status: "success",
    message: "Danke für deine Nachricht! Ich melde mich so schnell wie möglich.",
  };
}
