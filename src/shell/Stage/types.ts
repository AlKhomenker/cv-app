import type { ComponentType } from "react";
import type { StageSectionId } from "@/content";

export interface StageSectionProps {
  /**
   * Whether this is the section on screen. It is what a section animates on:
   * false is not only "hidden", it is the cue to empty itself, and the stage
   * waits `--reveal-out` before covering it.
   */
  active: boolean;
  /**
   * How far through this section the reader has scrolled, 0 to 1. It is 0 for
   * a section that did not ask for the scroll by declaring a `depth`, and
   * that section should ignore it.
   *
   * There is no separate entrance and exit inside a section that uses it:
   * one value, read forwards going down and backwards coming up.
   */
  progress: number;
  /**
   * Puts the reader somewhere else inside this section, 0 to 1 — the same
   * value {@link progress} reports, written rather than read.
   *
   * The wheel and the finger are the stage's business, and a section never
   * touches them. This is for the one thing a gesture cannot express: a jump
   * to a NAMED place inside the section, which is what an arrow key on a
   * timeline of six roles means. Everything downstream still reads `progress`,
   * so a
   * seek and a scroll are the same event to everything that draws.
   *
   * It does nothing for a section that declared no depth — there is nowhere
   * inside it to be.
   */
  seek: (value: number) => void;
  /**
   * Move to anywhere on the page, by the id of a stage section or of one that
   * has not been rewritten yet. The section does not know which it is asking
   * for, and does not know whether the stage has to let go first.
   */
  onNavigate: (id: string) => void;
}

export interface StageSection {
  id: StageSectionId;
  Component: ComponentType<StageSectionProps>;
  /**
   * How much scroll this section takes for itself, in viewport heights. Left
   * out, one gesture steps past it. Given, the gesture moves `progress`
   * inside it instead, and only a gesture made at either end steps out —
   * which is how a section sets its own reading pace.
   *
   * It is ignored under reduced motion: a section that is not animating has
   * no pace to set, and the scroll it would have taken would be spent on
   * nothing moving.
   */
  depth?: number;
  /**
   * How quiet the background should be while this section is on screen, 0 to
   * 1. A section with text to read asks for 1 so the light behind it stops
   * competing; the field eases there and back rather than switching, so the
   * change happens as the section before it collapses.
   */
  calm?: number;
}
