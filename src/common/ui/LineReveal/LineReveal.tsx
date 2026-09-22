import { type ReactNode, useEffect, useState } from "react";
import { useAfterPaint } from "@/common/hooks/useAfterPaint";

export interface LineRevealProps {
  children: ReactNode;
  /** Whether the line is in place. Going false takes it back out the same way. */
  shown: boolean;
  className?: string;
}

/**
 * A line of text making the page's one entrance: out of its own centre and
 * back into it, as one thing.
 *
 * It is the line form of `common/utils/emerge.ts` — the same scale, the same
 * duration and the same easing `Emerge` gives a block and `emergeStyle` gives
 * a scroll-paced one. Keyframes rather than a transition, for the reason
 * below.
 *
 * There is no delay and no stagger. Every line on a section arrives together,
 * which is also the only version that survived contact with a real browser:
 * anything holding a line back — `transition-delay`, a timer, `animation-delay`
 * — was one more thing between the flag and the fade, and each one failed in
 * its own way.
 *
 * It is an ANIMATION and not a transition: `both` fill makes the start value
 * explicit, so a line that has just been drawn still plays rather than
 * appearing at its end value.
 *
 * There are three states, not two. Before a line has ever been shown it has no
 * `data-state` at all and simply is not there — running the "out" animation
 * then would flash it into view only to fade it back out, because that
 * animation's first keyframe is the visible one.
 *
 * The page does not consult `prefers-reduced-motion` — see the README.
 */
export function LineReveal({ children, shown, className }: LineRevealProps) {
  const armed = useAfterPaint();
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (shown) setPlayed(true);
  }, [shown]);

  const state = !armed || (!shown && !played) ? undefined : shown ? "in" : "out";

  return (
    <span
      className={[
        "inline-block max-w-full origin-center scale-[0.92] opacity-0",
        "data-[state=in]:animate-line-in data-[state=out]:animate-line-out",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      data-state={state}>
      {children}
    </span>
  );
}
