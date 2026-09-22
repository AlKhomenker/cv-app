import { CONTACT_EMAIL } from "@/config";
import type { FormField } from "@/content";
import type { FormValues } from "./validation";

/**
 * The fallback that needs no service at all: the reader's own mail app, with
 * everything they typed already in it.
 */
export function mailtoHref(fields: FormField[], values: FormValues, subject: string): string {
  const body = fields.map((field) => `${field.label}: ${values[field.name] ?? ""}`).join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
