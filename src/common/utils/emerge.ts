import { createContext, type CSSProperties } from "react";

/**
 * The page's one entrance, written once.
 *
 * Everything that arrives anywhere on this page grows out of its own centre
 * and fades in: a `scale` and an `opacity`, no translate, over `--dur-reveal`
 * on the page's single easing. A reader who has learnt how one section arrives
 * has learnt how all ten do.
 *
 * It exists in two forms and this file is why they agree:
 *
 * - **A flag.** `common/ui/Emerge` for a block, `common/ui/LineReveal` for a
 *   line — the section's own `active`, played as a transition or as the
 *   `lineIn`/`lineOut` keyframes in `tailwind.css`.
 * - **The scroll.** {@link emergeStyle}, for a section that paces its own
 *   contents off the reading position — the skills' badges, the contacts'
 *   rows, the strengths' stars. Those cannot use a flag: there is no moment
 *   they arrive AT, there is a position they are a function of.
 *
 * The numbers below are the contract between the two. {@link SMALL} is also
 * written into the keyframes, because CSS keyframes cannot read a TypeScript
 * constant; if it changes here it changes there, and nowhere else.
 */
const SMALL = 0.92;

/**
 * Whether the block a line sits in is ALREADY making the entrance.
 *
 * Two of the three forms above can end up on the same words: a section wraps
 * its whole body in `Emerge`, and the title inside it is a `LineReveal`. Both
 * run 0 to 1 over `--dur-reveal` on the same easing, so the line's real
 * opacity is the product of two identical curves — a quarter of the way in
 * when everything around it is half — and the title reads as arriving AFTER
 * the content it names rather than with it.
 *
 * So the outer one wins. `Emerge` publishes this, and a `LineReveal` under it
 * draws its words plainly and lets the block carry them. A line with no
 * `Emerge` over it — the opening, the closing, the bar across the top — is
 * unaffected and still plays its own.
 */
export const Emerging = createContext(false);

/**
 * How far one thing has arrived, 0 to 1, from the reading position.
 *
 * `first` is where it starts, `apart` how far behind the one before it it
 * follows, and `span` how long it takes. All three are fractions of the
 * section's own scroll, so a section sets its pace by choosing them and never
 * by holding a timer.
 *
 * It is a function of the reading position and of nothing else, which is what
 * makes every one of these sections work the same way: a thing that has
 * arrived STAYS, because at any greater progress the value is still 1, and
 * scrolling back up takes them off in reverse order for free.
 */
export function arrivalAt(order: number, progress: number, first: number, apart: number, span: number): number {
  const at = (progress - (first + order * apart)) / span;
  return Math.min(Math.max(at, 0), 1);
}

/** The entrance as the two properties a scroll-driven section writes inline. */
export function emergeStyle(at: number): CSSProperties {
  return {
    opacity: at.toFixed(3),
    scale: (SMALL + (1 - SMALL) * at).toFixed(3)
  };
}
