import type { Card } from "../utils/cards";
import { CardFace } from "./CardFace";

export interface StackCardProps {
  card: Card;
  /** The page's own direction, put back after the track pinned itself to LTR. */
  dir: "ltr" | "rtl";
  /** True for the card on top of the deck: the one the reader is reading. */
  front: boolean;
  still: boolean;
}

/**
 * One card of the deck: the paper it is printed on, and the face on it.
 *
 * Every card is the same box AND the same face — see `ui/CardFace.tsx` — and
 * the fan is entirely in the transform on the carousel slide around it, so the
 * deck is one element per card and nothing is laid out twice. There is no
 * choice to make here any more: a school and a prize are printed identically,
 * so this file does not ask which it has. The origin is well BELOW the card, which is what turns a
 * few degrees of rotation into a hand of cards spreading rather than a
 * pinwheel.
 *
 * **Nothing here is a control.** A card is read, not pressed: the awards say
 * what they are on their own faces, so there is nothing left for a click to
 * open. The cards behind the front one are taken out of the pointer's way
 * rather than made unclickable, because what would otherwise happen is a
 * reader selecting a word through a card at a tenth of its opacity.
 *
 * Nothing here transitions. Embla tweens between its snaps and the fan is a
 * function of where Embla currently IS, so every frame of the movement is
 * already drawn — a CSS transition on top would be a second animation chasing
 * the first.
 */
export function StackCard({ card, dir, front, still }: StackCardProps) {
  return (
    <div
      className="paper relative flex flex-col overflow-hidden rounded-glass
        w-[min(560px,90vw)] h-[clamp(340px,56vh,500px)] p-[clamp(18px,4.4vw,28px)]
        origin-[50%_140%]
        data-[front=false]:pointer-events-none
        motion-reduce:mx-auto motion-reduce:h-auto motion-reduce:w-full
        motion-reduce:max-w-155 motion-reduce:pointer-events-auto"
      data-front={front}
      dir={dir}>
      <CardFace card={card} arrived={front} still={still} />
    </div>
  );
}
