import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { MENU, ROW, fitRow, openHeight } from "../utils/capsule";

export interface MenuCapsuleState {
  /** The slot the capsule grows out of — also what a click is measured against. */
  rootRef: RefObject<HTMLDivElement | null>;
  /** The one control that survives the stretch, and where focus goes back to. */
  triggerRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  /** One entry's height in px, once the column has been fitted to the screen. */
  row: number;
  /** What the frame is animated to. */
  height: number;
  toggle: () => void;
  pick: (id: string) => void;
}

/**
 * Whether the compact menu is open, how tall it is, and how tall one entry in
 * it is allowed to be.
 *
 * The height is state rather than layout because the frame ANIMATES it: a
 * transition needs two numbers, and `height: auto` is not one of them. The row
 * size is state for a different reason — ten entries do not fit on a phone
 * held sideways, so the column is measured against the space under the bar and
 * the rows give up height until they fit.
 *
 * It closes on Escape and on a press anywhere else, which is the whole of what
 * an overlay owes a reader. Escape and a pick hand focus back to the trigger,
 * because the entry that had it is about to be `inert`; a press outside does
 * not, since the reader has already put the focus somewhere themselves.
 */
export function useMenuCapsule(count: number, onPick: (id: string) => void): MenuCapsuleState {
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<number>(ROW);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Measured when the menu opens rather than on every resize: shut, it is one
  // round button and the answer would be thrown away.
  useEffect(() => {
    if (!open) return;

    const fit = () => {
      const top = rootRef.current?.getBoundingClientRect().top ?? 0;
      setRow(fitRow(count, window.innerHeight - top - MENU.margin));
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [open, count]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggle = useCallback(() => setOpen((shown) => !shown), []);

  const pick = useCallback(
    (id: string) => {
      setOpen(false);
      triggerRef.current?.focus();
      onPick(id);
    },
    [onPick]
  );

  return {
    rootRef,
    triggerRef,
    open,
    row,
    height: open ? openHeight(count, row) : MENU.size,
    toggle,
    pick
  };
}
