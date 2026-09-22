import type { CSSProperties, ReactNode } from "react";

export interface EmergeProps {
  children: ReactNode;
  /** The section's own `active`. Going false takes the block back out again. */
  shown: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * A BLOCK making the page's one entrance: out of its own centre, slowly.
 *
 * It is the flag-driven half of `common/utils/emerge.ts` — a scale and an
 * opacity over `--dur-reveal`, with no translate, on the page's single easing.
 * `common/ui/LineReveal` is the same entrance for a line of text, as keyframes
 * rather than as a transition, because a line has to play on the first frame
 * it is drawn and a transition cannot promise that.
 *
 * Use it for the things a section brings in ALL AT ONCE. A section that paces
 * its contents off the reading position instead — badges, rows, stars — writes
 * `emergeStyle` inline and does not come through here: there is no moment
 * those arrive at, there is a position they are a function of.
 *
 * It is a `div` on purpose. Anything with an opacity or a scale OF ITS OWN is
 * wrapped rather than given these classes: two rules naming one property on
 * one element are settled by the order Tailwind happens to emit them in, which
 * is not an order anyone here chose.
 *
 * ## The one section that cannot use it
 *
 * A scale on an ancestor changes what `getBoundingClientRect` reports and does
 * NOT fire a `ResizeObserver`, so anything inside that measures itself is
 * handed numbers 8% small — and a stage slide is drawn from the first frame,
 * off screen and scaled down, which is exactly when a carousel initialises.
 * Section 5 writes the fade by hand for that reason; the comment is in
 * `sections/Education/Education.tsx`. Everything else belongs here.
 *
 * ## The duration is not decoration
 *
 * A section has to finish emptying before the stage hides it — the slide waits
 * `--reveal-out`, which is longer than `--dur-reveal` on purpose — and the
 * step cooldown in `shell/Stage/hooks/useStage.ts` is `--dur-reveal` for the
 * same reason. A section whose body answered nothing at all would sit at full
 * opacity for the whole wait and then blink out in one frame when visibility
 * flipped, which is what this was added to stop.
 */
export function Emerge({ children, shown, className, style }: EmergeProps) {
  return (
    <div
      className={[
        "origin-center scale-[0.92] opacity-0",
        "transition-[opacity,scale] duration-(--dur-reveal) ease-page",
        "shown:scale-100 shown:opacity-100",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      data-shown={shown}
      style={style}>
      {children}
    </div>
  );
}
