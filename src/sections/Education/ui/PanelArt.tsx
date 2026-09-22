import type { CardGlyph as GlyphName } from "@/content";
import { useBloom } from "../hooks/useBloom";
import { panelArt } from "../utils/art";
import { CardGlyph } from "./CardGlyph";

export interface PanelArtProps {
  /** The card's id. The picture is a function of it and of nothing else. */
  seed: string;
  /** The shape set into it. What tells two soft compositions apart. */
  glyph: GlyphName;
  /** True once this panel is the one at the reading position. */
  arrived: boolean;
  /** Under reduced motion the reveal is not played, it is simply shown. */
  still: boolean;
}

/**
 * A card's picture: two copies of one generated composition, one sharp and one
 * heavily blurred and saturated under it, with the card's own shape set into
 * the middle of them.
 *
 * Every card in the deck has one, schools and prizes alike. The composition
 * alone could not carry a card — five soft fields of the same five hues are
 * five of the same picture at a glance — so the GLYPH is what a reader
 * actually recognises, and the colour behind it is the temperature. That is
 * also why the glyph is not blurred by the bloom: the bloom happens behind it,
 * so the one legible thing in the band stays legible throughout.
 *
 * It is a BAND across the top of a card rather than the plate it was when a
 * school had a whole screen to itself. The card is a fixed box and its words
 * have to fit under this, so the aspect is wide — at the old 4:3 the sentence
 * at the foot of the card was clipped by the card's own edge, and 5:2 on a
 * narrow screen is what pays for the kicker the face gained when a prize's
 * card and a school's became the same card.
 *
 * When the panel reaches the reading position the pair BLOOMS — the blurred
 * copy comes up to near full while the sharp one drops to a quarter and takes
 * a two-pixel blur — and then returns. Written as a state it would settle into,
 * hovering could not replay it, because there would be nothing left to replay
 * from. Written as a one-shot, "plays once on arrival" and "replays under the
 * pointer" are the same animation asked for twice.
 *
 * The replay is a `key` and not a class toggled off and on: a browser is free
 * to fold a class removed and re-added in one frame into no change at all, and
 * a new identity is the one thing it cannot fold.
 */
export function PanelArt({ seed, glyph, arrived, still }: PanelArtProps) {
  const art = panelArt(seed);
  const bloom = useBloom(arrived && !still);

  return (
    <div
      className="relative isolate w-full flex-none overflow-hidden rounded-glass
        aspect-5/2 md:aspect-21/9
        [box-shadow:inset_0_0_0_1px_var(--paper-line)]"
      onPointerEnter={bloom.replay}
      onFocus={bloom.replay}
      tabIndex={-1}
      aria-hidden="true">
      {/* The soft impression of the picture. It is under the sharp copy and
          comes up through it, which is what makes the bloom read as the image
          going out of focus rather than as a second image arriving. */}
      <div
        key={`haze-${bloom.run}`}
        className="absolute inset-0 opacity-0 filter-[blur(26px)_saturate(1.7)] scale-[1.25]
          data-[run=true]:animate-bloom-haze data-[still=true]:opacity-90 data-[still=true]:animate-none"
        style={art}
        data-run={bloom.run > 0}
        data-still={still}
      />
      <div
        key={`sharp-${bloom.run}`}
        className="absolute inset-0 data-[run=true]:animate-bloom-sharp
          data-[still=true]:opacity-25 data-[still=true]:blur-[2px] data-[still=true]:animate-none"
        style={art}
        data-run={bloom.run > 0}
        data-still={still}
      />

      {/* Last, and outside the bloom's two copies: a mark frosted out of the
          picture's own surface rather than laid on top of it. */}
      <CardGlyph
        name={glyph}
        className="absolute inset-0 m-auto size-[clamp(40px,13vw,58px)] drop-shadow-[0_2px_6px_rgb(62_50_40/0.28)]"
      />
    </div>
  );
}
