import type { CSSProperties } from "react";
import { Badge as Pill } from "@/components/ui/badge";
import type { Skill } from "../utils/topics";

export interface BadgeProps {
  skill: Skill;
  style: CSSProperties;
  lit: boolean;
}

/** One tool, as a small piece of tinted glass with a mark on it. See `../README.md`. */
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
