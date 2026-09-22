import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { Emerge } from "@/common/ui/Emerge";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { Accordion } from "@/components/ui/accordion";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { QuestionRow } from "./ui/QuestionRow";
import { questionStyle } from "./utils/arrival";

/**
 * Section 7. The questions people ask, each opening to its answer.
 *
 * It is the one section that ANSWERS rather than presents, and the pace says
 * so: the questions arrive one after another over the first half, and then
 * nothing moves at all while the reader opens the ones they care about. A
 * reader reading an answer must not also be moving the section they are
 * reading it in.
 *
 * Two cues, as everywhere on this stage. `active` is the SECTION arriving and
 * leaving, and the title answers it. `progress` is the reader's own place
 * inside it, and the questions are the page's one entrance — out of the
 * centre, slowly — as a function of that number and of nothing else.
 *
 * Exactly one answer is open, and that is Radix's `type="single"` rather than
 * a hook of this section's own. It is real state and not a position — the
 * reader's choice rather than the scroll's — so it survives scrolling back and
 * forth over a question that is already open. `collapsible` is what lets the
 * open one be shut again, which a plain single accordion does not allow.
 */
export function Faq({ active, progress }: StageSectionProps) {
  const { content } = useLocale();
  const reduced = useReducedMotion();
  // With motion off every question is in place from the first frame, which is
  // what the section is once it has finished arriving anyway.
  const at = reduced ? 1 : progress;

  return (
    <section className="relative h-full" id="faq" aria-label={content.sections.faq}>
      <Emerge shown={active || reduced} className="h-full">
        <div
          className="mx-auto flex h-full max-w-180 flex-col gap-4 overflow-hidden
            justify-center-safe
            px-(--gutter) pt-[calc(var(--header-h)+8px)]
            pb-[calc(env(safe-area-inset-bottom,0px)+clamp(12px,3vh,36px))]
            md:px-8 md:pt-[calc(var(--header-h)+20px)]
            motion-reduce:block motion-reduce:overflow-y-auto motion-reduce:pb-10"
          tabIndex={reduced ? 0 : undefined}>
          <SectionTitle shown={active || reduced}>{content.faq.title}</SectionTitle>

          <Accordion className="text-[clamp(0.78rem,min(3.4vw,2vh),0.98rem)]" collapsible type="single">
            {content.faq.items.map((item, index) => (
              <QuestionRow
                key={item.q}
                item={item}
                index={index}
                style={questionStyle(index, content.faq.items.length, at)}
              />
            ))}
          </Accordion>
        </div>
      </Emerge>
    </section>
  );
}
