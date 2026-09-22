/**
 * The two shapes more than one component is built out of, written once because
 * they have to stay the same shape.
 *
 * They are the stage's own glass at the size a scrolling document uses it,
 * with one deliberate difference: no `backdrop-filter`. The stage has ONE
 * card; the page below has a dozen roles, recommendations and fields on screen
 * at once, and a dozen backdrop filters over a canvas that is already blurred
 * by 40–76px buys nothing a reader can see and costs a repaint per scroll.
 * `--glass-fill-strong` is the same material at an alpha that does not need
 * the blur to be legible.
 */

/** A card: a role, a recommendation. Glass, a hairline, a soft drop. */
export const PANEL_CLASS = [
  "rounded-card border border-hair bg-glass-strong",
  "shadow-[inset_0_1px_0_var(--glass-edge),var(--glass-drop)]"
].join(" ");

/**
 * A pill: a skill, a language. `aria-pressed` is the whole of its state, so a
 * tag that cannot be pressed simply never carries it and needs no variant of
 * its own.
 */
export const TAG_CLASS = [
  "inline-flex min-h-9 items-center rounded-full border border-hair bg-glass-strong",
  "px-3 text-[0.9rem] text-ink",
  "transition-[color,border-color] duration-(--dur-fast) ease-page",
  "aria-pressed:border-accent aria-pressed:font-semibold aria-pressed:text-accent"
].join(" ");
