import { useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { cardProgress, currentCard, stackLine, warmth } from "../utils/stack";

export interface StackInput {
  /** The stage's reading position inside the section, 0 to 1. */
  progress: number;
  count: number;
  /** Puts the reader somewhere else inside the section — the stage's own. */
  seek: (value: number) => void;
  /** Embla's, once the carousel has mounted. */
  api: CarouselApi;
  active: boolean;
}

/**
 * Binds the stage's scroll and the carousel to each other, and warms the light.
 *
 * Two things can move this deck and they have to agree. The **stage** owns the
 * wheel and the finger for the whole page and publishes a reading position;
 * **Embla** owns the snaps, the bounds, the drag and the tween between cards.
 * Left alone they would fight: a press on a carousel control would move Embla,
 * and the next wheel event would snap the deck back to where the stage still
 * thought it was.
 *
 * So the binding runs both ways, and each side writes only when the two
 * actually differ — which is what stops the pair oscillating.
 *
 * - the stage's position picks a card, and Embla is told to go there,
 * - Embla's own `select` writes that card back to the stage.
 *
 * What is deliberately NOT here any more is the snap. Embla snaps; a second
 * one on a timer was this section's answer to not having a carousel.
 */
export function useStack({ progress, count, seek, api, active }: StackInput): void {
  const line = stackLine(progress, count);
  const target = currentCard(line);

  /**
   * The light behind the page warms as the first card is dealt.
   *
   * It is written on the document rather than passed down, for the same reason
   * the stage's lock is: what changes is the page. `BlobField` reads it out of
   * its own filter, and it is cleared when the section leaves so that nothing
   * else on the page is left warm.
   */
  useEffect(() => {
    const root = document.documentElement;
    if (!active) {
      root.style.removeProperty("--field-warm");
      return;
    }
    root.style.setProperty("--field-warm", warmth(line).toFixed(3));
    return () => {
      root.style.removeProperty("--field-warm");
    };
  }, [active, line]);

  // The scroll chooses a card.
  useEffect(() => {
    if (!api) return;
    if (api.selectedScrollSnap() !== target) api.scrollTo(target);
  }, [api, target]);

  // And a card chosen any other way — a control, a drag, an arrow key — is
  // written back, so the reading position the stage holds is never stale.
  //
  // The pair cannot oscillate, because each side writes only a value the other
  // already agrees with: after this `seek` the stage's position IS the snap
  // Embla just landed on, so the effect above finds nothing to do.
  useEffect(() => {
    if (!api) return;
    const sync = () => seek(cardProgress(api.selectedScrollSnap(), count));
    api.on("select", sync);
    return () => {
      api.off("select", sync);
    };
  }, [api, count, seek]);
}
