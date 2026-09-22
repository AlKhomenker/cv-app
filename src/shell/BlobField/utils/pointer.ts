/** How much of the remaining distance the stored pointer covers each frame. */
const POINTER_EASE = 0.11;

/** How far the nearest blob leans, in canvas pixels at the drawing resolution. */
export const POINTER_REACH = 0.07;

export function ease(current: number, target: number, factor = POINTER_EASE): number {
  return current + (target - current) * factor;
}

/**
 * A mouse, not a finger. Touch gets the pulse and nothing else: there is no
 * pointer to lean towards, and a lean that fired on every tap would read as
 * the page twitching.
 */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
