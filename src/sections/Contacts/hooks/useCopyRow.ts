import { useCallback, useEffect, useRef, useState } from "react";
import { copyText } from "../utils/copy";

/** How long a row says it has been copied before it goes back to its value. */
const HELD = 1400;

export interface CopyRow {
  /** The kind of row that is currently saying "Copied", or null. */
  copied: string | null;
  copy: (id: string, value: string) => void;
}

/**
 * The confirmation a copied row gives, in place.
 *
 * No toast and no popup: what the reader pressed is what answers, so the
 * answer is where they are already looking. One row at a time, because two
 * rows both claiming to have been copied is a reader wondering what is on the
 * clipboard.
 */
export function useCopyRow(): CopyRow {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback((id: string, value: string) => {
    void copyText(value).then((done) => {
      if (!done) return;
      window.clearTimeout(timer.current);
      setCopied(id);
      timer.current = window.setTimeout(() => setCopied(null), HELD);
    });
  }, []);

  return { copied, copy };
}
