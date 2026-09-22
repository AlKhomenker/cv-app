import type { CSSProperties } from "react";
import { arrivalAt, emergeStyle } from "@/common/utils/emerge";

/**
 * How much scroll the rows take, in viewport heights.
 *
 * The last row is fully in by 0.54 of the way through, and the rest is the
 * reader looking at four lines and a button with nothing moving. That quiet is
 * the point of the section, not slack in it: this is the one part of the page
 * that asks for something rather than for attention.
 */
export const ROWS_DEPTH = 1.8;

/**
 * How many rows are in place before the reader has scrolled at all.
 *
 * One. The section's title arrives on `active` and the first row arrives
 * with it, carried by the section's own `Emerge` — a title over an empty
 * column reads as a section still loading rather than as one that has
 * arrived. The counting starts at the row underneath, and the whole
 * schedule is measured from there. It is what sections 4 and 6 already do.
 */
const FREE = 1;

/** Where the first COUNTED row starts, how far apart they are, and how long one takes. */
const FIRST = 0.06;
const APART = 0.1;
const SPAN = 0.18;

/**
 * How far one row has arrived, 0 to 1.
 *
 * It is a function of the reading position and of nothing else, which is the
 * whole of the behaviour asked for: a row that has arrived STAYS, because at
 * any greater progress the value is still 1, and scrolling back up retracts
 * them in reverse order for free, because row 3's window closes before row
 * 2's does. There is no accumulated state anywhere, and so nothing to get out
 * of step with the scroll.
 */
function rowArrival(index: number, progress: number): number {
  if (index < FREE) return 1;
  return arrivalAt(index - FREE, progress, FIRST, APART, SPAN);
}

/** Where the whole set of rows has got to, for the button that follows them. */
export function rowsDone(count: number, progress: number): number {
  return rowArrival(count - 1, progress);
}

/** One row, making the page's one entrance — see `common/utils/emerge.ts`. */
export function rowStyle(index: number, progress: number): CSSProperties {
  return emergeStyle(rowArrival(index, progress));
}
