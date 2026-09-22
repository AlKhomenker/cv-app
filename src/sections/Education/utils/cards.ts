import type { Award, CardGlyph, Study } from "@/content";

/**
 * The deck: the two schools and then the three prizes, in the order they are
 * dealt.
 *
 * It is ONE list of ONE shape, and that is the whole of this file. A school
 * and a prize used to be two kinds with a face each — a picture and three
 * lines against a glass medal and three lines — which made the deck read as
 * two decks shuffled together. They are the same card now: the same picture
 * with the same mark set into it, the same kicker, the same three lines in the
 * same places. What differs between two cards is what is written on them.
 *
 * So the mapping happens here rather than in a component. Nothing downstream
 * asks which kind it has, because there is no longer a question to ask — and a
 * card that carried its kind would be an invitation to draw it differently
 * again.
 */
export interface Card {
  /** Stable across locales: it keys the card and seeds its picture. */
  id: string;
  /** The shape set into the picture. */
  glyph: CardGlyph;
  /** "Education" or "Awards" — the only line that says which kind this is. */
  kicker: string;
  /** The school, or the prize. */
  title: string;
  /** What was studied, or what was won. The one line set in italic. */
  lead: string;
  body: string;
}

/** The two kickers, which are the content's and not this file's to invent. */
export interface DeckTitles {
  studies: string;
  awards: string;
}

export function buildDeck(studies: readonly Study[], awards: readonly Award[], titles: DeckTitles): Card[] {
  return [
    ...studies.map(
      (study): Card => ({
        id: study.id,
        glyph: study.glyph,
        kicker: titles.studies,
        title: study.school,
        lead: study.degree,
        body: study.body
      })
    ),
    ...awards.map(
      (award): Card => ({
        id: award.id,
        glyph: award.glyph,
        kicker: titles.awards,
        title: award.name,
        lead: award.result,
        body: award.body
      })
    )
  ];
}
