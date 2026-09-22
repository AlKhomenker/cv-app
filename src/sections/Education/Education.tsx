import { useState } from "react";
import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { Carousel, type CarouselApi } from "@/components/ui/carousel";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { useStack } from "./hooks/useStack";
import { Controls } from "./ui/Controls";
import { Deck } from "./ui/Deck";
import { buildDeck } from "./utils/cards";

/**
 * Section 5. A fanned deck: the two schools and the three prizes, one card
 * each, dealt through by the scroll or by the two carousel controls at the
 * foot of the screen.
 *
 * It is the one section that changes REGISTER. The face is an academic serif,
 * set lighter and larger than anything else on the page, and the cards are
 * paper rather than glass — a warm near-opaque fill with a fine line round it.
 * A degree and a set of prizes are a different kind of document from the rest
 * of a CV, and the reader is told so before a word of it is read. Section 6
 * goes back to the grotesque.
 *
 * **Nothing in it is a control except the two arrows.** A card is read, not
 * pressed: the prizes say what they are on their own faces.
 *
 * ## Two things can move it
 *
 * The **stage** owns the wheel and the finger for the whole page and publishes
 * a reading position. **Embla** owns the snaps, the bounds, the drag and the
 * tween. `useStack` binds them so that neither can go stale, and the fan is
 * drawn from Embla — see `ui/Deck.tsx`, which is where the reading of that
 * position actually happens.
 *
 * `watchDrag` is off. Embla's drag and the stage's own listeners answer the
 * same finger, and two things moving on one gesture is the reader losing both
 * — so the finger stays the stage's, and Embla is moved by the reading
 * position it publishes.
 */
export function Education({ active, progress, seek }: StageSectionProps) {
  const { content, dir } = useLocale();
  const reduced = useReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const { studies, studiesTitle, awards, awardsTitle } = content.education;
  const deck = buildDeck(studies, awards, { studies: studiesTitle, awards: awardsTitle });
  const rtl = dir === "rtl";

  useStack({ progress, count: deck.length, seek, api, active: active && !reduced });

  return (
    <section className="relative h-full font-academic" id="education" aria-label={content.sections.education}>
      <h2 className="sr-only">{content.education.title}</h2>

      {/* The page's one entrance, at its own duration but WITHOUT its scale —
          the one section that cannot use `common/ui/Emerge`.

          Embla measures the viewport with `getBoundingClientRect`, and it
          measures on mount, which is while this section is still off screen
          and would still be scaled down. `ui/Deck.tsx` then cancels Embla's
          own translation in viewport-widths, so measurements taken at 0.92
          and a correction computed at 1 disagree by 8% of a screen and the
          fan lands beside the deck. The fade is the half that is safe, and
          `--dur-reveal` is what matters here: a section that emptied in 340ms
          while its neighbour took 720 was the jump between them. */}
      <div
        className="h-full opacity-0 transition-opacity duration-(--dur-reveal) ease-page shown:opacity-100"
        data-shown={active || reduced}>
        <Carousel className="h-full" opts={{ watchDrag: false, duration: 24 }} setApi={setApi}>
          <Deck deck={deck} rtl={rtl} still={reduced} />
          {!reduced && <Controls rtl={rtl} />}
        </Carousel>
      </div>
    </section>
  );
}
