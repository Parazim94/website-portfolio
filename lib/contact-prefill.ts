export const CONTACT_PREFILL_EVENT = "contact:prefill";

export interface ContactPrefill {
  topic: string;
  message: string;
}

// Füllt das Kontaktformular vor und springt dorthin.
export function prefillContact(prefill: ContactPrefill) {
  window.dispatchEvent(
    new CustomEvent<ContactPrefill>(CONTACT_PREFILL_EVENT, { detail: prefill }),
  );
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}
