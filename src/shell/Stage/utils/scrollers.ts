/** How far up the tree a pane that takes its own scroll can sit. */
const REACH = 6;

/**
 * Whether this gesture belongs to a pane inside the section rather than to the
 * stage.
 *
 * Under reduced motion a section is allowed to lay its text out as an ordinary
 * column, and an ordinary column has to be able to scroll. The stage calls
 * `preventDefault()` on every wheel and every touch, so without this it would
 * swallow the gesture meant for that column and the text below the fold would
 * be unreachable.
 *
 * It is asked ONLY under reduced motion, because that is the only layout that
 * puts a real scroller on the stage — a `getComputedStyle` per ancestor per
 * wheel event is not something to pay on every frame of a page that has no
 * scroller in it at all.
 */
export function absorbedByPane(target: EventTarget | null, delta: number): boolean {
  let node = target instanceof Element ? target : null;

  for (let step = 0; node && step < REACH; step += 1) {
    if (takesScroll(node, delta)) return true;
    node = node.parentElement;
  }
  return false;
}

function takesScroll(node: Element, delta: number): boolean {
  const overflow = getComputedStyle(node).overflowY;
  if (overflow !== "auto" && overflow !== "scroll") return false;

  // A pane at its end has nothing left to absorb, which is what hands the
  // gesture back to the stage and lets the reader out of the section.
  const room = node.scrollHeight - node.clientHeight;
  if (room <= 1) return false;
  return delta > 0 ? node.scrollTop < room - 1 : node.scrollTop > 0;
}
