import type { CSSProperties } from "react";

/**
 * How much scroll the whole strip takes, in viewport heights.
 *
 * It is a reading pace, not a distance. Four blocks over a little more than
 * two screens leaves each one at the reading line long enough to be read once
 * at a normal pace, and no longer than that.
 */
export const READING_DEPTH = 2.2;

/**
 * How much of a block's turn is spent still, before the strip carries it on.
 *
 * Without it the text is never once at rest: a reader scrolling steadily would
 * be reading a sentence that is always sliding. With it, most of each turn is
 * a block sitting at the reading line and the rest is the change.
 */
const DWELL = 0.42;

/** What a block has shrunk to by the time it is a whole step off the line. */
const FAR_SCALE = 0.82;

/** How far a block is out of focus at that same distance, in pixels. */
const FAR_BLUR = 2;

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}

/**
 * Which block is at the reading line, as a position along the strip: 0 is the
 * first block at the line, 1 the second, and the fractions in between are the
 * strip on its way from one to the next.
 */
export function readingLine(progress: number, count: number): number {
  const steps = Math.max(1, count - 1);
  const scaled = clamp(progress, 0, 1) * steps;
  const passed = Math.min(Math.floor(scaled), steps - 1);
  return passed + carry(scaled - passed);
}

/** One block's turn: still, then eased on to the next, ending exactly on it. */
function carry(turn: number): number {
  if (turn <= DWELL) return 0;
  const moving = (turn - DWELL) / (1 - DWELL);
  return moving * moving * (3 - 2 * moving);
}

/**
 * Where one block sits and how solid it is.
 *
 * Distance from the reading line is the only input, and it is signed, so the
 * same expression describes a block dissolving upward and one arriving from
 * below. That is what makes scrolling back up run the states backwards rather
 * than play a second animation.
 *
 * Nothing at all under reduced motion: the blocks are laid out as an ordinary
 * column by the stylesheet, and an inline style here would win over it.
 */
export function blockStyle(position: number, line: number, reduced: boolean): CSSProperties | undefined {
  if (reduced) return undefined;

  const distance = position - line;
  const away = Math.min(Math.abs(distance), 1);

  // Custom properties, which `CSSProperties` has no room for. The cast is the
  // whole of the claim: the stylesheet is what turns these into a position,
  // because the step between two blocks is a length and belongs with the rest
  // of the layout rather than in a number computed here.
  return {
    "--away": distance,
    "--scale": 1 - (1 - FAR_SCALE) * away,
    "--fade": 1 - away,
    "--haze": `${(FAR_BLUR * away).toFixed(2)}px`
  } as CSSProperties;
}
