import type { CSSProperties } from "react";
import { Badge as Pill } from "@/components/ui/badge";
import type { Skill } from "../utils/topics";

export interface BadgeProps {
  skill: Skill;
  /** Where it has got to as the reader scrolls — see `utils/arrival.ts`. */
  style: CSSProperties;
  /**
   * Whether the combobox above has this tool lit.
   *
   * False is a tool the reader did not ask about, not a tool that is missing:
   * it goes grey and stays exactly where it is. Nothing is removed, because a
   * row that reflowed as the choice changed would move the badge the reader is
   * reading out from under them — and what a person does NOT list is part of
   * what the list says.
   */
  lit: boolean;
}

/**
 * One tool, as a small piece of tinted glass with a mark on it.
 *
 * It is a piece of the document and not a control. It used to be a button that
 * chose a category, which only made sense while the categories were five
 * clouds of colour with their names kept somewhere else; the names are now the
 * headings the badges sit under, so there is nothing left for a press to say.
 * A thing that looks pressable and does nothing is worse than a thing that
 * plainly is not.
 *
 * The surface is the shared `Badge` on its `topic` variant, which spends
 * `--wash` and `--line` — set by the row above, which carries the topic's id.
 * This file knows nothing about which of the five hues it is drawn in.
 *
 * The mark is the first two letters of the name and is `aria-hidden`: it says
 * nothing the name beside it does not, and two letters read out before every
 * tool would be forty-two pieces of noise.
 */
export function Badge({ skill, style, lit }: BadgeProps) {
  return (
    <Pill
      asChild
      variant="topic"
      className="max-w-full origin-center gap-1 px-1.5 py-0.75 leading-none
        shadow-[inset_0_1px_0_var(--glass-edge)]
        transition-[filter,color,background-color,border-color] duration-(--dur) ease-page
        data-[lit=false]:[filter:grayscale(1)_opacity(0.42)]
        md:gap-1.5 md:px-2.5 md:py-1.5">
      <li style={style} data-lit={lit}>
        <span
          className="grid size-3.25 flex-none place-items-center rounded-full
            text-[0.46rem] font-bold tracking-tight text-page
            bg-(--hue) md:size-4.5 md:text-[0.58rem]"
          aria-hidden="true">
          {skill.mark}
        </span>
        <span className="truncate" dir="ltr">
          {skill.name}
        </span>
      </li>
    </Pill>
  );
}
