import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

export interface RowsFit {
  /** The box the rows are drawn in: whatever height the section has left. */
  viewport: RefObject<HTMLDivElement | null>;
  /** The rows themselves, at their own full height whether that fits or not. */
  rows: RefObject<HTMLDivElement | null>;
  /** How many pixels of them do not fit. Zero on a screen with room for all five. */
  hidden: number;
}

/**
 * How much of the rows the screen cannot show.
 *
 * It is measured rather than declared, because the answer is a function of
 * three things this file cannot know: the height of the window, the length of
 * the words in whichever language is on, and how many tools the CV lists. A
 * breakpoint would answer for the first of them and be wrong about the other
 * two — and wrong in the direction that hides content, which is the direction
 * that matters.
 *
 * `offsetHeight` and `clientHeight`, not `getBoundingClientRect`. The section
 * is drawn inside a `common/ui/Emerge`, which is a scale, and a rect under a
 * scale reports the drawn size rather than the laid-out one — eight per cent
 * small for most of the entrance, and different on every frame of it.
 */
export function useRowsFit(): RowsFit {
  const viewport = useRef<HTMLDivElement>(null);
  const rows = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(0);

  const measure = useCallback(() => {
    const box = viewport.current;
    const inner = rows.current;
    if (!box || !inner) return;
    setHidden(Math.max(0, inner.offsetHeight - box.clientHeight));
  }, []);

  useEffect(() => {
    measure();
    const watch = new ResizeObserver(measure);
    if (viewport.current) watch.observe(viewport.current);
    if (rows.current) watch.observe(rows.current);
    return () => watch.disconnect();
  }, [measure]);

  return { viewport, rows, hidden };
}
