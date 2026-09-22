import type { CSSProperties } from "react";
import { arrivalAt, emergeStyle } from "@/common/utils/emerge";

/**
 * How much scroll the section takes, in viewport heights.
 *
 * Eight rows and thirty-eight stars arrive over the first two thirds of it,
 * the languages land behind them, and the rest is the finished section with
 * nothing moving. Two screens is a reading pace rather than a distance, which
 * is why it is written in screens.
 */
export const STRENGTHS_DEPTH = 2;

/**
 * How many rows are in place before the reader has scrolled at all.
 *
 * One. The section's title arrives on `active` and the first strength arrives
 * with it, carried by the section's own `Emerge` — a title over an empty
 * column reads as a section still loading rather than as one that has
 * arrived. The counting starts at the row underneath, and the whole schedule
 * is measured from there.
 */
const FREE = 1;

/** Where the first COUNTED row starts, how far apart two are, and how long one takes. */
const FIRST = 0.05;
const APART = 0.055;
const SPAN = 0.12;

/**
 * How far into its own row one star follows the one before it.
 *
 * Small enough that the five of them land inside the window the row itself
 * arrives in: a rating is one fact counted out, not five facts. The whole hand
 * takes about a twentieth of the section, which is fast enough to read as
 * counting and slow enough to be counted.
 */
const PER_STAR = 0.012;

/** The beat between a row and the languages that follow the last of them. */
const AFTER = 0.06;

/**
 * One strength's row, arriving as a whole: its label, its stars and its score.
 *
 * The first {@link FREE} rows are not counted in at all — they are there from
 * the first frame, with the title.
 */
export function rowStyle(index: number, progress: number): CSSProperties {
  if (index < FREE) return emergeStyle(1);
  return emergeStyle(arrivalAt(index - FREE, progress, FIRST, APART, SPAN));
}

/**
 * One earned star, arriving after the one before it.
 *
 * The marks are counted out WITHIN the row's own arrival rather than after it.
 * The row is what carries the label into place; the stars fill in behind it
 * the way a score is read off, and because the two entrances are nested the
 * scales and the opacities multiply — a star that has not been counted yet is
 * inside a row that has not fully arrived either.
 *
 * A star in one of the first {@link FREE} rows is not counted in either: that
 * row arrives whole, with the title above it.
 *
 * An UNEARNED mark gets no style at all. It is the outline that says how many
 * there could have been, and it is there from the first frame, or a row of
 * four arrives looking like a row of five.
 */
export function starStyle(index: number, mark: number, progress: number): CSSProperties {
  if (index < FREE) return emergeStyle(1);
  return emergeStyle(arrivalAt(index - FREE, progress, FIRST + mark * PER_STAR, APART, SPAN));
}

/** Where the rows have got to, for the languages that come in behind them. */
export function tailStyle(count: number, progress: number): CSSProperties {
  return emergeStyle(arrivalAt(Math.max(count - FREE - 1, 0), progress, FIRST + AFTER, APART, SPAN));
}
