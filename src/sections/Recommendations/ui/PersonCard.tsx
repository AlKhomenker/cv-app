import type { CSSProperties } from "react";
import { PANEL_CLASS } from "@/common/utils/surfaces";
import type { Recommendation } from "@/content";

/**
 * The card lifts under the pointer by SCALE, and the entrance it is answering
 * is also a scale — so the two are on the same property and cannot both own
 * it. The lift therefore goes on the LINK and the entrance on the `<li>`
 * around it: two elements, one property each, and a card that is settling into
 * place can still be pointed at.
 */
const CARD_CLASS = [
  PANEL_CLASS,
  "flex h-full items-center gap-3 p-3 no-underline",
  "transition-[border-color,scale] duration-(--dur-fast) ease-page",
  "hover:scale-[1.015] hover:border-accent focus-visible:border-accent"
].join(" ");

export interface PersonCardProps {
  person: Recommendation;
  /** The words on the link. One per locale, never assembled here. */
  cta: string;
  /** Where the card has got to as the reader scrolls — see `utils/arrival.ts`. */
  style: CSSProperties;
}

/**
 * One person who will vouch for the work, as a card that is entirely a link.
 *
 * The whole card is the target and not the words at the foot of it: on a phone
 * this is a thumb reaching for a name, and a four-word link inside a card is a
 * smaller target than the card it is inside for no reason anyone could name.
 *
 * The text is start-aligned although the rest of the page is centred. A row
 * with a disc at its inline start is already a reading direction; centring
 * three lines beside it would set two directions against each other in one
 * card. The section's title above them is centred like every other.
 *
 * The initials are `aria-hidden`: the name is written beside them, and two
 * letters read out before every person would be four pieces of noise.
 */
export function PersonCard({ person, cta, style }: PersonCardProps) {
  return (
    <li className="origin-center" style={style}>
      <a className={CARD_CLASS} href={person.url} target="_blank" rel="noopener noreferrer">
        <span
          className="grid size-10 flex-none place-items-center rounded-round border border-hair
            bg-glass font-serif font-bold text-accent md:size-11"
          aria-hidden="true">
          {person.initials}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-ink">{person.name}</span>
          <span className="block text-[0.92em] text-soft">{person.role}</span>
          {person.relation && <span className="block text-[0.92em] text-soft">{person.relation}</span>}
          <span className="mt-1 inline-block text-[0.92em] font-semibold text-accent">{cta}</span>
        </span>
      </a>
    </li>
  );
}
