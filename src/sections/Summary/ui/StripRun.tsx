import { Ltr } from "@/common/ui/Ltr";
import type { TextRun } from "../utils/runs";

export interface StripRunProps {
  run: TextRun;
}

/**
 * One piece of a sentence: the accent number, a Latin run that has to keep
 * its own direction, or ordinary text that needs neither.
 *
 * The highlight is a `--beam`, not a `--tint`: the tints are background light
 * and vanish the moment they are asked to be a word.
 */
export function StripRun({ run }: StripRunProps) {
  if (run.accent) {
    return (
      <span className="font-medium text-(--beam-3)" dir="ltr">
        {run.text}
      </span>
    );
  }
  if (run.ltr) return <Ltr>{run.text}</Ltr>;
  return <>{run.text}</>;
}
