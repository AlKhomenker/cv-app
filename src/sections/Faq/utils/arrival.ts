import type { CSSProperties } from "react";
import { arrivalAt, emergeStyle } from "@/common/utils/emerge";

/**
 * How much scroll the section takes, in viewport heights.
 *
 * The last question is in by a little over half of it, and the rest is the
 * reader looking at the list and opening the ones they want. That quiet is
 * the point of the section rather than slack in it: this is the part of the
 * page that answers rather than presents, and a reader reading an answer must
 * not be moving the section while they do it.
 */
export const FAQ_DEPTH = 1.8;

/**
 * How many questions are in place before the reader has scrolled at all.
 *
 * One. The section's title arrives on `active` and the first question arrives
 * with it, carried by the section's own `Emerge` — a title over an empty
 * column reads as a section still loading rather than as one that has
 * arrived. The counting starts at the question underneath, and the whole
 * schedule is measured from there. It is what sections 4 and 6 already do.
 */
const FREE = 1;

/** Where the first COUNTED question starts, how long one takes, and where the last is in by. */
const FIRST = 0.05;
const SPAN = 0.13;
const SETTLED = 0.55;

/**
 * How far behind the one above it a question follows.
 *
 * It is counted from the length of the list rather than fixed, because the
 * list is CONTENT and grows: at a fixed 0.06 apart, adding five questions
 * moved the last arrival from 0.49 to 0.84 of the section and took the quiet
 * half the section exists for down to a sixth of it. Spacing them so the last
 * one lands at `SETTLED` keeps the shape whatever the content does — and at
 * the seven questions this was written for it gives back the 0.06 it replaced.
 */
const apart = (count: number) => (count > 1 ? Math.max((SETTLED - FIRST - SPAN) / (count - 1), 0) : 0);

/**
 * One question, arriving out of its own centre behind the one above it.
 *
 * The first {@link FREE} are not counted in at all: they are there from the
 * first frame, with the title — and they are off the spacing as well, since
 * what has to be spread over the section is the questions that are left.
 */
export function questionStyle(index: number, count: number, progress: number): CSSProperties {
  if (index < FREE) return emergeStyle(1);
  return emergeStyle(arrivalAt(index - FREE, progress, FIRST, apart(count - FREE), SPAN));
}
