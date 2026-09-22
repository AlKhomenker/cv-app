import { useStageProgress } from "../hooks/useStageProgress";
import type { StageSection } from "../types";
import type { ProgressSource } from "../utils/progress";

export interface StageSlideProps {
  section: StageSection;
  /** Where this section sits in the stage's order — also its progress key. */
  position: number;
  /** Whether this is the slide on screen. What DRAWS it; see `Stage.tsx`. */
  current: boolean;
  /** `current` plus the loader's verdict. What the section ANIMATES on. */
  active: boolean;
  progress: ProgressSource;
  onSeek: (value: number) => void;
  onNavigate: (id: string) => void;
}

/**
 * One section in the stage's box, and the reason the subscription is here
 * rather than a level up.
 *
 * Each slide watches its OWN reading position. A wheel event inside the
 * experience therefore re-renders that section and nothing else — not the
 * summary behind it,
 * not the stage, and not the page under both.
 */
export function StageSlide({ section, position, current, active, progress, onSeek, onNavigate }: StageSlideProps) {
  const travelled = useStageProgress(progress, position);

  return (
    <div
      className="pointer-events-none invisible absolute inset-0
        [transition:visibility_0s_linear_var(--reveal-out)]
        current:pointer-events-auto current:visible current:[transition:visibility_0s]"
      data-current={current}
      data-active={active}
      inert={!active}>
      <section.Component active={active} progress={travelled} seek={onSeek} onNavigate={onNavigate} />
    </div>
  );
}
