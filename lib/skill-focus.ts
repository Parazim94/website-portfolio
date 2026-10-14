export const SKILL_FOCUS_EVENT = "skill:focus";

// Springt zum Skills-Bereich und wählt dort den Skill aus.
export function focusSkill(skill: string) {
  window.dispatchEvent(new CustomEvent(SKILL_FOCUS_EVENT, { detail: skill }));
  document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
}
