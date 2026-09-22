import type { CSSProperties } from "react";
import { arrivalAt, emergeStyle } from "@/common/utils/emerge";
import type { Topic } from "./topics";

/**
 * How much scroll the section takes, in viewport heights.
 *
 * The last badge is in by about two thirds of the way through, and the rest is
 * the reader looking at five finished rows with nothing moving. Two screens is
 * a reading pace rather than a distance, which is why it is written in screens
 * and not in pixels.
 */
export const SKILLS_DEPTH = 2;

/** Where the first staggered badge starts, how far apart two are, and how long one takes. */
const FIRST = 0.04;
const APART = 0.0125;
const SPAN = 0.1;

/**
 * How far ahead of its first badge a heading arrives, in badge steps.
 *
 * A row's name has to be readable before its badges land under it, or the
 * reader is reading a colour and waiting to be told what it meant.
 */
const LEAD = 2;

/**
 * How many badges are in place before the reader has scrolled at all: the
 * whole of the first row, its heading included.
 *
 * The section's title arrives on `active`, and a title over an empty column
 * reads as a section still loading rather than as one that has arrived. The
 * first row comes in WITH it, carried by the section's own `Emerge` — which
 * is what "at the same time" means here, since the two answer different cues
 * — and the stagger starts at the row underneath.
 */
export function freeOf(topics: readonly Topic[]): number {
  return topics[0]?.skills.length ?? 0;
}

/**
 * One badge, making the page's one entrance — see `common/utils/emerge.ts`.
 *
 * `free` is what the first row costs the schedule: those badges are already
 * there, and every badge after them counts from the first one that is not.
 */
export function badgeStyle(order: number, free: number, progress: number): CSSProperties {
  if (order < free) return emergeStyle(1);
  return emergeStyle(arrivalAt(order - free, progress, FIRST, APART, SPAN));
}

/**
 * A row's heading, which comes in a couple of badges ahead of its own row —
 * except the first, which is there from the first frame with its badges.
 */
export function headingStyle(order: number, free: number, progress: number): CSSProperties {
  if (order < free) return emergeStyle(1);
  return emergeStyle(arrivalAt(order - free - LEAD, progress, FIRST, APART, SPAN));
}

/**
 * How far through the section the rows have finished panning.
 *
 * Just past the last badge's own arrival. The pan exists to reach rows a short
 * screen cannot show at once, so it must not carry a row up to the reading
 * area before the badges in it have appeared — and it must be over by the time
 * the section stops changing, or the reader is left scrolling a finished
 * picture.
 */
const PAN_END = 0.62;

/**
 * How much of the hidden rows the reader has pulled into view, 0 to 1.
 *
 * The section is sized to a pinned screen and a phone held upright is not one:
 * five rows of badges are about a hundred and fifty pixels taller than a
 * 667-pixel screen has room for, and with the stage holding the scroll those
 * last badges were not merely below the fold, they were unreachable. So the
 * rows travel under the title as the reader moves through the section — the
 * same gesture, the same reading position, and on a screen with room for all
 * five nothing moves at all, because there is nothing hidden to move.
 */
export function panAt(progress: number): number {
  return Math.min(Math.max(progress / PAN_END, 0), 1);
}
