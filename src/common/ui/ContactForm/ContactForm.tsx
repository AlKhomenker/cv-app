import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePanelGestures } from "@/common/hooks/usePanelGestures";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogPortal, DialogSurface, DialogTitle } from "@/components/ui/dialog";
import { useLocale } from "@/i18n";
import { useContactForm } from "./hooks/useContactForm";
import { FormRow } from "./ui/FormRow";

/** Off screen but still in the tab order's blind spot: a robot fills it, nobody else can. */
const HONEYPOT = "absolute size-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]";

export interface ContactFormProps {
  /** True once it has been asked to close. It is still drawn until it has gone. */
  leaving: boolean;
  /** How it is drawn: a centred dialog for a cursor, a sheet for a finger. */
  fine: boolean;
  onClose: () => void;
  /** Called when it has finished leaving and can be taken out of the document. */
  onClosed: () => void;
}

/**
 * The form. One of them, opened from two places — the button on the opening
 * screen and the button under the contact rows — with one set of fields and one
 * set of rules. What differs between the two places is nothing at all; what
 * differs between a cursor and a finger is only the shape it arrives in.
 *
 * **A cursor** gets a centred dialog over a blurred page: it is one thing among
 * several on a large screen, and covering all of it would lose the reader their
 * place. **A finger** gets a sheet that rises from the bottom edge and fills the
 * screen, with the submit pinned above the safe area, because a dialog floating
 * in the middle of a phone is a dialog with a keyboard over half of it.
 *
 * It is never in print. A sheet of paper cannot be typed into.
 *
 * The shell is a Radix dialog, taken `asChild` onto the backdrop this file
 * already had — so the markup and both shapes are unchanged and what is gained
 * is the part that was hand-rolled: the focus trap, Escape, `aria-modal`,
 * aria-hidden on the rest of the page, and focus going back to whatever opened
 * it. `forceMount` is what keeps Radix out of the way of the leave: the panel
 * is drawn until `usePanelGestures` says it has finished, because a finger can
 * fling it away and a fling is not a CSS animation Radix could wait for.
 */
