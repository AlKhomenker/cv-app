import { useCallback, useEffect, useState } from "react";

export interface HeaderLabels {
  /** Whether the bar has slid down from above the top edge. */
  entered: boolean;
  /** Whether the section names are written in. */
  shown: boolean;
  hold: () => void;
  release: () => void;
}

/**
 * What the header is showing.
 *
 * The bar drops in the first time the page is ready and never leaves again —
 * a latch, not a mirror of `shown`, or it would slide back up every time the
 * reader scrolled past the opening.
 *
 * The names go with the opening, which is the whole point of the effect. They
 * are also the only way around the page, so pointing at the bar or tabbing
 * into it writes them back. Without that, a reader further down would have no
 * navigation at all.
 */
export function useHeaderLabels(shown: boolean): HeaderLabels {
  const [entered, setEntered] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (shown) setEntered(true);
  }, [shown]);

  const hold = useCallback(() => setHeld(true), []);
  const release = useCallback(() => setHeld(false), []);

  return { entered, shown: entered && (shown || held), hold, release };
}
