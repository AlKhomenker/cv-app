import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

export interface SiteQrState {
  /** The toggle and its popover: a press inside it is not a press outside. */
  rootRef: RefObject<HTMLDivElement | null>;
  /** Where focus goes back to when Escape shuts the popover. */
  triggerRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  toggle: () => void;
}

/**
 * Whether the page's QR code is showing.
 *
 * It opens on a press, not on hover, because a phone has no hover and the
 * reader who wants the code most is the one holding a second phone up to a
 * laptop. It shuts on the same press, on Escape and on a press anywhere else —
 * the same three ways out `useMenuCapsule` gives the menu. Escape hands focus
 * back to the toggle, because the popover is about to be `inert`; a press
 * outside does not, since the reader has already put the focus somewhere.
 */
export function useSiteQr(): SiteQrState {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  return { rootRef, triggerRef, open, toggle };
}
