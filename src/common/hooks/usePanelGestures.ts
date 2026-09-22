import { useCallback, useEffect, useRef, useState } from "react";
import { dragOffset, passedClose } from "@/common/utils/swipe";
import { motionMs } from "@/common/utils/motionTokens";
import { useAfterPaint } from "./useAfterPaint";

/**
 * The four shapes a panel is ever in, as one word the stylesheet can read.
 *
 * `start` and `closing` are the SAME shape — wherever it grew out of — which is
 * what makes the close the open played backwards rather than a second
 * animation. `flinging` is the other exit: a finger carried it down, so it
 * leaves the way the finger was going instead of shrinking back into a thing
 * the hand is no longer on.
 */
export type PanelState = "start" | "open" | "closing" | "flinging";

export interface PanelGestures {
  panelRef: (node: HTMLDivElement | null) => void;
  scrollRef: (node: HTMLDivElement | null) => void;
  state: PanelState;
  /** True while a finger is on it, so the panel drops its transition and follows. */
  dragging: boolean;
  /** How far the finger has carried it down, in pixels. */
  drag: number;
}

export interface PanelGesturesInput {
  /** True once it has been asked to close and is on its way out. */
  leaving: boolean;
  onClose: () => void;
  onClosed: () => void;
}

/**
 * What is the same about every panel that fills the screen on this page and is
 * NOT a dialog's job: who owns the wheel and the finger while it is open, when
 * it has finished leaving, and the swipe that closes it.
 *
 * Focus, Escape, the tab trap, `aria-modal` and the return of focus to
 * whatever opened it are Radix's now — see `components/ui/dialog.tsx`. This
 * hook used to do all of it, and `common/utils/focusTrap.ts` went with the
 * half of it that was hand-rolled.
 *
 * What Radix has no opinion about is a page whose scroll is not the
 * document's. The stage owns the wheel and the finger for the whole site, so a
 * panel standing open has to take them back before the stage sees them, and
 * that is what is left here.
 *
 * ## Why what is underneath does not move
 *
 * The document is already pinned: the stage locks it and spends the scroll
 * inside whichever section is on screen. So there is no body to fix and no
 * scroll offset to put back — what has to be held still is the SECTION, and
 * this holds it by taking the gestures before the stage sees them. The reader
 * lands back on exactly the thing they opened because that thing never moved.
 *
 * The listener is on the window and in the CAPTURE phase, which is what puts it
 * ahead of the stage's own listeners on the same window. A gesture aimed inside
 * the panel is let through to scroll it; everything else is swallowed.
 *
 * What it does NOT decide is how the panel moves. A role grows by opening a
 * clip and an award grows by scaling out past the edges of the screen; both are
 * a `state` and a `drag` turned into a transform, and each panel turns them
 * into its own.
 */
export function usePanelGestures({ leaving, onClose, onClosed }: PanelGesturesInput): PanelGestures {
  const armed = useAfterPaint();
  const panel = useRef<HTMLDivElement | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);
  const from = useRef<number | null>(null);
  /**
   * How far the finger has carried the panel, for the listeners to read.
   *
   * The same number is state below, and this is not a second source for it:
   * `touchend` has to know where the drag ended in order to decide whether it
   * closes, and reading it out of a state updater would be a side effect inside
   * one — which React is free to run twice.
   */
  const carried = useRef(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [flung, setFlung] = useState(false);

  const panelRef = useCallback((node: HTMLDivElement | null) => {
    panel.current = node;
  }, []);

  const scrollRef = useCallback((node: HTMLDivElement | null) => {
    scroller.current = node;
  }, []);

  // The background is asked to stand further back while a panel is open: the
  // text is on a surface over the whole screen now, and the light that was
  // behind one card is behind every line of it. The attribute is on the
  // document for the same reason the stage's lock is — what changes is the
  // page, not a node this hook owns.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.panel = "open";
    return () => {
      delete root.dataset.panel;
    };
  }, []);

  // The panel is drawn until it has finished leaving. Nothing is measured to
  // find out when that is: the exit is one transition on the one duration the
  // whole page moves on.
  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(onClosed, motionMs("--dur-slow"));
    return () => window.clearTimeout(timer);
  }, [leaving, onClosed]);

  useEffect(() => {
    const inside = (target: EventTarget | null) => target instanceof Node && panel.current?.contains(target) === true;

    /**
     * Only the keys the STAGE would act on are swallowed. An arrow key here
     * would walk the section the reader cannot see, behind the thing they are
     * reading; everything else has to carry on to Radix.
     *
     * That is the whole of the change this file needed to sit under a real
     * dialog. It used to stop every key at the window's capture phase, which
     * is the first phase there is — so Escape never reached Radix's dismiss
     * layer and Tab never reached its focus scope, and the trap it provides
     * would have been dead on arrival.
     */
    const onKeyDown = (event: KeyboardEvent) => {
      if (STAGE_KEYS.has(event.key)) event.stopPropagation();
    };

    const onWheel = (event: WheelEvent) => {
      // Let a gesture aimed at the panel scroll it. Stopping the event does not
      // stop the browser scrolling — only `preventDefault` would, and that is
      // kept for the gestures that are not the panel's.
      if (!inside(event.target)) event.preventDefault();
      event.stopPropagation();
    };

    const onTouchStart = (event: TouchEvent) => {
      event.stopPropagation();
      const y = event.touches[0]?.clientY;
      // A swipe down is only a close from the top of the text. Further in it is
      // the reader scrolling back up through what they are reading.
      from.current = y !== undefined && inside(event.target) && (scroller.current?.scrollTop ?? 0) <= 0 ? y : null;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.stopPropagation();
      const start = from.current;
      const y = event.touches[0]?.clientY;
      if (start === null || y === undefined) {
        if (!inside(event.target)) event.preventDefault();
        return;
      }

      // The panel is following the finger now, so the browser must not also be
      // scrolling the text inside it — including on the way back up, or letting
      // go half way would leave the text scrolled.
      event.preventDefault();
      carried.current = dragOffset(start, y);
      setDragging(true);
      setDrag(carried.current);
    };

    const onTouchEnd = (event: TouchEvent) => {
      event.stopPropagation();
      if (from.current === null) return;
      from.current = null;
      setDragging(false);

      if (!passedClose(carried.current)) {
        carried.current = 0;
        setDrag(0);
        return;
      }
      setFlung(true);
      onClose();
    };

    const options = { capture: true, passive: false } as const;
    window.addEventListener("keydown", onKeyDown, options);
    window.addEventListener("wheel", onWheel, options);
    window.addEventListener("touchstart", onTouchStart, options);
    window.addEventListener("touchmove", onTouchMove, options);
    window.addEventListener("touchend", onTouchEnd, options);
    window.addEventListener("touchcancel", onTouchEnd, options);

    return () => {
      window.removeEventListener("keydown", onKeyDown, options);
      window.removeEventListener("wheel", onWheel, options);
      window.removeEventListener("touchstart", onTouchStart, options);
      window.removeEventListener("touchmove", onTouchMove, options);
      window.removeEventListener("touchend", onTouchEnd, options);
      window.removeEventListener("touchcancel", onTouchEnd, options);
    };
  }, [onClose]);

  return { panelRef, scrollRef, state: panelState(armed, leaving, flung), dragging, drag };
}

/** The keys `useStage` moves the page with, and the only ones held back here. */
const STAGE_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End"]);

function panelState(armed: boolean, leaving: boolean, flung: boolean): PanelState {
  if (leaving) return flung ? "flinging" : "closing";
  return armed ? "open" : "start";
}
