import type { CSSProperties } from "react";
import { markFill } from "../utils/stack";

export interface MarksProps {
  count: number;
  /** Where the reader is in the deck. The marks fill as the cards are dealt. */
  line: number;
}

/**
 * One small mark per card, filling as the deck is dealt.
 *
 * They say where the reader is and nothing else, which is why they are
 * `aria-hidden`: every card is a heading in the document, and a reader hearing
 * them already knows which one they are on. The two controls either side of
 * them are the part a keyboard and a screen reader actually use.
 *
 * They fill CONTINUOUSLY rather than lighting one at a time, so a deck stopped
 * mid-deal reads as a position between two cards instead of as a choice that
 * has already been made.
 */
export function Marks({ count, line }: MarksProps) {
  return (
    <div className="flex items-center gap-1.5 md:gap-2" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="relative h-0.75 w-5 overflow-hidden rounded-full bg-hair md:w-7">
          <span
            className="absolute inset-y-0 inset-s-0 rounded-full bg-accent w-[calc(var(--fill)*100%)]"
            style={{ "--fill": markFill(index, line).toFixed(3) } as CSSProperties}
          />
        </span>
      ))}
    </div>
  );
}
