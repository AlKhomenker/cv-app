import { type RefObject, useEffect, useState } from "react";

/** A loader that flashes is worse than none, so it is never shorter than this. */
const MIN_MS = 500;

/** How far the bar closes on its target each frame. */
const EASE = 0.055;

/** Where the bar waits while the page is still arriving. */
const HOLD = 0.92;

/**
 * Fills the bar, and says when the page has finished arriving.
 *
 * The bar is written straight to the DOM as a custom property rather than
 * held in state: this runs every frame, and a state write per frame would
 * re-render the whole page sixty times while it is trying to load.
 *
 * It eases toward 92% and waits there. Real progress cannot be known — the
 * two webfonts and `load` are the only honest milestones — so the bar tells
 * the truth it can: something is still coming. When both land, and the minimum
 * has passed, it closes the remaining 8%.
 */
export function useLoadProgress(rail: RefObject<HTMLElement | null>): boolean {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = rail.current;
    if (!node) return;

    let frame = 0;
    let arrived = false;
    let value = 0;
    const started = performance.now();

    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });

    const mark = () => {
      arrived = true;
    };
    Promise.all([fonts, loaded]).then(mark, mark);

    const write = (next: number) => node.style.setProperty("--progress", next.toFixed(4));

    const tick = () => {
      const ready = arrived && performance.now() - started >= MIN_MS;
      const target = ready ? 1 : HOLD;

      value += (target - value) * EASE;
      if (ready && value > 0.995) value = 1;

      write(value);

      if (value === 1) {
        setDone(true);
        return;
      }
      frame = requestAnimationFrame(tick);
    };


    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [rail]);

  return done;
}
