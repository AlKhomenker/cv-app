import { badgeStyle, headingStyle } from "../utils/arrival";
import { isLit, isTopicLit } from "../utils/picker";
import type { Topic } from "../utils/topics";
import { Badge } from "./Badge";

export interface TopicRowProps {
  topic: Topic;
  /** The reader's place in the section, 0 to 1, or 1 with motion turned off. */
  at: number;
  /** How many badges are in before the scroll starts — see `utils/arrival.ts`. */
  free: number;
  /** The keys the combobox has lit. Empty is every tool, which is the default. */
  chosen: ReadonlySet<string>;
}

/**
 * One topic: its name, and its tools wrapped under it.
 *
 * `data-topic` is set once, here, and `theme.css` answers it with the row's
 * hue — so the heading's dot and every badge below it are drawn in one colour
 * without a single one of them being told which colour that is.
 *
 * The row is a real heading over a real list, in the content's own order,
 * which is the order a screen reader reads it in whatever the scroll is doing.
 * The stagger moves the same nodes; it never keeps a second copy of them.
 *
 * The first row is not staggered at all: it is in place from the first frame,
 * so it arrives with the section's title rather than after it. Everything
 * under it still fills badge by badge as the reader scrolls.
 *
 * A choice made above dims what it did not name — the badges one by one, and
 * the heading too once nothing under it is lit, so a topic the reader did not
 * ask about reads as one quiet block rather than as a live name over grey.
 */
export function TopicRow({ topic, at, free, chosen }: TopicRowProps) {
  return (
    <div data-topic={topic.id} className="flex flex-col gap-4">
      <h3
        className="flex origin-center items-center gap-2 font-semibold leading-none text-soft
          text-[clamp(0.7rem,min(3vw,1.8vh),0.9rem)]
          transition-[filter] duration-(--dur) ease-page
          data-[lit=false]:[filter:grayscale(1)_opacity(0.5)]"
        data-lit={isTopicLit(chosen, topic)}
        style={headingStyle(topic.order, free, at)}>
        <span className="size-1.75 flex-none rounded-full bg-(--hue)" aria-hidden="true" />
        {topic.label}
      </h3>

      <ul
        className="mt-[clamp(4px,1vh,9px)] flex flex-wrap gap-1
          text-[clamp(0.56rem,min(2.6vw,1.6vh),0.78rem)]
          md:gap-2">
        {topic.skills.map((skill) => (
          <Badge
            key={skill.key}
            skill={skill}
            style={badgeStyle(skill.order, free, at)}
            lit={isLit(chosen, skill.key)}
          />
        ))}
      </ul>
    </div>
  );
}
