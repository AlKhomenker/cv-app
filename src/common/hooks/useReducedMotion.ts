import { useMediaQuery } from "./useMediaQuery";

/** True while the reader has asked for less movement. Follows a change. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
