import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { Emerge } from "@/common/ui/Emerge";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { TAG_CLASS } from "@/common/utils/surfaces";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { StrengthRow } from "./ui/StrengthRow";
import { rowStyle, tailStyle } from "./utils/arrival";
import { ratingLabel } from "./utils/rating";

/**
 * Section 6. Eight strengths, each scored out of five, and the three languages
 * they are exercised in.
 *
 * They are one section because they are one answer. "What are you like to work
 * with, and what can you be worked with in" was two stops on the old scrolling
 * page with a rule between them, which made a reader scroll past a heading to
 * reach three words — and three words have never been a screen.
 *
 * Two cues, as everywhere on this stage. `active` is the SECTION arriving and
 * leaving, and the two titles answer it. `progress` is the reader's own place
 * inside the section: the rows come in one after another, each one counting
 * its own stars in behind it, and the languages land last. All of it is the
 * page's one entrance — out of the centre, slowly — so scrolling back up takes
 * the marks off in the order they were counted on.
 */
export function Strengths({ active, progress }: StageSectionProps) {
  const { content } = useLocale();
  const reduced = useReducedMotion();
  const items = content.strengths.items;

  // With motion off there is no counting to wait for: every mark is in place
  // from the first frame, which is what the section is once it has finished
  // arriving anyway.
  const at = reduced ? 1 : progress;

  return (
    <section className="relative h-full" id="strengths" aria-label={content.sections.strengths}>
      <Emerge shown={active || reduced} className="h-full">
        <div
          className="mx-auto flex h-full max-w-180 flex-col overflow-hidden
            justify-center-safe
            px-(--gutter) pt-[calc(var(--header-h)+8px)]
            pb-[calc(env(safe-area-inset-bottom,0px)+clamp(12px,3vh,36px))]
            md:px-8 md:pt-[calc(var(--header-h)+20px)]
            motion-reduce:block motion-reduce:overflow-y-auto motion-reduce:pb-10"
          tabIndex={reduced ? 0 : undefined}>
          <SectionTitle shown={active || reduced}>{content.strengths.title}</SectionTitle>

          <ul
            className="mt-[clamp(12px,3vh,30px)] flex flex-col gap-[clamp(7px,1.8vh,16px)]
              text-[clamp(0.78rem,min(3.4vw,2vh),0.98rem)]">
            {items.map((strength, index) => (
              <StrengthRow
                key={strength.label}
                strength={strength}
                index={index}
                at={at}
                style={rowStyle(index, at)}
                label={ratingLabel(content.ui.rating, strength)}
              />
            ))}
          </ul>

          {/* The languages, behind the last row rather than under a rule of
              their own. A pill and never a control: a language is not a filter. */}
          <div
            className="flex flex-col gap-4 mt-[clamp(16px,4vh,38px)] origin-center"
            style={tailStyle(items.length, at)}>
            <SectionTitle shown={active || reduced}>{content.languages.title}</SectionTitle>

            <ul className="mt-[clamp(6px,1.6vh,12px)] flex flex-wrap justify-center gap-4">
              {content.languages.items.map((name) => (
                <li key={name} className={TAG_CLASS}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Emerge>
    </section>
  );
}
