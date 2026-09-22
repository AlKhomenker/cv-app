import { useId } from "react";
import type { CardGlyph as GlyphName } from "@/content";

/**
 * The five shapes, drawn.
 *
 * Paths and not an icon font and not a file: a font would be a fourth network
 * request for five shapes, and a file would be one more thing that can fail to
 * arrive and leave a card with nothing on it. Every one is an even-odd path,
 * so the palette's thumb hole, the mask's eyes and the compass's pivot are
 * holes in the glass rather than paint on top of it.
 *
 * The first two are the schools and the last three the prizes, and nothing in
 * the drawing distinguishes the two groups — a card is a card here. `code` is
 * the software course; `compass` is the civil engineering one, whose own line
 * says structural thinking and drawing.
 */
const PATHS: Record<GlyphName, string> = {
  code: "M9 5.4L10.9 7.2L6.1 12L10.9 16.8L9 18.6L2.4 12Z M15 5.4L13.1 7.2L17.9 12L13.1 16.8L15 18.6L21.6 12Z",
  compass:
    "M12 2.2A2.3 2.3 0 1 1 12 6.8A2.3 2.3 0 1 1 12 2.2Z M12 3.7A0.9 0.9 0 1 0 12 5.5A0.9 0.9 0 1 0 12 3.7Z M11.1 6.8L12.9 6.8L17.6 19L15.4 19.9L12 10.8L8.6 19.9L6.4 19Z",
  crown: "M3.2 17.8 L5 8.2 L9.4 12.2 L12 5.4 L14.6 12.2 L19 8.2 L20.8 17.8 Z",
  brush:
    "M12 3.2C6.6 3.2 2.6 6.9 2.6 11.6C2.6 16.4 6.6 20.8 12 20.8C13.6 20.8 14.6 19.9 14.6 18.7C14.6 17.6 13.7 16.9 13.7 15.9C13.7 14.8 14.6 14.1 15.8 14.1L17.9 14.1C19.9 14.1 21.4 12.6 21.4 10.4C21.4 6.4 17.2 3.2 12 3.2Z M7.2 13.4A1.6 1.6 0 1 1 7.2 10.2A1.6 1.6 0 1 1 7.2 13.4Z M7.8 8.4A1.6 1.6 0 1 1 7.8 5.2A1.6 1.6 0 1 1 7.8 8.4Z M13 6.8A1.6 1.6 0 1 1 13 3.6A1.6 1.6 0 1 1 13 6.8Z M17.6 9.6A1.6 1.6 0 1 1 17.6 6.4A1.6 1.6 0 1 1 17.6 9.6Z",
  mask: "M4.4 4.6C4.4 4.6 8 3.4 12 3.4C16 3.4 19.6 4.6 19.6 4.6C19.6 4.6 19.9 12.4 17.4 16.8C15.6 19.9 13.6 20.8 12 20.8C10.4 20.8 8.4 19.9 6.6 16.8C4.1 12.4 4.4 4.6 4.4 4.6Z M9.4 10.6A1.5 1.1 0 1 1 9.4 8.4A1.5 1.1 0 1 1 9.4 10.6Z M14.6 10.6A1.5 1.1 0 1 1 14.6 8.4A1.5 1.1 0 1 1 14.6 10.6Z M8.4 13.6C9.6 15.8 14.4 15.8 15.6 13.6C14.6 16.8 9.4 16.8 8.4 13.6Z"
};

export interface CardGlyphProps {
  name: GlyphName;
  className?: string;
}

/**
 * One glyph, extruded from glass and set into a card's picture.
 *
 * It is half-transparent white with a shadow inside its lower edge and a light
 * along its upper-left one, so it reads as a thickness in the material rather
 * than as a sticker on it. Both are one SVG filter: the offset copy of the
 * glyph is cut OUT of the glyph, which leaves a crescent inside the shape, and
 * the crescent is what is flooded with colour. Offsetting the cut upwards puts
 * the shadow along the bottom; offsetting it down and right puts the light
 * along the top and left.
 *
 * The filter's id comes from `useId`, because all five cards are in the
 * document at once — the deck is a way of reading them, not the place they are
 * kept — and an id written in this file would be the same id five times.
 */
export function CardGlyph({ name, className }: CardGlyphProps) {
  const filter = useId();

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <defs>
        <filter id={filter} x="-30%" y="-30%" width="160%" height="160%">
          <feOffset in="SourceAlpha" dy="-2.2" result="up" />
          <feGaussianBlur in="up" stdDeviation="1.6" result="upSoft" />
          <feComposite in="SourceAlpha" in2="upSoft" operator="out" result="underside" />
          <feFlood floodColor="#2a2118" floodOpacity="0.55" result="dark" />
          <feComposite in="dark" in2="underside" operator="in" result="innerShadow" />

          <feOffset in="SourceAlpha" dx="1.4" dy="1.4" result="down" />
          <feGaussianBlur in="down" stdDeviation="1.1" result="downSoft" />
          <feComposite in="SourceAlpha" in2="downSoft" operator="out" result="topside" />
          <feFlood floodColor="#ffffff" floodOpacity="0.92" result="light" />
          <feComposite in="light" in2="topside" operator="in" result="innerLight" />

          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="innerLight" />
            <feMergeNode in="innerShadow" />
          </feMerge>
        </filter>
      </defs>
      <path d={PATHS[name]} fillRule="evenodd" fill="rgb(255 255 255 / 0.72)" filter={`url(#${filter})`} />
    </svg>
  );
}
