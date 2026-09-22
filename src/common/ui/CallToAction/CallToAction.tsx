import type { CSSProperties } from "react";
import { useFinePointer } from "@/common/hooks/useFinePointer";
import { Button } from "@/components/ui/button";
import { ContactForm, useContactDialog } from "@/common/ui/ContactForm";
import { LineReveal } from "@/common/ui/LineReveal";
import { DownloadCv } from "@/features/pdf";
import { useLocale } from "@/i18n";

export interface CallToActionProps {
  /** The section's own `active`. The pair rises and leaves with its lines. */
  shown: boolean;
  /** Where the row sits: the gap above it, and an origin if it is scaled. */
  className?: string;
  /** For a section that drives the row from the reading position. */
  style?: CSSProperties;
}

/**
 * The two things the page exists to ask for: write to me, and download the CV.
 *
 * Sections 1 and 7 both end on this pair, and they end on THIS FILE — not on
 * two copies of it that happen to agree today. A reader who meets the pair
 * again at the bottom of the page is meant to recognise it as the same pair,
 * which is a promise two implementations cannot keep: the closing's copy had
 * already grown a second border and a second label colour before anybody
 * noticed the two screens no longer matched.
 *
 * So the buttons, their labels, the dialog and the form it opens are all
 * decided here — and the download is one of them, `features/pdf`'s own
 * `DownloadCv`, because a link to a file is not a button with a handler and
 * neither section should be the one deciding that. A section may say where the row sits and what
 * size it is — `className` and `style`, which is all the two callers differ by
 * — and nothing else.
 *
 * The form is opened here rather than by sending the reader to section 6 for
 * it, and it is the same `ContactForm` that section opens. `useContactDialog`
 * is per caller because each has its own button to give focus back to; the
 * form itself knows nothing about who opened it.
 */
export function CallToAction({ shown, className, style }: CallToActionProps) {
  const { content } = useLocale();
  const fine = useFinePointer();
  const dialog = useContactDialog();

  return (
    <>
      <div
        className={["flex flex-wrap justify-center gap-2.5", className].filter(Boolean).join(" ")}
        style={style}
        data-print="hide">
        <LineReveal shown={shown}>
          <Button ref={dialog.opener} onClick={dialog.open}>
            {content.opening.write}
          </Button>
        </LineReveal>
        <LineReveal shown={shown}>
          <DownloadCv />
        </LineReveal>
      </div>

      {dialog.shown && (
        <ContactForm leaving={dialog.leaving} fine={fine} onClose={dialog.close} onClosed={dialog.onClosed} />
      )}
    </>
  );
}
