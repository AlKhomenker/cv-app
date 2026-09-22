import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Something that fills the screen and takes the page's attention while it is
 * there: the contact form, a role opened out of the timeline.
 *
 * Radix owns the parts that were hand-rolled and are the same every time — the
 * focus trap, the return of focus to whatever opened it, Escape, `aria-modal`,
 * the inertness of everything behind. `common/utils/focusTrap.ts` went with
 * this file.
 *
 * What it does NOT own is the gesture. The stage holds the wheel and the
 * finger for the whole page, and a panel standing open has to take them back
 * before the stage sees them — one window listener in the capture phase, which
 * is `common/hooks/usePanelGestures.ts` and stays. Radix has no opinion about a
 * page whose scroll is not the document's.
 *
 * The open animation is per panel and lives at the call site, because it is
 * the one part that is genuinely each panel's own: a role grows by opening a
 * clip, the form rises from the foot of the screen.
 */
export const Dialog = DialogPrimitive.Root;
/**
 * The dialog element itself, unstyled and unpositioned.
 *
 * `DialogContent` below is the ordinary case: a portal, an overlay and a
 * full-screen panel with a close control. The two panels on this page are not
 * the ordinary case — one is a sheet that rises from the bottom edge on a
 * phone and a centred box under a cursor, the other grows out of the rectangle
 * of the card that was pressed — so they take this and position themselves,
 * usually through `asChild` onto a div they already had.
 */
export const DialogSurface = DialogPrimitive.Content;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-40 bg-page/40 backdrop-blur-[2px]",
        "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
        className
      )}
      {...props}
    />
  );
}

export interface DialogContentProps extends ComponentProps<typeof DialogPrimitive.Content> {
  /** The word on the corner control. Left out, no control is drawn. */
  closeLabel?: string;
}

export function DialogContent({ className, children, closeLabel, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-0 z-50 bg-glass-strong",
          "[backdrop-filter:blur(var(--glass-blur))_saturate(var(--glass-sat))]",
          "focus:outline-none",
          className
        )}
        {...props}>
        {children}

        {closeLabel && (
          <DialogPrimitive.Close
            className="absolute top-3 end-3 z-1 grid size-11 cursor-pointer place-items-center
              rounded-round border border-hair bg-glass text-ink
              transition-[border-color] duration-(--dur-fast) ease-page hover:border-accent
              md:top-5 md:end-5"
            aria-label={closeLabel}>
            <X className="size-5" strokeWidth={1.6} aria-hidden="true" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}
