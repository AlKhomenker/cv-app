import { X } from "lucide-react";
import { Dialog, DialogClose, DialogPortal, DialogSurface, DialogTitle } from "@/components/ui/dialog";
import { useLocale } from "@/i18n";
import { useRolePanel } from "../hooks/useRolePanel";
import type { OpenRole } from "../hooks/useTimeline";
import { RoleBody } from "./RoleBody";

export interface RolePanelProps {
  open: OpenRole;
  /** True once it has been asked to close. It is still drawn until it has gone. */
  leaving: boolean;
  onClose: () => void;
  /** Called when it has finished leaving and can be taken out of the document. */
  onClosed: () => void;
}

/**
 * One role, filling the screen.
 *
 * It does not slide in from anywhere. It is drawn at full size from the first
 * frame and CLIPPED to the card the reader touched, and the clip opens to the
 * screen's edges while its corners ease out to square — so the card becomes
 * the screen rather than being replaced by one. Closing runs the identical
 * clip backwards into the same rectangle.
 *
 * The clip is what moves rather than a width and a height, because a panel
 * that grew by being laid out at six different sizes would re-wrap its text
 * six times on the way, and the reader would watch the words rearrange
 * themselves. Here the text is laid out once, at the size it ends at.
 *
 * Inside it the role sits in the middle of the screen rather than at the top
 * of one. A role is three short lines and a list, not a document, and a page
 * of text set against the top edge of a screen it does not fill reads as a
 * page that has been cut off.
 *
 * The open corner is 1px and not 0. `inset(... round 0)` is minified to
 * `inset(0)` on the way out of the build, which drops the radius component
 * altogether — and a shape with a radius does not reliably interpolate with
 * one that has none. A pixel is not a corner anybody can see and it keeps the
 * two shapes the same shape.
 */
export function RolePanel({ open, leaving, onClose, onClosed }: RolePanelProps) {
  const { content } = useLocale();
  const { panelRef, scrollRef, state, dragging, style, background } = useRolePanel({
    origin: open.origin,
    leaving,
    onClose,
    onClosed
  });

  return (
    <Dialog
      open
      onOpenChange={(next) => {
        if (!next) onClose();
      }}>
      <DialogPortal forceMount>
        <DialogSurface
          asChild
          forceMount
          aria-describedby={undefined}
          // Focus is given back by the timeline, which knows which card was
          // pressed and has to put the reader back on it. Radix must not also
          // move it, or the two answers race.
          onCloseAutoFocus={(event) => event.preventDefault()}>
          <div
            ref={panelRef}
            className="fixed inset-0 z-40 bg-glass-strong
        [backdrop-filter:blur(var(--glass-blur))_saturate(var(--glass-sat))]
        [clip-path:inset(var(--from-top)_var(--from-right)_var(--from-bottom)_var(--from-left)_round_24px)]
        transform-[translateY(var(--drag,0px))]
        transition-[clip-path,transform,translate,opacity] duration-(--dur-slow) ease-page
        data-[state=open]:[clip-path:inset(0px_0px_0px_0px_round_1px)]
        data-[state=flinging]:[clip-path:inset(0px_0px_0px_0px_round_1px)]
        data-[state=flinging]:translate-y-[100vh] data-[state=flinging]:opacity-0
        data-[dragging=true]:transition-none"
            style={style}
            data-state={state}
            data-dragging={dragging}>
            {/* The role's own heading is inside `RoleBody`, so the accessible name
          is stated here instead of pointed at: one source for it rather than
          an id this file and that one both have to agree about. */}
            <DialogTitle className="sr-only">{open.role.role}</DialogTitle>

            {/* The handle is the swipe, drawn. It is on the touch layouts only,
          because a pointer has the close control and never this. */}
            <span
              className="absolute inset-x-0 top-2 mx-auto h-1 w-10 rounded-full bg-hair md:hidden"
              aria-hidden="true"
            />

            {/* The text is first in the document and is a tab stop, so focus lands
          on the role rather than on the way out of it — and so an arrow key
          scrolls the thing the reader is reading. The close control is drawn
          in the corner but comes after it.

          It also carries the press that closes the role from the page around
          it: this box and the sheet inside it ARE that page, and everything
          else in here is the role — see `useRolePanel`. */}
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto overscroll-contain
          px-(--gutter) py-[clamp(56px,9vh,96px)]
          md:px-10"
              tabIndex={0}
              {...background}>
              {/* Centred when it fits and an ordinary scroller when it does not:
            `min-h-full` fills the padding box exactly, so `justify-center`
            has free space to divide only while there is any. The padding is
            symmetrical for the same reason — an asymmetrical one would centre
            the role somewhere just below the middle of the screen.

            `data-sheet` is what marks the room `justify-center` leaves above
            and below the role as page rather than as role. */}
              <div className="mx-auto flex min-h-full max-w-170 flex-col justify-center" data-sheet>
                <RoleBody role={open.role} full />
              </div>
            </div>

            <DialogClose
              className="absolute top-3 inset-e-3 z-1 grid size-11 cursor-pointer place-items-center
          rounded-round border border-hair bg-glass text-ink
          transition-[border-color] duration-(--dur-fast) ease-page hover:border-accent
          md:top-5 md:inset-e-5"
              aria-label={content.ui.close}>
              <X className="size-5" strokeWidth={1.6} aria-hidden="true" />
            </DialogClose>
          </div>
        </DialogSurface>
      </DialogPortal>
    </Dialog>
  );
}
