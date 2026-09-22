import { CarouselContent, CarouselItem, CarouselViewport, useCarousel } from "@/components/ui/carousel";
import type { Card } from "../utils/cards";
import { cardStyle } from "../utils/stack";
import { StackCard } from "./StackCard";

export interface DeckProps {
  deck: readonly Card[];
  rtl: boolean;
  still: boolean;
}

/**
 * The five cards, in the carousel's own track and piled on top of each other.
 *
 * It reads the carousel's `line` rather than the stage's reading position, and
 * that is the point of the file: the fan has to be placed from where Embla
 * ACTUALLY is, mid-tween and all, or the deck would jump to its next state the
 * moment the stage decided on one. `line` is Embla's `scrollProgress` put back
 * on the scale the snaps are counted in — see `components/ui/carousel.tsx`.
 *
 * Each card then undoes the track it is sitting in. Embla translates the
 * container, so slide `i` is `(i - line)` viewport-widths from the middle; the
 * first term of every card's transform cancels exactly that, and what is left
 * is the fan. See `utils/stack.ts`.
 */
export function Deck({ deck, rtl, still }: DeckProps) {
  const { line } = useCarousel();

  return (
    <CarouselViewport
      className="h-full
        px-(--gutter) pt-[calc(var(--header-h)+10px)] pb-[clamp(72px,11vh,108px)]
        md:px-8 md:pt-[calc(var(--header-h)+20px)]
        motion-reduce:overflow-y-auto motion-reduce:pb-10">
      {/* The track is pinned to LTR whatever the page reads as. It is never
          seen — the cards are piled, not laid in a row — and pinning it is what
          keeps the correction in `cardStyle` one expression instead of a guess
          about how Embla's RTL mode composes with it. Each card puts the page's
          own direction back for its own words. */}
      <CarouselContent
        className="h-full items-center
          motion-reduce:h-auto motion-reduce:flex-col motion-reduce:items-stretch
          motion-reduce:[&>*+*]:mt-(--gutter)"
        dir="ltr">
        {deck.map((card, index) => (
          <CarouselItem
            key={card.id}
            className="flex justify-center will-change-[translate,rotate,scale]
              motion-reduce:basis-auto"
            style={still ? undefined : cardStyle(index, line, deck.length, rtl)}>
            <StackCard card={card} dir={rtl ? "rtl" : "ltr"} front={Math.round(line) === index} still={still} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </CarouselViewport>
  );
}
