import type { CSSProperties } from "react";

export type IconName =
  | "check"
  | "chevron"
  | "close"
  | "mail"
  | "menu"
  | "phone"
  | "linkedin"
  | "pin"
  | "star"
  | "sun"
  | "moon";

const PATHS: Record<IconName, string> = {
  check: "M4.5 10.5l3.6 3.6 7.4-8.2",
  chevron: "M5 7.5l5 5 5-5",
  close: "M6 6l8 8M14 6l-8 8",
  mail: "M2.5 5.5h15v9h-15zM2.5 6l7.5 5 7.5-5",
  menu: "M3.5 6h13M3.5 10h13M3.5 14h13",
  phone:
    "M6.6 2.8L8.4 6 6.9 7.7c.9 2 2.4 3.5 4.4 4.4L13 10.6l3.2 1.8-.6 3c-.2.9-1 1.4-1.9 1.2C8.4 15.5 4.5 11.6 3.3 6.3c-.2-.9.3-1.7 1.2-1.9z",
  // Drawn rather than taken from the brand sheet: every glyph on this page is
  // one stroke weight in one 20x20 box, and a solid logo dropped in beside them
  // would be the only filled shape in the set. The two dots are zero-length
  // segments with a round cap, which is how a stroke-only icon gets a dot.
  linkedin: "M3.5 3.5h13v13h-13zM6.4 6.3v.01M6.4 9.3v5.2M9.8 14.5V9.3M9.8 11.4c0-1.2.9-2.1 2-2.1s2 .9 2 2.1v3.2",
  pin: "M10 17.4c3.4-3.6 5.1-6.3 5.1-8.2a5.1 5.1 0 10-10.2 0c0 1.9 1.7 4.6 5.1 8.2zM10 7.3a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2",
  star: "M10 1.8l2.5 5.1 5.6.8-4 3.9 1 5.6L10 14.6l-5.1 2.6 1-5.6-4-3.9 5.6-.8z",
  sun: "M10 6.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2M10 1.6v1.8M10 16.6v1.8M3.5 3.5l1.3 1.3M15.2 15.2l1.3 1.3M1.6 10h1.8M16.6 10h1.8M3.5 16.5l1.3-1.3M15.2 4.8l1.3-1.3",
  moon: "M15.8 12.7A6.6 6.6 0 017.3 4.2a6.6 6.6 0 108.5 8.5z"
};

interface IconProps {
  name: IconName;
  className?: string;
  /** For a glyph a section paces off the reading position — a counted star. */
  style?: CSSProperties;
  /** Marks a glyph that print has to force visible — see `useReveal`. */
  "data-mark"?: string;
}

/** Decoration only — every control that uses one carries its own name. */
export function Icon({ name, className, style, "data-mark": mark }: IconProps) {
  return (
    <svg className={className} style={style} data-mark={mark} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}
