import { useEffect, useState } from "react";

/**
 * False for exactly one paint, then true.
 *
 * That frame is what gives an entrance something to move FROM: set in the same
 * render as the element appears, the browser folds the two states into one and
 * draws it already in place, so the transition never runs.
 *
 * It is only the paint. Waiting for the page itself to arrive is the loader's
 * job, and what a section animates on is `active`.
 */
export function useAfterPaint(): boolean {
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPainted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return painted;
}
