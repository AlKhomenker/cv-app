import { badgeStyle, headingStyle } from "../utils/arrival";
import { isLit, isTopicLit } from "../utils/picker";
import type { Topic } from "../utils/topics";
import { Badge } from "./Badge";

export interface TopicRowProps {
  topic: Topic;
  at: number;
  free: number;
  chosen: ReadonlySet<string>;
}

/** One topic: its name, and its tools wrapped under it. See `../README.md`. */
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
