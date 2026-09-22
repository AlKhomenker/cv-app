import type { StageSection } from "./types";
import { StageSlide } from "./ui/StageSlide";
import type { ProgressSource } from "./utils/progress";

export interface StageProps {
  sections: readonly StageSection[];
  /** Which section is drawn. */
  index: number;
  /** False while the loader is still on screen; nothing lights up before then. */
  ready: boolean;
  /** How far through each section the reader is — see `utils/progress.ts`. */
  progress: ProgressSource;
  /** Lets the section on screen move its own reading position — see `types.ts`. */
  onSeek: (value: number) => void;
  onNavigate: (id: string) => void;
}

/**
 * The pinned viewport the rewritten sections are drawn in, one at a time.
 *
 * Every section is drawn in the same box. Only the current one is visible, so
 * a step is a change in place — two sections are never side by side, so there
 * is no edge between them to see. The slide does not fade: its contents empty
 * themselves line by line and the box waits `--reveal-out` for that, because a
 * fade over the top would cut the cascade off half-way.
 *
 * What draws a slide is `data-current`, NOT `data-active`. The difference is
 * the loader: the section on screen is drawn from the first frame, behind the
 * loader, so every line inside it has been rendered at its start value by the
 * time the loader goes. `visibility: hidden` is inherited and means a
 * descendant is not rendered at all. `data-active` is the ANIMATION cue and
 * arrives later.
 *
 * The scroll position inside a section is subscribed to by the SLIDE rather
 * than passed down from the page, so a reader moving through a section
 * re-renders that section and nothing else.
 *
 * `flip` is the language turn, and it is on this element because the stage IS
 * the page now. The rule in `base.css` used to say it moves only what is in
 * flow and never a fixed element — that was written when the content it had to
 * turn was a scrolling document under here. There is no document any more, so
 * the whole stage slides eight pixels and fades while the strings swap, which
 * is the same three beats `i18n/hooks/usePageTurn.ts` has always run.
 *
 * Transforming a FIXED element is not the hazard the old rule was avoiding —
 * a transform on an ANCESTOR of one is, because it makes that ancestor the
 * fixed child's containing block. This element is the fixed one, and it is
 * already the size of the viewport, so a dialog inside it is unaffected.
 */
export function Stage({ sections, index, ready, progress, onSeek, onNavigate }: StageProps) {
  return (
    <div className="flip fixed inset-0 z-10" data-print="hide">
      {sections.map((section, position) => (
        // Two flags, not one. `current` is whether this is the slide on
        // screen, and it is what draws it. `active` adds the loader's
        // verdict, and it is what the section animates on.
        <StageSlide
          key={section.id}
          section={section}
          position={position}
          current={position === index}
          active={ready && position === index}
          progress={progress}
          onSeek={onSeek}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
