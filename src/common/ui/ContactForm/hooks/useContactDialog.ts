import { useCallback, useRef, useState } from "react";

export interface ContactDialog {
  /** True while the form is in the document, including on its way out. */
  shown: boolean;
  /** True once it has been asked to close and is still leaving. */
  leaving: boolean;
  /** Put on the control that opens it, so focus can be given back to it. */
  opener: (node: HTMLButtonElement | null) => void;
  open: () => void;
  close: () => void;
  onClosed: () => void;
}

/**
 * The door to the form, for whichever section is holding it open.
 *
 * It is a hook rather than a prop on the form because two sections open the
 * same form and each has its own button to give focus back to. The form itself
 * knows nothing about who opened it.
 */
export function useContactDialog(): ContactDialog {
  const button = useRef<HTMLButtonElement | null>(null);
  const [shown, setShown] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const opener = useCallback((node: HTMLButtonElement | null) => {
    button.current = node;
  }, []);

  const open = useCallback(() => {
    setLeaving(false);
    setShown(true);
  }, []);

  const close = useCallback(() => setLeaving(true), []);

  const onClosed = useCallback(() => {
    setShown(false);
    setLeaving(false);
    button.current?.focus();
  }, []);

  return { shown, leaving, opener, open, close, onClosed };
}
