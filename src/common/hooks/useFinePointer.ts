import { useMediaQuery } from "./useMediaQuery";

/**
 * True when the reader is pointing with something that can hover and can be
 * put on one pixel — a mouse or a trackpad, rather than a finger.
 *
 * It answers what the reader is DOING and not how wide their screen is. A
 * phone held sideways is a wide screen with no cursor on it, and a laptop
 * window dragged narrow is a small screen with one; a hint that said "drag" to
 * the first and "touch" to the second would be wrong in both directions.
 */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
