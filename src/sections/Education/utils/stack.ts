import type { CSSProperties } from "react";

/**
 * How much scroll the deck takes, in viewport heights.
 *
 * A little under a screen per card, and deliberately: a card here is one
 * school or one prize rather than six paragraphs, and dealing through them IS
 * the reading rather than something to get through before it. It is written in
 * screens because what it sets is a pace, and a pace is a fraction of a screen
 * on every monitor.
 */
export const STACK_DEPTH = 4;

/** How many cards behind the front one are drawn at all. */
const FANNED = 3.4;

/**
 * The fan: what one card's worth of depth does to the card behind.
 *
 * The turn is most of it. Every card is rotated about a point well BELOW
 * itself — see the origin in `ui/StackCard.tsx` — so a few degrees spreads the
 * deck sideways the way a hand of cards spreads, rather than pinwheeling it
 * about its own middle. The drop and the shrink are what put the spread behind
 * the front card instead of beside it.
 */
const FAN_TURN = 4.5;
const FAN_DROP = 10;
const FAN_SHRINK = 0.05;

/**
 * The pop: what leaving does to the card that was in front.
 *
 * It lifts off the top of the deck toward the upper inline-start corner,
 * turning against the fan and growing very slightly as it goes — a card being
 * taken off a pile rather than sliding under it. The growth is what makes it
 * read as coming TOWARDS the reader, which is the whole of why it is a pop and
 * not a slide.
 */
const POP_ACROSS = 46;
const POP_UP = 64;
const POP_TURN = 7;
const POP_GROW = 0.07;

/** How sharply the fan fades out behind the front card. */
const FADE_CURVE = 1.6;

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}

/**
 * Where the reader is in the deck, as a place: 0 is the first card, 1 the
 * second, and the fractions between are one card leaving as the next arrives.
 *
 * Linear, for the same reason section 3's timeline is: the deck moves exactly
 * as far as the hand moved it, or it stops feeling like scrolling. What makes
 * it settle on a card is the snap in `hooks/useStack.ts`, which happens when
 * the hand has STOPPED — never during the gesture.
 */
export function stackLine(progress: number, count: number): number {
  return clamp(progress, 0, 1) * Math.max(1, count - 1);
}

/** Which card is on top — the one the deck is nearest. */
export function currentCard(line: number): number {
  return Math.round(line);
}

/** Where the reading position has to be for a named card to be on top. */
export function cardProgress(index: number, count: number): number {
  const steps = Math.max(1, count - 1);
  return clamp(index, 0, steps) / steps;
}

/**
 * Where one card is: fanned behind the front one, in front of it, or gone.
 *
 * Three regimes and one input. Everything is a function of the card's distance
 * from the reading position and of nothing else, so going back deals the cards
 * onto the deck along the identical path — there is no entrance and no exit to
 * keep in step.
 *
 * The two transforms meet at identity: a card exactly on the reading position
 * is square, full size and unturned whichever side of nought it is read from,
 * so the fan and the pop are one continuous movement rather than two
 * animations swapped at a boundary.
 *
 * ## The first term undoes the carousel
 *
 * Embla is a TRACK. It lays the slides in a row and translates the container,
 * so slide `i` sits `(i - line)` viewport-widths from the middle. A deck is
 * not a row, so the first thing every card does is translate itself back by
 * exactly that — `-(i - line) * 100%` of its own width, which is the viewport's
 * width because a slide is `basis-full`. What is left over on that axis is the
 * fan's own offset.
 *
 * That is the whole of the bargain with the carousel: Embla keeps the snaps,
 * the drag, the bounds and the tween, and gives up the one thing it cannot do,
 * which is put its slides in a pile.
 *
 * `rtl` is the one thing here that has to know how the page reads. There is no
 * logical form of `translate` or `rotate`, so which way the deck fans and
 * which corner a card leaves by is multiplied in rather than guessed at by a
 * stylesheet.
 *
 * The stacking order is fixed rather than computed. Earlier cards sit above
 * later ones always, which is exactly right for a deck: the card being taken
 * off lifts over the one underneath, and the fan descends away behind it.
 */
export function cardStyle(index: number, line: number, count: number, rtl: boolean): CSSProperties {
  const offset = index - line;
  const side = rtl ? -1 : 1;
  const zIndex = count - index;
  // No `side` on this one. The track is pinned to LTR at the carousel — see
  // `ui/Deck.tsx` — precisely so that this correction is one expression rather
  // than a guess about how Embla's own RTL mode composes with it. The track is
  // never seen; only the fan below is, and that is where direction belongs.
  const undoTrack = (-offset * 100).toFixed(3);

  if (offset < 0) {
    const away = Math.min(-offset, 1);
    return {
      translate: `calc(${undoTrack}% + ${(-POP_ACROSS * away * side).toFixed(1)}px) ${(-POP_UP * away).toFixed(1)}px`,
      rotate: `${(-POP_TURN * away * side).toFixed(2)}deg`,
      scale: (1 + POP_GROW * away).toFixed(4),
      opacity: (1 - away).toFixed(3),
      zIndex
    };
  }

  const back = Math.min(offset, FANNED);
  return {
    translate: `${undoTrack}% ${(FAN_DROP * back).toFixed(1)}px`,
    rotate: `${(FAN_TURN * back * side).toFixed(2)}deg`,
    scale: (1 - FAN_SHRINK * back).toFixed(4),
    opacity: clamp(1 - (offset / FANNED) ** FADE_CURVE, 0, 1).toFixed(3),
    zIndex
  };
}

/**
 * How full one of the marks is, 0 to 1.
 *
 * A mark fills as its card comes to the top and empties as the next one takes
 * it, so a deck half way through a deal reads as a position between two cards
 * rather than as a choice already made.
 */
export function markFill(index: number, line: number): number {
  return clamp(1 - Math.abs(index - line), 0, 1);
}

/**
 * How warm the light behind the page is, 0 to 1.
 *
 * It rises as the first card is dealt rather than switching at a boundary,
 * because the card stock is warm and the light has to arrive with it. Full by
 * the second card and held from there.
 */
export function warmth(line: number): number {
  return clamp(line, 0, 1);
}
