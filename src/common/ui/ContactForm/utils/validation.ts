import { z } from "zod";
import type { LocaleContent, ValidatedField } from "@/content";

export type FormValues = Record<string, string>;
export type ContactErrors = LocaleContent["contact"]["errors"];

/** A phone somebody can be called back on: +, digits, spaces, hyphens, brackets. */
const PHONE = /^[+(]?\d[\d\s()-]{5,}$/;

/**
 * A LinkedIn profile, not merely a URL. The protocol is optional because a
 * profile is more often copied out of the address bar than typed, and what
 * lands in the box is as likely to be `linkedin.com/in/…` as the full address.
 */
const LINKEDIN = /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/[^\s]+$/i;

const NAME_MIN = 2;
const COMPANY_MIN = 2;
const MESSAGE_MIN = 10;

/** The order the fields are asked in, which is the order a reader is sent back through them. */
const VALIDATED: readonly ValidatedField[] = ["name", "company", "phone", "linkedin", "message"];

/**
 * What the form accepts, as one schema.
 *
 * It is a function of the locale's error lines rather than a constant, because
 * the message a field carries is the reader's own language and there is no
 * second place to look it up from: the schema states both the rule and what to
 * say when it is broken, so the two cannot drift.
 *
 * Every value is trimmed before it is judged, so a box holding three spaces is
 * an empty box. `company` is required now — a recruiter without a company is a
 * message with nowhere to write back to — and `linkedin` is the one field that
 * may be left empty, which is why its rule is a refinement rather than a
 * pattern: it applies to what was typed, and says nothing about nothing.
 */
function contactSchema(errors: ContactErrors) {
  return z.object({
    name: z.string().trim().min(NAME_MIN, errors.name),
    company: z.string().trim().min(COMPANY_MIN, errors.company),
    phone: z.string().trim().regex(PHONE, errors.phone),
    linkedin: z
      .string()
      .trim()
      .refine((value) => value === "" || LINKEDIN.test(value), errors.linkedin),
    message: z.string().trim().min(MESSAGE_MIN, errors.message)
  });
}

/** One field and what is wrong with it, in the reader's language. */
export interface FieldIssue {
  field: ValidatedField;
  message: string;
}

/** What is wrong with one field right now, or null. Used by the blur check. */
export function fieldIssue(errors: ContactErrors, field: ValidatedField, value: string): string | null {
  const result = contactSchema(errors).shape[field].safeParse(value ?? "");
  return result.success ? null : (result.error.issues[0]?.message ?? "");
}

/** What the form sends once it is valid: the same fields, trimmed by the schema. */
export type ContactPayload = z.infer<ReturnType<typeof contactSchema>>;

/**
 * The whole form, judged at once — either what will be sent, or everything
 * that is wrong in the order the fields are asked for, so the first entry is
 * the field focus is sent to.
 *
 * The valid half hands back the SCHEMA'S values rather than the typed ones,
 * which is the point of parsing instead of merely checking: what reaches the
 * inbox is trimmed, and a name typed with a stray leading space does not
 * arrive with one.
 */
export type ContactResult = { ok: true; values: ContactPayload } | { ok: false; issues: FieldIssue[] };

export function parseContact(errors: ContactErrors, values: FormValues): ContactResult {
  const result = contactSchema(errors).safeParse(Object.fromEntries(VALIDATED.map((f) => [f, values[f] ?? ""])));
  if (result.success) return { ok: true, values: result.data };

  const messages = new Map<ValidatedField, string>();
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ValidatedField;
    if (!messages.has(field)) messages.set(field, issue.message);
  }
  const issues = VALIDATED.filter((field) => messages.has(field)).map((field) => ({
    field,
    message: messages.get(field) ?? ""
  }));
  return { ok: false, issues };
}
