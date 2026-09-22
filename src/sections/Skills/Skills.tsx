import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { Emerge } from "@/common/ui/Emerge";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { useRowsFit } from "./hooks/useRowsFit";
import { useSkillPicker } from "./hooks/useSkillPicker";
import { SkillPicker } from "./ui/SkillPicker";
import { TopicRow } from "./ui/TopicRow";
import { freeOf, panAt } from "./utils/arrival";
import { topicsOf } from "./utils/topics";

/**
 * Section 4. Five rows of badges paced by the reading position, under one
 * combobox that picks which of the tools are lit. See `README.md`.
 */
export function Skills({ active, progress }: StageSectionProps) {
  const { content } = useLocale();
  const reduced = useReducedMotion();
  const topics = topicsOf(content.skills.groups);
  const picker = useSkillPicker(topics, active);
  const fit = useRowsFit();

  const at = reduced ? 1 : progress;
  const free = freeOf(topics);
  const shift = reduced ? 0 : fit.hidden * panAt(progress);

  return (
    <section className="relative h-full" id="skills" aria-label={content.sections.skills}>
      <Emerge shown={active || reduced} className="h-full">
        <div
          className="mx-auto flex h-full max-w-215 flex-col overflow-hidden
            justify-center-safe
            px-(--gutter) pt-[calc(var(--header-h)+8px)]
            pb-[calc(env(safe-area-inset-bottom,0px)+clamp(12px,3vh,36px))]
            md:px-8 md:pt-[calc(var(--header-h)+20px)]
            motion-reduce:block motion-reduce:overflow-y-auto motion-reduce:pb-10"
          tabIndex={reduced ? 0 : undefined}>
          <SectionTitle shown={active || reduced} className="shrink-0">
            {content.skills.title}
          </SectionTitle>

          <SkillPicker picker={picker} words={content.skills.filter} className="shrink-0" />

          <div
            ref={fit.viewport}
            className="mt-[clamp(8px,2vh,22px)] min-h-0 overflow-hidden motion-reduce:overflow-visible">
            <div
              ref={fit.rows}
              className="flex flex-col gap-[clamp(8px,1.8vh,18px)] will-change-[translate]"
              style={{ translate: `0 ${(-shift).toFixed(1)}px` }}>
              {topics.map((topic) => (
                <TopicRow key={topic.id} topic={topic} at={at} free={free} chosen={picker.chosen} />
              ))}
            </div>
          </div>
        </div>
      </Emerge>
    </section>
  );
}
