import type { StageSection } from "../types";

/**
 * How far a section is scrolled through, in pixels, and how that is published.
 *
 * Most sections take one gesture and step. A section with a `depth` takes the
 * scroll instead: the gesture moves a value inside it, and only a gesture made
 * at either end of that value steps out. `depth` is written in viewport
 * heights, because what it really sets is a READING PACE — how long a reader
 * spends on the section — and that is a fraction of a screen, not a number of
 * pixels on one particular monitor.
 *
 * Under reduced motion there is no span at all, whatever a section asked for.
 * A pace paces an ANIMATION, and a section that is not animating lays its
 * content out as an ordinary column instead — four screens of scroll spent on
 * a picture that is not changing is four screens of scroll spent on nothing.
 * The column scrolls itself, which `utils/scrollers.ts` is what allows.
 */
export function spanOf(sections: readonly StageSection[], position: number, reduced: boolean): number {
  if (reduced) return 0;
  const depth = sections[position]?.depth ?? 0;
  if (depth <= 0) return 0;
  return depth * window.innerHeight;
}

/**
 * Where a gesture leaves the section's own travel.
 *
 * A gesture that runs past either end STOPS there rather than stepping: a
 * flick can finish the strip or leave the section, never both at once. Only a
 * gesture made when the travel is already at the end steps out, which is what
 * makes the last block sit still long enough to be read before the section
 * goes.
 */
export function nextTravel(from: number, delta: number, span: number): number {
  return Math.min(Math.max(from + delta, 0), span);
}

/** Whether a gesture from here is one that leaves the section rather than moves inside it. */
export function leaves(from: number, delta: number, span: number): boolean {
  if (delta > 0) return from >= span;
  return from <= 0;
}
