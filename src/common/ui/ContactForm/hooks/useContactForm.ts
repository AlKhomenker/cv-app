import { type FormEvent, useCallback, useRef, useState } from "react";
import { FORM_ENDPOINT, SPAM_GUARD_MS } from "@/config";
import type { LocaleContent, ValidatedField } from "@/content";
import { useLocale } from "@/i18n";
import { mailtoHref } from "../utils/mailto";
import { type FormValues, fieldIssue, parseContact } from "../utils/validation";

type Status = "editing" | "sending" | "sent" | "failed" | "mailto";

const EMPTY: FormValues = { name: "", company: "", phone: "", linkedin: "", message: "" };

/**
 * The form's whole behaviour: what is typed, what is wrong, what is being
 * sent, and what happens when there is no endpoint to send it to.
 *
 * Spam is dropped without a word — a honeypot nobody can see, and anything
 * submitted within two seconds of the page opening. Both look like success,
 * so a robot learns nothing from the answer.
 */
export function useContactForm(content: LocaleContent["contact"]) {
  const { locale } = useLocale();
  const [values, setValues] = useState<FormValues>(EMPTY);
  // What is wrong, in the reader's language. The message is the schema's, so a
  // field cannot be marked wrong without one and cannot carry the wrong one.
  const [errors, setErrors] = useState<Partial<Record<ValidatedField, string>>>({});
  const [status, setStatus] = useState<Status>("editing");
  const [tried, setTried] = useState(false);
  const openedAt = useRef(Date.now());
  const honeypot = useRef("");
  const fieldRefs = useRef<Partial<Record<string, HTMLElement | null>>>({});

  const setValue = useCallback((name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  }, []);

  /** Checked on blur only once the reader has already pressed Save. */
  const checkOnBlur = useCallback(
    (name: string) => {
      if (!tried) return;
      const field = name as ValidatedField;
      if (!(field in EMPTY)) return;
      const message = fieldIssue(content.errors, field, values[field] ?? "");
      setErrors((current) => ({ ...current, [field]: message ?? undefined }));
    },
    [content.errors, tried, values]
  );

  const registerField = useCallback((name: string, node: HTMLElement | null) => {
    fieldRefs.current[name] = node;
  }, []);

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setTried(true);

      if (honeypot.current.trim() !== "" || Date.now() - openedAt.current < SPAM_GUARD_MS) {
        setStatus("sent");
        return;
      }

      const checked = parseContact(content.errors, values);
      if (!checked.ok) {
        setErrors(Object.fromEntries(checked.issues.map((issue) => [issue.field, issue.message])));
        fieldRefs.current[checked.issues[0].field]?.focus();
        return;
      }
      setErrors({});

      // What the schema gave back, not what is in the boxes: trimmed, and the
      // only shape anything downstream of here has to know about.
      const payload = checked.values;

      if (!FORM_ENDPOINT) {
        // Said once the reader has pressed Save, not before: nothing is
        // opening while they are still typing.
        setStatus("mailto");
        window.location.href = mailtoHref(content.fields, payload, content.mailtoSubject);
        return;
      }

      setStatus("sending");
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...payload, locale })
        });
        if (!response.ok) throw new Error(String(response.status));
        setStatus("sent");
      } catch {
        // Nothing typed is thrown away: the reader still has the mailto link.
        setStatus("failed");
      }
    },
    [content.errors, content.fields, content.mailtoSubject, locale, values]
  );

  return {
    values,
    errors,
    status,
    setValue,
    checkOnBlur,
    registerField,
    setHoneypot: (value: string) => {
      honeypot.current = value;
    },
    submit,
    mailto: () => mailtoHref(content.fields, values, content.mailtoSubject)
  };
}
