import type { CSSProperties, ReactNode } from "react";

export interface HintLabelProps {
  /** What the bubble says. One short phrase — the name of the thing, not a sentence. */
  label: string;
  /**
   * Where the bubble sits: above the control, or after it along the reading
   * direction. `end` is written with logical properties, so it is to the right
   * of a control in English and to the left of one in Hebrew.
   */
  side?: "top" | "end";
  /** The control. It keeps its own accessible name — see the note below. */
  children: ReactNode;
  className?: string;
  /** For a caller that paces the whole control, bubble and all, into view. */
  style?: CSSProperties;
}

const BUBBLE = [
  "pointer-events-none absolute z-10 whitespace-nowrap rounded-field border border-hair",
  "bg-page px-2 py-1 text-[0.72rem] text-ink shadow-(--glass-drop)",
  "opacity-0 transition-opacity duration-(--dur-fast) ease-page",
  "group-hover/hint:opacity-100 group-focus-within/hint:opacity-100"
].join(" ");

const PLACE = {
  // Centred physically rather than logically: `left-1/2` with a half-width
  // shift back is the same centre whichever way the page reads.
  top: "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
  end: "inset-s-full top-1/2 ms-2 -translate-y-1/2"
} as const;

/**
 * The name of a control that has only a glyph, written beside it while the
 * pointer is on it or the focus is in it.
 *
 * It is `aria-hidden`, and that is not an oversight: the control it labels
 * carries its own `aria-label`, so a reader on a screen reader has already
 * been told what this says. Repeating it here would announce every glyph
 * twice.
 *
 * It is drawn on the page's own surface rather than on `glass`. A bubble is
 * usually shown NEXT TO something that is itself glass — the header's menu —
 * and a backdrop filter inside another one samples a backdrop that has already
 * been filtered, which comes out as a smear rather than as a pane.
 *
 * There is no timer and no JavaScript in it: hover and focus are CSS states,
 * and a label that appears on them needs nothing else.
 */
export function HintLabel({ label, side = "top", children, className, style }: HintLabelProps) {
  return (
    <span className={["group/hint relative inline-flex", className].filter(Boolean).join(" ")} style={style}>
      {children}
      <span aria-hidden className={`${BUBBLE} ${PLACE[side]}`}>
        {label}
      </span>
    </span>
  );
}
