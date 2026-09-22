import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { motionMs } from "@/common/utils/motionTokens";
import type { StageSection } from "../types";
import { createProgress, type ProgressSource, type ProgressStore } from "../utils/progress";
import { absorbedByPane } from "../utils/scrollers";
import { leaves, nextTravel, spanOf } from "../utils/travel";

/** How much wheel travel counts as one step. A trackpad sends many small ones. */
const WHEEL_STEP = 48;

/** How far a finger must travel for the same. */
const TOUCH_STEP = 44;

/**
 * How far a finger goes before the stage decides which way it was going.
 *
 * A pinned page spends a VERTICAL gesture on itself and must leave a sideways
 * one alone: a swipe across the screen is the browser's own — going back, or
 * moving between tabs — and a section that panned sideways would otherwise have
 * to choose between answering the finger and letting the browser answer it.
 * Eight pixels is enough to tell the two apart and short enough that the answer
 * arrives before anything has moved.
 */
const AXIS_LOCK = 8;

/** Which way this gesture turned out to be going. */
type Axis = "unknown" | "down" | "across";

/** How far one arrow press moves a section that takes the scroll, in pixels. */
const KEY_STEP = 120;

/**
 * The shortest gap between two steps. Momentum on a trackpad keeps firing for
 * a second after the hand has stopped, and without a floor one flick would
 * walk through several sections.
 *
 * The floor is only the floor. What actually sets the gap is `--dur-reveal`,
 * the page's one entrance: a reader cannot step again until the section they
 * stepped INTO has finished arriving. Anything shorter and two sections are
 * half-drawn over each other — the one leaving has not emptied, the one
 * arriving has not filled, and a third is already on its way. That reads as
 * the page jumping rather than as it moving.
 */
const MIN_COOLDOWN = 90;

export interface StageControl {
  /** Which stage section is on screen. */
  index: number;
  /** How quiet the background should be while this section is on screen. */
  calm: number;
  /** How far through each section the reader is — see `utils/progress.ts`. */
  progress: ProgressSource;
  goTo: (index: number) => void;
  /** Puts the reader somewhere else inside the section on screen, 0 to 1. */
  seek: (value: number) => void;
}

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";
}

/**
 * The scroll contract for the pinned sections.
 *
 * While the stage holds the input the document cannot move at all — the lock
 * is an attribute on `<html>`, and `styles/theme.css` turns it into
 * `overflow: hidden`. A gesture therefore changes WHICH section is drawn, or
 * how far through one the reader is, and never where the page is, which is
 * what makes the page look motionless.
 *
 * A section that declares a `depth` takes the scroll rather than stepping on
 * it: the gesture moves `travelled` inside the section, and only a gesture
 * made at either end of that steps out. Everything else is one gesture, one
 * step, as before.
 *
 * The stage never lets go. It used to, past the last section, because there
 * was a scrolling document under it; there is not any more, so the page has
 * two ends and a gesture past either moves nothing at all.
 */
