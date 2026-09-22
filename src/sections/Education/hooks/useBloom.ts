import { useCallback, useEffect, useState } from "react";

export interface Bloom {
  /** Bumped every time the reveal should run. It is the animation's `key`. */
  run: number;
  replay: () => void;
}

/**
 * When a panel's picture performs its reveal.
 *
 * The reveal is a one-shot that goes out to the soft, saturated impression of
 * the picture and comes back, which is the only reading under which "performs
 * the reveal once on arrival" and "hovering replays it" are both true of the
 * same thing. A state the picture settled INTO could not be replayed; there
 * would be nothing to replay it from.
 *
 * Re-running a CSS animation means giving the element a new identity, so what
 * is counted here is runs, and the count is the `key`. That is the same
 * mechanism React gives for resetting anything else — and unlike toggling a
 * class off and on, it cannot be folded into one frame by the browser.
 */
export function useBloom(arrived: boolean): Bloom {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (arrived) setRun((count) => count + 1);
  }, [arrived]);

  const replay = useCallback(() => setRun((count) => count + 1), []);

  return { run, replay };
}
