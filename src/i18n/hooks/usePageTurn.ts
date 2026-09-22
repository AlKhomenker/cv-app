import { useCallback, useRef } from "react";
import { motionMs } from "@/common/utils/motionTokens";
import type { Direction } from "@/content";

/** Which way 8px is, for a page that reads in this direction. */
function offset(direction: Direction): string {
  return direction === "rtl" ? "8px" : "-8px";
}

/**
 * The page turning over when the language changes.
 *
 * Three beats, and the middle one is the whole trick: the content leaves
 * toward the side the OLD direction reads from, the language, the direction
 * and every string change **while nothing is visible**, and the content comes
 * back from the new leading side. The mirror is therefore never seen
 * happening — which is why this is not a 3D rotation. A rotateY would
 * rasterise the whole document into one layer, blur the text for half a
 * second, and read as a trick played on a CV.
 */
export function usePageTurn() {
  const turning = useRef(false);

  return useCallback((from: Direction, to: Direction, swap: () => void) => {
    if (turning.current) return;
    turning.current = true;

    const root = document.documentElement;
    root.style.setProperty("--flip-x", offset(from));
    document.body.dataset.flip = "out";

    window.setTimeout(() => {
      const y = window.scrollY;
      root.style.setProperty("--flip-x", offset(to));
      document.body.dataset.flip = "in";
      swap();

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          window.scrollTo({ top: y, behavior: "instant" });
          delete document.body.dataset.flip;
          turning.current = false;
        })
      );
    }, motionMs("--dur-fast"));
  }, []);
}
