import { useEffect } from "react";
import { setBurst } from "@/shell/BlobField/utils/dispersal";

/** Where the dispersal starts: the middle of the screen, in screen fractions. */
const ORIGIN = { x: 0.5, y: 0.5 };

/**
 * Hands the background canvas how far the point has come apart.
 *
 * The particles are painted by the FIELD — see `shell/BlobField/utils/burst.ts`
 * for why — and all this section owes it is a fraction. Nothing here
 * re-renders anything: the field's own loop is already running a frame at a
 * time and reads what was last written.
 *
 * It used to hand over a PLACE as well, measured off the dot this section
 * drew. There is no dot any more, and the place was never really the dot's: it
 * is the middle of the screen, which is where the point has been on every
 * section before this one and where the summary's reading line and the
 * skills' badges came out of. A constant says that better than a
 * `getBoundingClientRect` did, and costs no forced reflow to say it.
 *
 * The cleanup runs before the next write and on the way out, so a section that
 * is not on screen leaves nothing behind for the field to draw.
 */
export function useDispersal(spread: number, running: boolean): void {
  useEffect(() => {
    if (!running) return;
    setBurst({ ...ORIGIN, spread });
    return () => setBurst(null);
  }, [running, spread]);
}
