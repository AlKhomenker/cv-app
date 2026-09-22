import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarousel } from "@/components/ui/carousel";
import { useLocale } from "@/i18n";
import { Marks } from "./Marks";

export interface ControlsProps {
  rtl: boolean;
}

/**
 * The carousel: one step back, one step forward, and the marks between them.
 *
 * They are the section's only controls and the only part of it a keyboard or a
 * screen reader can act on — the cards themselves are read and never pressed.
 *
 * Everything they know comes from the carousel's own context: whether there is
 * anything either side, what a press does, and where the deck is for the marks
 * to fill from. Nothing is passed down and nothing is kept twice.
 *
 * They are **disabled at the two ends** rather than wrapping. A deck has a
 * first card and a last one, and a carousel that looped would take from the
 * reader the one thing the marks are there to tell them. That is Embla's
 * `canScrollPrev` / `canScrollNext`, so it cannot disagree with what a press
 * would actually do.
 *
 * Which chevron points which way is computed rather than written, because the
 * icons are drawn shapes and not logical ones: back points at the inline start
 * in both languages, and under Hebrew that is the right.
 */
export function Controls({ rtl }: ControlsProps) {
  const { content } = useLocale();
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext, count, line } = useCarousel();
  const Back = rtl ? ChevronRight : ChevronLeft;
  const Forward = rtl ? ChevronLeft : ChevronRight;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-[clamp(12px,2.6vh,26px)] z-20
        flex items-center justify-center gap-3 px-(--gutter) md:gap-4"
      data-print="hide">
      <Button
        className="pointer-events-auto"
        disabled={!canScrollPrev}
        aria-label={content.education.prev}
        size="icon"
        variant="icon"
        onClick={scrollPrev}>
        <Back className="size-5" strokeWidth={1.6} aria-hidden="true" />
      </Button>

      <Marks count={count} line={line} />

      <Button
        className="pointer-events-auto"
        disabled={!canScrollNext}
        aria-label={content.education.next}
        size="icon"
        variant="icon"
        onClick={scrollNext}>
        <Forward className="size-5" strokeWidth={1.6} aria-hidden="true" />
      </Button>
    </div>
  );
}
