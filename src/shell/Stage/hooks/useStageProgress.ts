import { useCallback, useSyncExternalStore } from "react";
import type { ProgressSource } from "../utils/progress";

/**
 * How far through one section the reader is, as a number a component can
 * render from.
 *
 * The subscription is what keeps the cost where it belongs: the value changes
 * on every wheel event, and only the slide at `position` re-renders on it —
 * not the other slides, not the header, not the canvas, and not the document
 * below the stage.
 */
export function useStageProgress(source: ProgressSource, position: number): number {
  const subscribe = useCallback((listener: () => void) => source.subscribe(position, listener), [source, position]);
  const read = useCallback(() => source.read(position), [source, position]);

  return useSyncExternalStore(subscribe, read, read);
}
