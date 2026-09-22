import type { CSSProperties } from "react";
import { arrivalAt, emergeStyle } from "@/common/utils/emerge";

/**
 * How much scroll the section takes, in viewport heights.
 *
 * The last card is in by about half of it, and the rest is four people the
 * reader can look at and follow. The same shape as the questions and the
 * contacts, for the same reason: this is a section that hands something over
 * rather than one that presents, and a reader deciding whether to open a
 * profile must not be moving the section while they decide.
 */
export const PEOPLE_DEPTH = 1.8;

/**
 * How many cards are in place before the reader has scrolled at all.
 *
 * One. The section's title arrives on `active` and the first card arrives
 * with it, carried by the section's own `Emerge` — a title over an empty
 * column reads as a section still loading rather than as one that has
 * arrived. The counting starts at the card underneath, and the whole
 * schedule is measured from there. It is what sections 4 and 6 already do.
 */
const FREE = 1;

/** Where the first COUNTED card starts, how far apart two are, and how long one takes. */
const FIRST = 0.06;
const APART = 0.09;
const SPAN = 0.16;

/**
 * One card, making the page's one entrance — see `common/utils/emerge.ts`.
 *
 * The first {@link FREE} are not counted in at all: they are there from the
 * first frame, with the title.
 */
export function cardStyle(index: number, progress: number): CSSProperties {
  if (index < FREE) return emergeStyle(1);
  return emergeStyle(arrivalAt(index - FREE, progress, FIRST, APART, SPAN));
}