export function useStage(sections: readonly StageSection[]): StageControl {
  const count = sections.length;
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const blockedUntil = useRef(0);

  /**
   * How far into the current section the reader has scrolled, in pixels.
   *
   * A ref, not state, and the one place in this hook that is. The listeners
   * below are registered per step and must read a value that changes per
   * event; making it state would re-register them mid-swipe, which loses the
   * finger's anchor. `progress` is the single published form of it, and
   * `travel` is the single writer.
   */
  const travelled = useRef(0);
  const progressRef = useRef<ProgressStore | null>(null);
  progressRef.current ??= createProgress();
  const progress = progressRef.current;

  /**
   * The reading position inside ONE section: the pixels for the listeners
   * below, and the fraction for whatever draws that section.
   *
   * The position has to be named, because two neighbouring sections take the
   * scroll now. A step writes the section being stepped INTO, and the one
   * still fading out keeps the place it was left at rather than being dragged
   * to the new one — see `utils/progress.ts`.
   */
  const travel = useCallback(
    (position: number, distance: number, span: number) => {
      travelled.current = distance;
      if (span > 0) progress.write(position, distance / span);
    },
    [progress]
  );

  /**
   * Where a section starts when it is arrived at: the top of it coming down,
   * the end of it coming back up, so the strip inside is always entered from
   * the side the reader came from.
   */
  const land = useCallback(
    (position: number, heading: 1 | -1) => {
      const span = spanOf(sections, position, reduced);
      travel(position, heading === 1 ? 0 : span, span);
    },
    [reduced, sections, travel]
  );

  // The lock lives on the document because the page that must not move is the
  // document, not a node this component owns. It goes on once and stays on:
  // the stage is the whole page, so there is nothing for it to hand the
  // scroll back TO.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.stage = "locked";
    return () => {
      delete root.dataset.stage;
    };
  }, []);

  useEffect(() => {
    const cooldown = reduced ? MIN_COOLDOWN : Math.max(MIN_COOLDOWN, motionMs("--dur-reveal"));
    let wheel = 0;
    let touch = 0;
    let fromX = 0;
    let fromY = 0;
    let axis: Axis = "unknown";

    const step = (heading: 1 | -1) => {
      const next = index + heading;
      // The page has two ends and a gesture past either moves nothing — and
      // takes no cooldown with it either, so turning back is available on the
      // very next gesture rather than most of a second later.
      if (next < 0 || next >= count) return;
      blockedUntil.current = performance.now() + cooldown;
      land(next, heading);
      setIndex(next);
    };

    /**
     * One gesture, in pixels. A section that takes the scroll spends it
     * inside itself; every other section collects it until there is enough of
     * it to count as one step.
     */
    const advance = (delta: number, threshold: number) => {
      // A sideways gesture on a trackpad arrives here as a wheel with no
      // vertical travel in it at all, and has no heading to be read out of.
      if (delta === 0) return;
      if (performance.now() < blockedUntil.current) {
        wheel = 0;
        return;
      }

      const span = spanOf(sections, index, reduced);
      if (span > 0) {
        if (leaves(travelled.current, delta, span)) {
          step(delta > 0 ? 1 : -1);
          return;
        }

        const from = travelled.current;
        const to = nextTravel(from, delta, span);
        travel(index, to, span);

        // Arriving at either end stops the gesture there. Momentum on a
        // trackpad keeps firing after the hand has stopped, and without this
        // the same flick that brings the last block to the reading line
        // carries the reader straight past it.
        if (to !== from && (to <= 0 || to >= span)) {
          blockedUntil.current = performance.now() + cooldown;
        }
        return;
      }

      wheel += delta;
      if (Math.abs(wheel) < threshold) return;
      const heading = wheel > 0 ? 1 : -1;
      wheel = 0;
      step(heading);
    };

    const onWheel = (event: WheelEvent) => {
      if (reduced && absorbedByPane(event.target, event.deltaY)) return;
      event.preventDefault();
      advance(event.deltaY, WHEEL_STEP);
    };

    const onTouchStart = (event: TouchEvent) => {
      const point = event.touches[0];
      touch = point?.clientY ?? 0;
      fromX = point?.clientX ?? 0;
      fromY = touch;
      axis = "unknown";
    };

    const onTouchMove = (event: TouchEvent) => {
      const point = event.touches[0];
      const y = point?.clientY ?? 0;

      // Decided once per gesture, from where the finger started, and never
      // revisited: a swipe that wandered would otherwise change hands halfway
      // and leave the page half moved.
      if (axis === "unknown") {
        const across = Math.abs((point?.clientX ?? 0) - fromX);
        const down = Math.abs(y - fromY);
        if (Math.max(across, down) < AXIS_LOCK) return;
        axis = down >= across ? "down" : "across";
      }
      // Sideways belongs to the browser. Nothing is prevented and nothing
      // moves, which is what keeps a back-swipe a back-swipe even on a section
      // whose own content travels across the screen.
      if (axis === "across") return;

      const delta = touch - y;
      if (reduced && absorbedByPane(event.target, delta)) return;
      event.preventDefault();
      if (Math.abs(delta) < 1) return;
      touch = y;
      advance(delta, TOUCH_STEP);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isTyping(event.target)) return;

      const down = event.key === "ArrowDown" || event.key === "PageDown";
      const up = event.key === "ArrowUp" || event.key === "PageUp";
      if (!down && !up) return;

      const heading = down ? 1 : -1;
      if (reduced && absorbedByPane(event.target, heading)) return;
      event.preventDefault();
      // No threshold: one press is one gesture, whether it moves the strip
      // inside a section or steps past a section that has no strip.
      advance(heading * KEY_STEP, 0);
    };

    // The travel is a number of pixels but the depth behind it is a number of
    // screens, so a resize moves the end of the section. Keeping the published
    // progress and re-deriving the pixels from it is what stops the reader
    // being thrown to a different block by turning the phone over.
    const onResize = () => {
      travelled.current = progress.read(index) * spanOf(sections, index, reduced);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [count, index, land, progress, reduced, sections, travel]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(next);
      // A section reached from the header is always entered at its beginning,
      // whichever side of the page the reader asked for it from.
      land(next, 1);
    },
    [land]
  );

  /**
   * Where the section on screen puts the reader when it asks to move him
   * itself — an arrow key on a timeline of roles, which means "the next role"
   * rather than "a hundred and twenty pixels".
   *
   * It goes through the same two values a gesture does, so nothing that draws
   * can tell a seek from a scroll. A section with no depth has nowhere inside
   * it to be put, and this does nothing for it.
   */
  const seek = useCallback(
    (value: number) => {
      const span = spanOf(sections, index, reduced);
      if (span <= 0) return;
      travel(index, Math.min(Math.max(value, 0), 1) * span, span);
    },
    [index, reduced, sections, travel]
  );

  const calm = sections[index]?.calm ?? 0;

  return { index, calm, progress, goTo, seek };
}
