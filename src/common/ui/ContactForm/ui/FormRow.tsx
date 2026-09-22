import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { InputHTMLAttributes } from "react";
import type { FormField } from "@/content";

/**
 * What a required field is marked with, and the only mark a label carries: an
 * optional one is left bare, so the reader counts the marks rather than
 * reading every label to find out which boxes they are allowed to skip.
 *
 * One symbol, the same in both languages, which is why it is here and not in
 * the locales — there is nothing to translate about it, and two copies of a
 * punctuation mark are two things that can disagree.
 *
 * It is `aria-hidden`, and that is not the same as hiding the fact: a screen
 * reader is told properly by `aria-required` on the BOX, in the reader's own
 * language and at the moment they reach it. Read aloud this is "left paren
 * star right paren" on every other label, which says nothing and is heard
 * five times.
 */
const REQUIRED_MARK = "*";

export interface FormRowProps {
  field: FormField;
  value: string;
  /**
   * What is wrong, in the reader's language, and empty while nothing is. The
   * schema in `utils/validation.ts` wrote it, so there is no second answer
   * here about whether the field is wrong — the message being there IS that.
   */
  error: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  onNode: (name: string, node: HTMLElement | null) => void;
}

/**
 * One field, with its label above it and its error under it.
 *
 * The three pieces are shadcn's `Label`, `Input` and `Textarea` — the box, its
 * focus ring and its invalid state are the component's now, and the class
 * constant this file used to carry is gone. What stays here is the only part
 * that is this form's own: which of the two boxes a field wants, and where its
 * error sits.
 *
 * The label is always drawn and is never the placeholder. A placeholder
 * disappears the moment anybody types into it, which leaves a reader who looks
 * away mid-form with five boxes and no idea what any of them wanted. It
 * carries {@link REQUIRED_MARK} when the field is one that has to be filled —
 * `field.required` says so, and the RULE behind it lives in
 * `utils/validation.ts`, which is the one that decides whether a value passes.
 *
 * The error is in the document whether or not there is one, and fades. A
 * paragraph that appears pushes every field below it down the screen while the
 * reader is looking at the one above; one that was always there does not.
 */
export function FormRow({ field, value, error, onChange, onBlur, onNode }: FormRowProps) {
  const id = `contact-${field.name}`;
  const invalid = error !== "";
  const shared = {
    id,
    name: field.name,
    value,
    "aria-invalid": invalid || undefined,
    "aria-required": field.required || undefined,
    "aria-describedby": invalid ? `${id}-error` : undefined,
    onBlur: () => onBlur(field.name),
    onChange: (event: { target: { value: string } }) => onChange(field.name, event.target.value)
  };

  return (
    <div className="grid gap-1.5">
      <Label className="text-[0.92rem] text-ink" htmlFor={id}>
        {field.label}
        {field.required && (
          <span className="text-accent" aria-hidden="true">
            {REQUIRED_MARK}
          </span>
        )}
      </Label>

      {field.type === "textarea" ? (
        <Textarea {...shared} rows={field.rows ?? 4} ref={(node) => onNode(field.name, node)} />
      ) : (
        <Input
          {...shared}
          type={field.type}
          inputMode={field.inputmode as InputHTMLAttributes<HTMLInputElement>["inputMode"]}
          autoComplete={field.autocomplete}
          ref={(node) => onNode(field.name, node)}
        />
      )}

      <p
        className="min-h-0 text-[0.86rem] text-warn opacity-0
          transition-opacity duration-(--dur-fast) ease-page shown:opacity-100"
        id={`${id}-error`}
        data-shown={invalid}>
        {error}
      </p>
    </div>
  );
}
