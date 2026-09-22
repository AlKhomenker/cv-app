/**
 * The bar's glyphs, as two recipes rather than one.
 *
 * `GLYPH_CLASS` is the glyph itself — the quiet ink, what it does under a
 * pointer, and the one stroke weight every icon in the bar is drawn with,
 * whether it came from `common/ui/Icon` or from lucide. `TOGGLE_CLASS` is that
 * plus a surface of its own, which is what a control standing on the moving
 * light needs to read as pressable.
 *
 * They are split because the compact menu draws several glyphs INSIDE one
 * piece of glass: a second border round each of them would be a frame inside a
 * frame. `glass` is the global recipe in `styles/theme.css` — the border it
 * supplies is what the hover colours.
 */
export const GLYPH_CLASS = [
  "grid flex-none cursor-pointer place-items-center",
  "text-soft transition-[color,border-color] duration-(--dur-fast) ease-page hover:text-ink",
  "[&_svg]:size-4.25 [&_svg]:fill-none [&_svg]:stroke-current",
  "[&_svg]:stroke-[1.5] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]"
].join(" ");

/** A glyph with its own glass round it: the language and theme toggles. */
export const TOGGLE_CLASS = [GLYPH_CLASS, "glass size-8.5 rounded-round hover:border-soft md:size-9.5"].join(" ");
