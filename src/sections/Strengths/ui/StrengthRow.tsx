import type { CSSProperties } from "react";
import type { Strength } from "@/content";
import { Stars } from "./Stars";

export interface StrengthRowProps {
  strength: Strength;
  /** Which row this is, which is what sets when its marks are counted in. */
  index: number;
  /** The reader's place in the section, 0 to 1, or 1 with motion turned off. */
  at: number;
  /** Where the row itself has got to — see `utils/arrival.ts`. */
  style: CSSProperties;
  /** The whole row in one sentence, for a reader who cannot see the marks. */
  label: string;
}

/**
 * One strength: what it is, how it scored, and the number in figures.
 *
 * Three ways of saying one thing, and all three are wanted. The stars are read
 * at a glance, the figure is read when the glance was not enough, and the
 * sentence on the stars is what a screen reader is given — it hears one
 * sentence rather than five marks.
 *
 * The figure is tabular so that eight of them down the page line up, and it is
 * `dir="ltr"` because `4/5` is a number and not a phrase.
 *
 * The label wraps rather than truncating. "Code review and attention to
 * detail" does not fit one line on a phone, and a strength cut off at the
 * elbow is worse than a strength on two lines — the stars stay centred against
 * whatever height it takes.
 */
export function StrengthRow({ strength, index, at, style, label }: StrengthRowProps) {
  return (
    <li className="flex origin-center items-center gap-3" style={style}>
      <span className="min-w-0 flex-1 text-start text-ink">{strength.label}</span>
      <Stars rating={strength.rating} index={index} at={at} label={label} />
      <span className="w-[3ch] flex-none text-end text-soft [font-variant-numeric:tabular-nums]" dir="ltr">
        {strength.rating}/5
      </span>
    </li>
  );
}
