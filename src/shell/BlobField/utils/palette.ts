import type { Theme } from "@/theme";

export type Rgb = readonly [number, number, number];

/**
 * The same four hues in both themes: pale rose, mint, periwinkle, sand. Light
 * keeps them a few steps off white so they read as light rather than as
 * shapes; dark takes them to full saturation on near-black.
 */
export const BLOB_PALETTE: Record<Theme, readonly Rgb[]> = {
  light: [
    [249, 214, 224],
    [209, 240, 226],
    [214, 221, 249],
    [246, 234, 211]
  ],
  dark: [
    [124, 26, 64],
    [10, 96, 72],
    [36, 48, 142],
    [124, 88, 24]
  ]
};

/** One alpha for both themes. The separation comes from the hue, not the fill. */
export const BLOB_ALPHA = 0.5;

function channel(from: number, to: number, t: number): number {
  return Math.round(from + (to - from) * t);
}

function mixRgb(from: Rgb, to: Rgb, t: number): Rgb {
  return [channel(from[0], to[0], t), channel(from[1], to[1], t), channel(from[2], to[2], t)];
}

/**
 * The palette part-way through a theme change. Taking a snapshot of this is
 * what lets a second toggle interrupt the first without a jump: the fade
 * starts from what is on screen, not from the theme it was heading for.
 */
export function mixPalette(from: readonly Rgb[], to: readonly Rgb[], t: number): readonly Rgb[] {
  if (t >= 1) return to;
  return from.map((colour, index) => mixRgb(colour, to[index] ?? colour, t));
}

export function rgba(colour: Rgb, alpha: number): string {
  return `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${alpha})`;
}
