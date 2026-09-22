import type { CSSProperties } from "react";

/**
 * The generated picture on a card's band.
 *
 * Soft coloured shapes laid over each other and blurred, built from a SEED
 * rather than from a random number, so a card's picture is the same picture on
 * every render, in both languages and after every reload. A composition that
 * changed when the reader came back to it would be the one thing on the page
 * that cannot be remembered.
 *
 * They are CSS gradients and not a canvas. Nothing here has to move, which
 * means nothing has to be drawn per frame; a canvas would be a second
 * rendering surface, a second resize path, and a picture that is blank until
 * an effect has run.
 */

/** A small deterministic generator, so a seed gives one sequence for ever. */
function seeded(seed: string): () => number {
  let state = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) {
    state ^= seed.charCodeAt(i);
    state = Math.imul(state, 0x01000193) >>> 0;
  }
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0xffffffff;
  };
}

/** One soft shape: a colour that reaches a bit of the way and then stops. */
function blot(colour: string, x: number, y: number, reach: number): string {
  return `radial-gradient(${reach.toFixed(0)}% ${(reach * 0.86).toFixed(0)}% at ${x.toFixed(1)}% ${y.toFixed(1)}%, ${colour} 0%, transparent 68%)`;
}

/** The page's own four hues, plus the lilac the award tiles are lit with. */
const PALETTE = ["var(--tint-1)", "var(--tint-2)", "var(--tint-3)", "var(--tint-4)", "var(--iris-3)"];

/**
 * A card's picture: five blots over a pale ground, unique to the seed.
 *
 * It is not a photograph and is not trying to be one. What it is for is to
 * give the card a temperature at a glance, the way a plate in a book does,
 * without claiming to show a building nobody would recognise. What a reader
 * RECOGNISES is the glyph set into it — five soft fields of the same five
 * hues are five of the same picture otherwise; see `ui/PanelArt.tsx`.
 */
export function panelArt(seed: string): CSSProperties {
  const next = seeded(seed);
  const layers = PALETTE.map((colour) => blot(colour, 6 + next() * 88, 6 + next() * 88, 52 + next() * 46));
  return { backgroundImage: layers.join(",") };
}
