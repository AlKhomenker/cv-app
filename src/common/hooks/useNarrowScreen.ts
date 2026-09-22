import { useMediaQuery } from "./useMediaQuery";

/**
 * True below the design's `md` breakpoint — the width at which a row of
 * section names stops fitting across the top of the page.
 *
 * It is the one place that number is written in JavaScript, and it has to stay
 * in step with `--breakpoint-md` in `styles/tailwind.css`. The bar CHOOSES
 * between its two halves here rather than showing one and hiding the other
 * with a utility, because only one of them may exist: a hidden menu would
 * still be holding its open state, and a hidden row of names would still be in
 * the tab order.
 *
 * The bound is fractional on purpose. A window at 767.5px — a zoomed page, a
 * scaled display — matches neither `max-width: 767px` nor `min-width: 768px`,
 * and the bar would be left with no navigation at all.
 */
export function useNarrowScreen(): boolean {
  return useMediaQuery("(max-width: 767.98px)");
}
