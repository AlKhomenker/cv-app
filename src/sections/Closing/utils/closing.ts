import type { CSSProperties } from "react";

/**
 * How much scroll the closing takes, in viewport heights.
 *
 * Two of them, and the shape of the section is the reason. The first third is
 * the dot holding still while two lines are read; the rest is the dispersal,
 * which is the one thing on the page that has nowhere to arrive — it simply
 * stops being distinguishable from the background. A dispersal given half a
 * screen reads as something that broke. Given two, it reads as something
 * letting go.
 *
 * Nothing follows it. What this number paces is the end of the page, not the
 * gap before the next thing.
 */
export const CLOSING_DEPTH = 2;

/** How long the point holds still before it comes apart. */
const HOLD = 1 / 3;

/** When the two controls start to grow, and how much bigger they end up. */
const EXITS = 2 / 3;
const GROWTH = 0.15;

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}

/**
 * How far the dot has come apart, 0 to 1.
 *
 * Nought through the first third, then the whole of the dispersal. It is a
 * function of the reading position and of nothing else, which is what lets the
 * reader scroll back up and watch the blobs gather into the dot along the
 * identical path: there is no entrance and no exit to keep in step, only one
 * number read in both directions.
 */
export function spreadAt(progress: number): number {
  return clamp((progress - HOLD) / (1 - HOLD), 0, 1);
}

/**
 * The two controls over the last third: bigger, and nothing else.
 *
 * The growing is on the ROW, not on the buttons — the buttons are the
 * opening's own two, unchanged, and a size the end of the page asks for is
 * the end of the page's business. Under reduced motion they are simply there,
 * at their full size, from the first frame.
 */
export function exitStyle(progress: number, reduced: boolean): CSSProperties {
  return {
    scale: (1 + GROWTH * exitAt(progress, reduced)).toFixed(4)
  } as CSSProperties;
}

/** How far into the last third the reader is — what the growing answers to. */
function exitAt(progress: number, reduced: boolean): number {
  if (reduced) return 1;
  return clamp((progress - EXITS) / (1 - EXITS), 0, 1);
}
