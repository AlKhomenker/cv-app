import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { Emerge } from "@/common/ui/Emerge";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { useSkillPicker } from "./hooks/useSkillPicker";
import { SkillPicker } from "./ui/SkillPicker";
import { TopicRow } from "./ui/TopicRow";
import { freeOf } from "./utils/arrival";
import { topicsOf } from "./utils/topics";

/**
 * Section 4. Forty-two tools as five rows of badges, grouped by topic, each
 * badge arriving on its own as the reader scrolls.
 *
 * Two cues, as everywhere on this stage. `active` is the SECTION arriving and
 * leaving, and the heading is what answers it. `progress` is the reader's own
 * place inside the section, and the whole of the stagger is one function of
 * it, so scrolling back up takes the badges off in the order they came on —
 * there is no entrance animation and no exit animation, there is a position.
 *
 * One thing in it is a control, and it is over the rows rather than in them:
 * the combobox under the title, which names any number of tools and lights
 * exactly those, taking every other badge down to grey. Choosing nothing is
 * the section as it always was, every badge lit.
 *
 * A badge is still not a control. Every one of them used to be a button that
 * chose a category, which was the only way to name a cloud of colour; the
 * names are now the headings the badges sit under, and the question a reader
 * actually brings — "do they know X" — is asked once, by name, in one field.
 * Nothing is dragged either: a badge is a fact about the CV, and moving one
 * around never told the reader anything the row it sits in does not.
 */
export function Skills({ active, progress }: StageSectionProps) {
  const { content } = useLocale();
  const reduced = useReducedMotion();
  const topics = topicsOf(content.skills.groups);
  const picker = useSkillPicker(topics, active);

  // With motion off there is no stagger to wait for: every badge is in place
  // from the first frame, which is what the section is once it has finished
  // arriving anyway. The stage gives such a section no scroll of its own, so
  // the rows become an ordinary column that scrolls itself.
  const at = reduced ? 1 : progress;

  // The first row is not part of the stagger: it is in place before the reader
  // has scrolled at all, so the heading and the badges under it arrive
  // together on the section's own entrance rather than one after the other.
  const free = freeOf(topics);

  return (
    <section className="relative h-full" id="skills" aria-label={content.sections.skills}>
      <Emerge shown={active || reduced} className="h-full">
        <div
          /* `safe center` and not `center`: the rows are sized to fit a pinned
             screen, and if they ever did not, centring would clip the heading
             off the top of a section the reader cannot scroll. Safe alignment
             gives up the centring instead and keeps the overflow at the foot,
             where the badges that arrive last are. */
          className="mx-auto flex h-full max-w-215 flex-col overflow-hidden
            justify-center-safe
            px-(--gutter) pt-[calc(var(--header-h)+8px)]
            pb-[calc(env(safe-area-inset-bottom,0px)+clamp(12px,3vh,36px))]
            md:px-8 md:pt-[calc(var(--header-h)+20px)]
            motion-reduce:block motion-reduce:overflow-y-auto motion-reduce:pb-10"
          tabIndex={reduced ? 0 : undefined}>
          <SectionTitle shown={active || reduced}>{content.skills.title}</SectionTitle>

          <SkillPicker picker={picker} words={content.skills.filter} />

          <div className="mt-[clamp(8px,2vh,22px)] flex flex-col gap-[clamp(8px,1.8vh,18px)]">
            {topics.map((topic) => (
              <TopicRow key={topic.id} topic={topic} at={at} free={free} chosen={picker.chosen} />
            ))}
          </div>
        </div>
      </Emerge>
    </section>
  );
}
