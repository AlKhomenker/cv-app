import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { Emerge } from "@/common/ui/Emerge";
import { LineReveal } from "@/common/ui/LineReveal";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { PersonCard } from "./ui/PersonCard";
import { cardStyle } from "./utils/arrival";

/**
 * Section 8. Four people who will vouch for the work, each card a link to
 * their profile.
 *
 * It is the last thing that was still living in the scrolling document under
 * the stage, and the reason it went last is the reason it belongs here: it is
 * the one section that asks the reader to LEAVE, and a page that hands over a
 * link from a half-remembered column at the bottom is not handing it over at
 * all. It sits where it sat in the old order — after what the person is like
 * to work with, before the questions about them.
 *
 * Two cues, as everywhere on this stage. `active` is the SECTION arriving and
 * leaving, and the title and its line answer it. `progress` is the reader's
 * own place inside it: the cards come in one after another over the first
 * half, and then nothing moves, because a reader deciding whether to open a
 * profile must not be moving the section while they decide.
 */
export function Recommendations({ active, progress }: StageSectionProps) {
  const { content } = useLocale();
  const reduced = useReducedMotion();
  const { title, lede, cta, items } = content.recommendations;

  // With motion off every card is in place from the first frame, which is what
  // the section is once it has finished arriving anyway.
  const at = reduced ? 1 : progress;

  return (
    <section className="relative h-full" id="recommendations" aria-label={content.sections.recommendations}>
      <Emerge shown={active || reduced} className="h-full flex flex-col gap-4">
        <div
          className="mx-auto flex h-full max-w-215 flex-col gap-4 overflow-hidden
            justify-center-safe
            px-(--gutter) pt-[calc(var(--header-h)+8px)]
            pb-[calc(env(safe-area-inset-bottom,0px)+clamp(12px,3vh,36px))]
            md:px-8 md:pt-[calc(var(--header-h)+20px)]
            motion-reduce:block motion-reduce:overflow-y-auto motion-reduce:pb-10"
          tabIndex={reduced ? 0 : undefined}>
          <SectionTitle shown={active || reduced}>{title}</SectionTitle>

          <p
            className="text-center text-soft
              text-[clamp(0.78rem,min(3.2vw,1.9vh),0.95rem)]">
            <LineReveal shown={active || reduced}>{lede}</LineReveal>
          </p>

          <ul
            className="grid gap-[clamp(7px,1.6vh,14px)]
              text-[clamp(0.8rem,min(3.4vw,2vh),0.98rem)]
              md:grid-cols-2">
            {items.map((person, index) => (
              <PersonCard key={person.id} person={person} cta={cta} style={cardStyle(index, at)} />
            ))}
          </ul>
        </div>
      </Emerge>
    </section>
  );
}
