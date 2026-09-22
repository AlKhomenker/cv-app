import type { CSSProperties } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Question } from "@/content";

export interface QuestionRowProps {
  item: Question;
  /** Its place in the list: its value, and when it arrives. */
  index: number;
  /** Where it has got to as the reader scrolls — see `utils/arrival.ts`. */
  style: CSSProperties;
}

/**
 * One question, and the answer under it.
 *
 * It is a Radix accordion item now. What that takes off this file is the whole
 * of the mechanism: which question is open, the heading/button/region markup,
 * `aria-expanded`, `aria-controls`, and the open itself — which Radix animates
 * from `--radix-accordion-content-height`, a height it MEASURES. The hand-
 * rolled `Collapse` did it as grid rows from `0fr` to `1fr` precisely because
 * it could not measure one; with a real number there is no trick needed.
 *
 * What stays is the only part that is this section's own: where the row has
 * got to as the reader scrolls, which is a transform the section paces and no
 * library has an opinion about.
 *
 * The question is centred with its chevron beside it rather than pushed out to
 * the inline end, so the row reads as one centred line like every other title
 * on this page. Nothing in it is placed by side, so there is no rule here for
 * Hebrew to mirror.
 */
export function QuestionRow({ item, index, style }: QuestionRowProps) {
  return (
    <AccordionItem className="origin-center" style={style} value={`question-${index}`}>
      <AccordionTrigger className="justify-center px-2 py-[clamp(7px,1.6vh,13px)] text-center">
        {item.q}
      </AccordionTrigger>
      <AccordionContent className="mx-auto max-w-[60ch] pb-[clamp(8px,1.8vh,16px)] text-center text-inherit">
        {item.a}
      </AccordionContent>
    </AccordionItem>
  );
}
