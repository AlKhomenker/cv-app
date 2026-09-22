import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { useFinePointer } from "@/common/hooks/useFinePointer";
import { Button } from "@/components/ui/button";
import { ContactForm, useContactDialog } from "@/common/ui/ContactForm";
import { Emerge } from "@/common/ui/Emerge";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { useCopyRow } from "./hooks/useCopyRow";
import { ContactRow } from "./ui/ContactRow";
import { rowsDone, rowStyle } from "./utils/rows";

/**
 * Section 6. Four rows and one button.
 *
 * The register comes back: the grotesque after section 5's academic serif, and
 * glass after its paper. So does the quiet — this is the one section that asks
 * the reader for something rather than for their attention, and nothing in it
 * moves once the rows have arrived. The whole of its motion is four rows rising
 * eighteen pixels, one after another, and then stopping.
 *
 * The arrival is a function of `progress` and of nothing else, which is the
 * whole of what "the rows accumulate rather than pass through" needs: a row
 * that has arrived stays, because the value is still 1 at any greater reading
 * position, and scrolling back up retracts them in reverse order for free.
 *
 * The four contacts are real links, in order, whatever the scroll is doing.
 */
export function Contacts({ active, progress }: StageSectionProps) {
  const { content } = useLocale();
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const rows = content.contacts.items;
  const { copied, copy } = useCopyRow();
  const dialog = useContactDialog();

  // Under reduced motion there is no stagger to wait for: everything is in
  // place from the first frame, which is what the whole section is once it has
  // finished arriving anyway.
  const at = reduced ? 1 : progress;

  return (
    <section className="relative h-full" id="contacts" aria-label={content.sections.contacts}>
      <Emerge shown={active || reduced} className="h-full">
        <div
          className="mx-auto flex h-full max-w-140 flex-col gap-4 justify-center
            px-(--gutter) pt-[calc(var(--header-h)+16px)]
            pb-[calc(env(safe-area-inset-bottom,0px)+clamp(24px,5vh,48px))]
            md:px-6">
          <SectionTitle shown={active || reduced}>{content.contacts.title}</SectionTitle>

          <div className="flex flex-col">
            {rows.map((line, index) => (
              <ContactRow
                key={line.kind}
                line={line}
                style={rowStyle(index, at)}
                fine={fine}
                copied={copied === line.kind}
                onCopy={copy}
              />
            ))}
          </div>

          <div
            className="mt-[clamp(20px,5vh,40px)] flex justify-center transition-opacity duration-(--dur) ease-page"
            style={{ opacity: rowsDone(rows.length, at).toFixed(3) }}>
            <Button ref={dialog.opener} className="w-full md:w-auto" onClick={dialog.open}>
              {content.contact.title}
            </Button>
          </div>
        </div>
      </Emerge>

      {dialog.shown && (
        <ContactForm leaving={dialog.leaving} fine={fine} onClose={dialog.close} onClosed={dialog.onClosed} />
      )}
    </section>
  );
}
