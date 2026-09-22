/** How far down the finger has to carry the panel for the swipe to finish it. */
const SWIPE_CLOSE = 120;

/**
 * How far the panel has been dragged, given where the finger started and
 * where it is.
 *
 * Downward only. A panel that followed a finger UPWARD would be a second
 * gesture with no meaning — there is nothing above the top of the screen for
 * it to go to — and clamping here is what lets the same expression run for
 * every frame of the drag without a direction test at the call site.
 */
export function dragOffset(from: number, to: number): number {
  return Math.max(0, to - from);
}

/** Whether the panel is far enough down that letting go should close it. */
export function passedClose(offset: number): boolean {
  return offset >= SWIPE_CLOSE;
}
