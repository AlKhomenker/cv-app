import type { Card } from "../utils/cards";
import { PanelArt } from "./PanelArt";

export interface CardFaceProps {
  card: Card;
  /** True once this card is the one on top of the deck. */
  arrived: boolean;
  still: boolean;
}

/**
 * What is printed on a card: a picture with a mark set into it, a kicker, and
 * three lines.
 *
 * One face for all five, which is the point of it. A school used to be a
 * picture over three lines hung from the top of the card and a prize three
 * lines centred under a glass medal, and the deck read as two decks shuffled
 * together — the cards a reader was being dealt were plainly not one kind of
 * thing. They are now: the same band, the same mark, the same kicker, the same
 * three lines at the same sizes in the same places. Only the words differ, and
 * only the words should.
 *
 * It has no surface of its own — the card it is printed on is the paper. The
 * academic face is set on the section and inherited; what this decides is the
 * sizes and the one italic. The middle line is that italic, and it is the only
 * one on the site: a line set apart from the name above it and the sentence
 * below it, the way a degree is written on a certificate.
 *
 * The kicker is the only thing here that says which of the two kinds a card
 * is, and it says it in words rather than in a layout.
 */
export function CardFace({ card, arrived, still }: CardFaceProps) {
  return (
    <div className="flex flex-col gap-4">
      <PanelArt seed={card.id} glyph={card.glyph} arrived={arrived} still={still} />

      <p
        className="mt-[clamp(12px,2.6vh,20px)] text-[0.74rem] font-semibold uppercase
          tracking-[0.16em] text-faint">
        {card.kicker}
      </p>

      <div className="min-h-0">
        <h3 className="font-academic text-ink text-[clamp(1.3rem,4.6vw,1.9rem)] font-light leading-[1.14]">
          {card.title}
        </h3>
        <p className="mt-1 font-academic text-[clamp(0.95rem,3vw,1.15rem)] font-light italic text-soft">{card.lead}</p>
        <p className="mt-2.5 font-academic text-[clamp(0.92rem,2.9vw,1.08rem)] font-light leading-normal text-soft">
          {card.body}
        </p>
      </div>
    </div>
  );
}
