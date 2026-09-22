import { type CSSProperties, type PointerEvent, useRef } from "react";
import { type PanelGestures, usePanelGestures } from "@/common/hooks/usePanelGestures";

/**
 * How far the pointer may travel between press and release and still count as
 * a press on the page rather than a drag across it.
 *
 * It is what keeps two other gestures from closing the panel by accident: a
 * finger that pulled it down a little and let go without passing the swipe's
 * own threshold, and a hand that selected a line of the role and released
 * over the margin beside it.
 */
const SLOP = 6;

export interface RolePanelInput {
  /** Where the card was when it was tapped. The panel grows out of it. */
  origin: DOMRect;
  /** True once the panel has been asked to close and is on its way out. */
  leaving: boolean;
  onClose: () => void;
  onClosed: () => void;
}

export interface RolePanel extends Omit<PanelGestures, "drag"> {
  /** The rectangle it grew out of and the finger's offset, for the stylesheet. */
  style: CSSProperties;
  /** Spread on the scroller: a press on the page AROUND the role closes it. */
  background: {
    onPointerDown: (event: PointerEvent<HTMLElement>) => void;
    onPointerUp: (event: PointerEvent<HTMLElement>) => void;
    onPointerCancel: () => void;
  };
}

/**
 * One role filling the screen, as a clip that opens out of the card that was
 * touched.
 *
 * Everything a panel on this page has in common — who owns the input, where
 * focus is, when it has finished leaving, the swipe that closes it — is in
 * `usePanelGestures`. What is left here is what is this panel's own: the
 * rectangle it grew out of, written as four insets the stylesheet turns into a
 * `clip-path`, and the press on the page around the role.
 *
 * ## Pressing the page closes the role
 *
 * The panel covers the whole screen, so there is no backdrop beside it to
 * press — what stands in for one is the space AROUND the words: the margins
 * either side of the column, and the room above and below it. A press that
 * begins and ends on that space and travels almost nowhere in between closes
 * the role, the same way a press beside a dialog would.
 *
 * "On that space" is the press landing on the scroller itself or on the sheet
 * inside it, rather than on anything the role drew. Nothing is marked as text
 * for this: the two boxes are known and everything else in there is the role.
 *
 * It is a press and not a click, because a click cannot tell the difference
 * between the three things that end in the same place. A drag DOWN is the
 * swipe that closes it, and it must not close it twice; a drag down that gave
 * up half way is a reader who decided NOT to close it, and a click would close
 * it anyway; and a drag ACROSS the words is somebody selecting a line, whose
 * click lands on whichever box holds both ends of the selection. All three
 * move, so all three are told apart by `SLOP` — and the selection is checked
 * as well, because one can be made without the pointer moving far at all.
 *
 * It lives here rather than in `usePanelGestures` on purpose. The other panel
 * on that hook is the contact form, and a form that threw away what somebody
 * had typed because they pressed next to a field would be a bug, not a
 * convenience.
 */
export function useRolePanel({ origin, leaving, onClose, onClosed }: RolePanelInput): RolePanel {
  const { panelRef, scrollRef, state, dragging, drag } = usePanelGestures({ leaving, onClose, onClosed });
  const opened = useRef(false);
  const from = useRef({ x: 0, y: 0 });

  const around = (event: PointerEvent<HTMLElement>) =>
    event.target === event.currentTarget ||
    (event.target instanceof HTMLElement && event.target.dataset.sheet !== undefined);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    opened.current = around(event);
    from.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const began = opened.current;
    opened.current = false;
    if (!began || !around(event)) return;
    if (Math.hypot(event.clientX - from.current.x, event.clientY - from.current.y) > SLOP) return;
    if (window.getSelection()?.isCollapsed === false) return;
    onClose();
  };

  return {
    panelRef,
    scrollRef,
    state,
    dragging,
    style: {
      "--from-top": `${Math.round(origin.top)}px`,
      "--from-right": `${Math.round(window.innerWidth - origin.right)}px`,
      "--from-bottom": `${Math.round(window.innerHeight - origin.bottom)}px`,
      "--from-left": `${Math.round(origin.left)}px`,
      "--drag": `${drag}px`
    } as CSSProperties,
    background: {
      onPointerDown,
      onPointerUp,
      onPointerCancel: () => {
        opened.current = false;
      }
    }
  };
}
