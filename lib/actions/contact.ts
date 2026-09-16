"use server";

import { Resend } from "resend";

import { siteConfig } from "@/lib/site-config";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    name.trim().length < 2 ||
    !EMAIL_PATTERN.test(email) ||
    message.trim().length < 10
  ) {
    return {
      status: "error",
      message: "Bitte fülle alle Felder gültig aus (Nachricht mind. 10 Zeichen).",
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

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Kontaktformular <${siteConfig.contactFromAddress}>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `Neue Nachricht von ${name}`,
      text: message,
    });

    if (error) {
      return {
        status: "error",
        message:
          "Die Nachricht konnte nicht gesendet werden. Bitte versuch es später erneut.",
      };
    }
  } catch {
    return {
      status: "error",
      message:
        "Die Nachricht konnte nicht gesendet werden. Bitte versuch es später erneut.",
    };
  }

  return {
    status: "success",
    message: "Danke für deine Nachricht! Ich melde mich so schnell wie möglich.",
  };
}