export function ContactForm({ leaving, fine, onClose, onClosed }: ContactFormProps) {
  const { content } = useLocale();
  const form = useContactForm(content.contact);
  const { panelRef, scrollRef, state, dragging, drag } = usePanelGestures({ leaving, onClose, onClosed });
  const [confirmed, setConfirmed] = useState(false);

  // The confirmation fades in after the form has faded out, so that the two
  // never cross each other.
  useEffect(() => {
    if (form.status !== "sent") return;
    const id = requestAnimationFrame(() => setConfirmed(true));
    return () => cancelAnimationFrame(id);
  }, [form.status]);

  const sent = form.status === "sent";

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
          // Focus is given back by `useContactDialog`, which knows which of the
          // two buttons opened this one. Radix must not also move it, or the
          // two answers race and the loser wins.
          onCloseAutoFocus={(event) => event.preventDefault()}>
          <div
            ref={panelRef}
            className="fixed inset-0 z-50 grid opacity-0
        [background:rgb(0_0_0/0.28)] [backdrop-filter:blur(7px)]
        transition-opacity duration-(--dur) ease-page
        data-[state=open]:opacity-100 data-[state=flinging]:opacity-0
        data-[shape=dialog]:place-items-center data-[shape=dialog]:p-(--gutter)
        data-[shape=sheet]:items-end"
            data-state={state}
            data-shape={fine ? "dialog" : "sheet"}
            data-print="hide">
            <div
              className="relative flex w-full flex-col overflow-hidden border border-hair bg-glass-strong
          [backdrop-filter:blur(var(--glass-blur))_saturate(var(--glass-sat))]
          shadow-[inset_0_1px_0_var(--glass-edge),var(--glass-drop)]
          transition-[translate,scale] duration-(--dur) ease-page
          data-[dragging=true]:transition-none
          data-[shape=dialog]:max-w-[480px] data-[shape=dialog]:rounded-glass
          data-[shape=dialog]:translate-y-[14px] data-[shape=dialog]:scale-[0.985]
          data-[shape=dialog]:data-[state=open]:translate-y-0
          data-[shape=dialog]:data-[state=open]:scale-100
          data-[shape=sheet]:h-full data-[shape=sheet]:rounded-t-glass
          data-[shape=sheet]:translate-y-full
          data-[shape=sheet]:data-[state=open]:[translate:0_var(--drag,0px)]
          motion-reduce:translate-y-0! motion-reduce:scale-100!"
              style={{ "--drag": `${drag}px` } as React.CSSProperties}
              data-shape={fine ? "dialog" : "sheet"}
              data-state={state}
              data-dragging={dragging}>
              {/* Radix asks every dialog for a title. The form has one on its face
            already, but it is gone once the message has been sent, so the
            accessible name is stated here and stays whatever is on screen. */}
              <DialogTitle className="sr-only">{content.contact.title}</DialogTitle>
              {/* The handle is the swipe, drawn. Only on the sheet, because a cursor
            has the close control and never this. */}
              {!fine && (
                <span className="absolute inset-x-0 top-2 mx-auto h-1 w-10 rounded-full bg-hair" aria-hidden="true" />
              )}

              <div
                ref={scrollRef}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-(--gutter) pt-7 pb-2 md:px-7">
                {!sent && (
                  <form className="grid gap-4" id="contact-form" noValidate onSubmit={form.submit}>
                    <div>
                      <h2 className="font-serif text-ink text-[clamp(1.3rem,5vw,1.6rem)]">{content.contact.title}</h2>
                      <p className="mt-1 text-[0.92rem] text-soft">{content.contact.lede}</p>
                    </div>

                    {content.contact.fields.map((field) => (
                      <FormRow
                        key={field.name}
                        field={field}
                        value={form.values[field.name] ?? ""}
                        error={form.errors[field.name] ?? ""}
                        onChange={form.setValue}
                        onBlur={form.checkOnBlur}
                        onNode={form.registerField}
                      />
                    ))}

                    <label className={HONEYPOT} aria-hidden="true">
                      <span>Leave this empty</span>
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        onChange={(event) => form.setHoneypot(event.target.value)}
                      />
                    </label>

                    <p className="text-[0.9rem] text-soft" role="status" aria-live="polite">
                      {form.status === "failed" && (
                        <>
                          {content.contact.failure}{" "}
                          <a className="text-accent" href={form.mailto()}>
                            {content.contact.failureLink}
                          </a>
                        </>
                      )}
                      {form.status === "mailto" ? content.contact.mailtoNotice : null}
                    </p>
                  </form>
                )}

                {sent && (
                  <p
                    className="text-ink opacity-0 transition-opacity duration-(--dur) ease-page shown:opacity-100"
                    data-shown={confirmed}>
                    {content.contact.success}
                  </p>
                )}
              </div>

              {/* Pinned, and above the phone's own chin. A submit that scrolled with
            the fields is a submit nobody can find with a keyboard over it. */}
              {!sent && (
                <div
                  className="border-t border-hair px-(--gutter) pt-3 md:px-7
              pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
                  <Button className="w-full" type="submit" form="contact-form" busy={form.status === "sending"}>
                    {form.status === "sending" ? content.contact.sending : content.contact.submit}
                  </Button>
                </div>
              )}

              <DialogClose
                className="absolute top-3 inset-e-3 grid size-10 cursor-pointer place-items-center
            rounded-round border border-hair bg-glass text-ink
            transition-[border-color] duration-(--dur-fast) ease-page hover:border-accent"
                aria-label={content.ui.close}>
                <X className="size-5" strokeWidth={1.6} aria-hidden="true" />
              </DialogClose>
            </div>
          </div>
        </DialogSurface>
      </DialogPortal>
    </Dialog>
  );
}
