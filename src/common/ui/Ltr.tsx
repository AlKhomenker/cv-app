import type { ReactNode } from "react";

/**
 * A Latin run inside a sentence that may be Hebrew — a phone number, an email,
 * a URL, a stack list. Without it the browser's bidi algorithm reorders the
 * punctuation around the run and `(058) 442-2701` comes out with the bracket
 * on the wrong end.
 */
export function Ltr({ children }: { children: ReactNode }) {
  return <span dir="ltr">{children}</span>;
}
