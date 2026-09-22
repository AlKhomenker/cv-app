import { type KeyboardEvent, useCallback, useRef, useState } from "react";
import type { Role } from "@/content";
import { focusedStop, stopProgress, trackLine } from "../utils/track";

export interface OpenRole {
  role: Role;
  /** Where on the screen the card was when it was tapped, in CSS pixels. */
  origin: DOMRect;
}

export interface Timeline {
  /** Where the reader is along the track — see `utils/track.ts`. */
  line: number;
  /** Which role is on the reading line. */
  focused: number;
  /** The role filling the screen, or null. */
  open: OpenRole | null;
  /** True while the open role is on its way out and still drawn. */
  leaving: boolean;
  registerCard: (id: string, node: HTMLButtonElement | null) => void;
  openRole: (role: Role) => void;
  closeRole: () => void;
  /** What the panel calls once it has finished leaving. */
  onClosed: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

/**
 * Where the timeline has been travelled to, and which role has been opened.
 *
 * The reading position is not state: it is `progress`, which the stage owns
 * and hands down, so scrolling down and scrolling back up run the same states
 * in opposite orders with nothing stored in between. What IS state here is the
 * one thing scroll cannot say — that the reader has opened a role.
 *
 * Opening measures the card first. The panel grows from exactly where the card
 * was, so the card's own rectangle is the animation's starting point, and it
 * has to be read before the panel is drawn over it.
 */
export function useTimeline(roles: readonly Role[], progress: number, seek: (value: number) => void): Timeline {
  const line = trackLine(progress, roles.length);
  const focused = focusedStop(line, roles.length);
  const cards = useRef(new Map<string, HTMLButtonElement>());
  const [open, setOpen] = useState<OpenRole | null>(null);
  const [leaving, setLeaving] = useState(false);

  const registerCard = useCallback((id: string, node: HTMLButtonElement | null) => {
    if (node) cards.current.set(id, node);
    else cards.current.delete(id);
  }, []);

  const openRole = useCallback((role: Role) => {
    const node = cards.current.get(role.id);
    if (!node) return;
    setLeaving(false);
    setOpen({ role, origin: node.getBoundingClientRect() });
  }, []);

  const closeRole = useCallback(() => setLeaving(true), []);

  /**
   * The panel is gone. Focus goes back to the card it came out of, which is
   * still exactly where it was — the track never moved, because the panel took
   * the scroll while it was open.
   */
  const onClosed = useCallback(() => {
    const id = open?.role.id;
    setOpen(null);
    setLeaving(false);
    if (id) cards.current.get(id)?.focus();
  }, [open?.role.id]);

  /**
   * Arrow keys move a whole role rather than a distance.
   *
   * Only the vertical pair, and deliberately: the track runs from top to
   * bottom, and horizontal arrows would have to mean opposite things in the two
   * languages while this means the same in both — including on the wide layout,
   * where consecutive roles sit on opposite sides of the rail and an arrow
   * naming a side would name the wrong one every second press.
   *
   * The key is swallowed, which is what stops the stage ALSO acting on it: it
   * skips a keystroke that something nearer the reader has already answered.
   * Focus is carried to the role that has just reached the line, so a second
   * press arrives here rather than on a card the reader can no longer see.
   */
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.defaultPrevented) return;

      const next = nextStop(event.key, focused, roles.length);
      if (next === null) return;

      event.preventDefault();
      seek(stopProgress(next, roles.length));
      cards.current.get(roles[next]?.id ?? "")?.focus();
    },
    [focused, roles, seek]
  );

  return { line, focused, open, leaving, registerCard, openRole, closeRole, onClosed, onKeyDown };
}

/** Which role a key asks for, or null for a key this timeline has no answer to. */
function nextStop(key: string, focused: number, count: number): number | null {
  const last = count - 1;
  if (key === "ArrowDown" || key === "PageDown") return Math.min(focused + 1, last);
  if (key === "ArrowUp" || key === "PageUp") return Math.max(focused - 1, 0);
  if (key === "Home") return 0;
  if (key === "End") return last;
  return null;
}
