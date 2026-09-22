/**
 * Where the closing section's dot is, and how far it has come apart, for the
 * one canvas that draws it.
 *
 * It is a module value rather than React state, for the reason
 * `Stage/utils/progress.ts` is one: it changes on every wheel event, and the
 * field sits under the header, the stage and the whole page below both. It is
 * not even a subscription, because nothing RE-RENDERS on it — the field's loop
 * is already running a frame at a time and simply reads it.
 *
 * There is one background canvas on the page, so there is one of these. The
 * section that writes it clears it when it leaves, and a `null` here is what
 * "paused when the section is off screen" comes to: no particle is touched.
 */

export interface Burst {
  /**
   * The dot's centre, in fractions of the VIEWPORT.
   *
   * The section knows where its own dot is on the screen and knows nothing
   * about the surface it will be drawn on — the canvas is overscanned and
   * drawn far below the viewport's resolution. `utils/paint.ts` is what
   * converts.
   */
  x: number;
  y: number;
  /** How far the dot has come apart, 0 to 1. */
  spread: number;
}

let burst: Burst | null = null;

/** Hand the field a dispersal to draw, or `null` to stop drawing one. */
export function setBurst(next: Burst | null): void {
  burst = next;
}

export function readBurst(): Burst | null {
  return burst;
}
