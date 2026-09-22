import { useCallback, useEffect, useState } from "react";
import { motionMs } from "@/common/utils/motionTokens";

export interface PageReady {
  /** True once the loader has gone and the page may make its entrance. */
  ready: boolean;
  /** What the loader calls when the page has finished arriving. */
  onLoaded: () => void;
}

/**
 * The handover from the loader to the page.
 *
 * The two do not happen over the top of each other. `onLoaded` starts the
 * loader's fade; `ready` follows `--reveal-start` later, by which time there
 * is a blank page for the first line to rise into — and it is also what
 * unmounts the loader, so the fade has finished before the element goes.
 */
export function usePageReady(): PageReady {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const onLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded) return;
    const timer = window.setTimeout(() => setReady(true), motionMs("--reveal-start"));
    return () => window.clearTimeout(timer);
  }, [loaded]);

  return { ready, onLoaded };
}
