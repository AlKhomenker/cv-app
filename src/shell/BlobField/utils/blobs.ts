/**
 * The blobs themselves: what each one is, and the shape it has at a moment.
 *
 * The numbers are written down rather than generated. A random field would
 * make one visit look unlike the next; these give every reader the same
 * picture and still never repeat visibly, because the harmonic periods below
 * do not divide into one another.
 */

export interface Harmonic {
  /** How far this term pushes the outline, as a fraction of the radius. */
  amp: number;
  /** Lobes around the circle. */
  freq: number;
  /** Radians per second the lobes travel. */
  speed: number;
  phase: number;
}

export interface Blob {
  /** Resting centre, in fractions of the canvas. */
  x: number;
  y: number;
  /** Radius as a fraction of the canvas's shorter side. */
  radius: number;
  /** How far the centre wanders, same units as the radius. */
  drift: number;
  driftSpeed: number;
  driftPhase: number;
  /** How much of the pointer vector this blob takes. Nearer blobs take more. */
  depth: number;
  /** Index into the palette. */
  colour: number;
  harmonics: readonly Harmonic[];
}

export const BLOBS: readonly Blob[] = [
  {
    x: 0.22,
    y: 0.28,
    radius: 0.52,
    drift: 0.05,
    driftSpeed: 0.061,
    driftPhase: 0.4,
    depth: 1,
    colour: 0,
    harmonics: [
      { amp: 0.11, freq: 2, speed: 0.13, phase: 0.7 },
      { amp: 0.06, freq: 3, speed: -0.19, phase: 2.1 },
      { amp: 0.03, freq: 5, speed: 0.29, phase: 4.4 }
    ]
  },
  {
    x: 0.78,
    y: 0.2,
    radius: 0.44,
    drift: 0.07,
    driftSpeed: 0.043,
    driftPhase: 2.9,
    depth: 0.72,
    colour: 1,
    harmonics: [
      { amp: 0.13, freq: 2, speed: -0.11, phase: 1.9 },
      { amp: 0.05, freq: 4, speed: 0.23, phase: 0.3 },
      { amp: 0.03, freq: 7, speed: -0.31, phase: 3.2 }
    ]
  },
  {
    x: 0.68,
    y: 0.76,
    radius: 0.58,
    drift: 0.06,
    driftSpeed: 0.037,
    driftPhase: 5.1,
    depth: 0.46,
    colour: 2,
    harmonics: [
      { amp: 0.1, freq: 3, speed: 0.17, phase: 3.8 },
      { amp: 0.07, freq: 2, speed: -0.07, phase: 1.1 },
      { amp: 0.02, freq: 6, speed: 0.37, phase: 5.6 }
    ]
  },
  {
    x: 0.3,
    y: 0.82,
    radius: 0.4,
    drift: 0.08,
    driftSpeed: 0.053,
    driftPhase: 1.3,
    depth: 0.3,
    colour: 3,
    harmonics: [
      { amp: 0.12, freq: 3, speed: -0.15, phase: 5.0 },
      { amp: 0.05, freq: 5, speed: 0.21, phase: 2.6 },
      { amp: 0.03, freq: 8, speed: -0.27, phase: 0.9 }
    ]
  },
  {
    x: 0.5,
    y: 0.48,
    radius: 0.34,
    drift: 0.09,
    driftSpeed: 0.029,
    driftPhase: 4.2,
    depth: 0.18,
    colour: 1,
    harmonics: [
      { amp: 0.14, freq: 2, speed: 0.09, phase: 2.4 },
      { amp: 0.06, freq: 4, speed: -0.25, phase: 4.9 },
      { amp: 0.02, freq: 9, speed: 0.33, phase: 1.7 }
    ]
  }
];

/**
 * The outline at one angle: the base radius modulated by the sum of the
 * blob's sines. The time term inside each sine is why the shape never settles.
 *
 * `amplitude` scales every term at once, which is how the field is quietened
 * without being stopped — the shape is the same shape, pulsing less far.
 */
export function outlineAt(blob: Blob, angle: number, time: number, amplitude = 1): number {
  let factor = 1;
  for (const harmonic of blob.harmonics) {
    factor += harmonic.amp * amplitude * Math.sin(harmonic.freq * angle + harmonic.speed * time + harmonic.phase);
  }
  return factor;
}

/** Where the centre has wandered to, before the pointer is taken into account. */
export function driftAt(blob: Blob, time: number): { x: number; y: number } {
  return {
    x: blob.x + Math.sin(time * blob.driftSpeed * Math.PI * 2 + blob.driftPhase) * blob.drift,
    y: blob.y + Math.cos(time * blob.driftSpeed * Math.PI * 2 * 0.83 + blob.driftPhase) * blob.drift
  };
}
