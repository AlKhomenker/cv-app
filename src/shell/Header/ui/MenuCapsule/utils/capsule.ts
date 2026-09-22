/**
 * The compact menu's geometry: one round control stretching into a column of
 * glyphs. Not a dropdown — one element grows, so its height is a NUMBER this
 * file counts out rather than something the layout arrives at.
 *
 * Every measurement here is also written as a Tailwind class somewhere in the
 * folder, and the two have to stay equal or the last glyph sits outside the
 * frame that is meant to hold it. `size` is the toggles' own size below `md`,
 * which is the only width the menu is ever drawn at — see `useNarrowScreen`.
 */
export const MENU = {
  /** The shut control, corner to corner, in px. Must match `size-8.5`. */
  size: 34,
  /** `.glass` draws a hairline, and a border box counts it at the top and the bottom. */
  border: 1,
  /**
   * The shortest an ENTRY row is allowed to get, in px.
   *
   * Ten sections plus the trigger is taller than a phone held sideways.
   * Rather than hide the last entries behind a scroll — a scroller clips, and
   * what it would clip is the labels beside the glyphs — the rows give up
   * height until the column fits. 26px still takes a finger.
   */
  minRow: 26,
  /** Hairline under the trigger. Must match the divider's `h-px`. */
  divider: 1,
  /** Space left between the open capsule and the bottom of the screen, in px. */
  margin: 12,
  /** Gap between two consecutive glyph appearances (ms). */
  stagger: 34
} as const;

/**
 * The trigger's own height, and the tallest an entry gets: the shut control
 * less the frame's two hairlines, because everything in the column is drawn
 * INSIDE the border. Must match the `h-8` on the trigger.
 */
export const ROW = MENU.size - 2 * MENU.border;

/**
 * How tall the capsule stands while it is open, corner to corner: the shut
 * control — which already counts both hairlines and the trigger between them
 * — then the divider and the entries under it.
 */
export const openHeight = (count: number, row: number) => MENU.size + MENU.divider + count * row;

/**
 * The tallest row that lets `count` of them fit in `space` — the distance from
 * the top of the shut capsule to the bottom of the screen, less the margin.
 *
 * It never grows a row past `ROW`: the menu is a column of controls, not a
 * column that fills whatever screen it is on.
 */
export const fitRow = (count: number, space: number) => {
  if (count <= 0) return ROW;

  const fits = Math.floor((space - MENU.size - MENU.divider) / count);
  return Math.max(MENU.minRow, Math.min(ROW, fits));
};
