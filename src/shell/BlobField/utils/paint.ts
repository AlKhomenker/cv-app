import { BLOBS, driftAt, outlineAt } from "./blobs";
import { alphaOf, flightOf, PARTICLES, radiusOf, travelOf } from "./burst";
import { CALM_AMPLITUDE, CALM_LEAN, calmed } from "./calm";
import type { Burst } from "./dispersal";
import { BLOB_ALPHA, mixPalette, rgba, type Rgb } from "./palette";
import { POINTER_REACH } from "./pointer";

/** Points around each outline. Enough that the curve reads as smooth once blurred. */
const SAMPLES = 96;

/**
 * How much wider and taller than the viewport the canvas is drawn.
 *
 * It is what keeps the blur from showing the canvas's own edge: the soft
 * border falls outside the screen instead of across it. `BlobField.tsx` scales
 * the element by this, and reads it from here so there is one number — the
 * dispersal below divides by it, because the closing section knows where its
 * dot is on the SCREEN, and that is not where it is on this surface.
 */
export const OVERSCAN = 1.2;

export interface FieldFrame {
  /** The backing store's size, which is well below the viewport's — see the hook. */
  width: number;
  height: number;
  /** Seconds since the field started. */
  time: number;
  /** The eased pointer, -1 to 1 from the centre. Zero where there is no pointer. */
  pointerX: number;
  pointerY: number;
  /** The theme being left, the one arriving, and how far along the change is. */
  from: readonly Rgb[];
  to: readonly Rgb[];
  mix: number;
  /** How quiet the field is being asked to be, 0 to 1 — see `calm.ts`. */
  calm: number;
  /** The closing section's dot coming apart, or `null` — see `dispersal.ts`. */
  burst: Burst | null;
}

/**
 * The dot of the closing section, coming apart into the field.
 *
 * Drawn after the blobs, out of the same palette, at the same alpha and with
 * the same soft rim — which is the whole of "the particles merge into the
 * background": by the end they are the same size and the same softness as what
 * is underneath them, and then they are simply not drawn any more.
 */
function paintBurst(
  context: CanvasRenderingContext2D,
  burst: Burst,
  palette: readonly Rgb[],
  width: number,
  height: number
): void {
  if (burst.spread <= 0) return;

  // The surface is overscanned, so a point given in fractions of the SCREEN
  // sits nearer the middle of it than its fraction says, and a length on
  // screen is shorter here by the same factor.
  const cx = width * ((burst.x - 0.5) / OVERSCAN + 0.5);
  const cy = height * ((burst.y - 0.5) / OVERSCAN + 0.5);
  const unit = Math.min(width, height) / OVERSCAN;

  for (const particle of PARTICLES) {
    const flight = flightOf(particle, burst.spread);
    const alpha = alphaOf(flight);
    if (alpha <= 0) continue;

    const away = travelOf(particle, flight) * unit;
    const radius = radiusOf(particle, flight) * unit;
    const x = cx + particle.dx * away;
    const y = cy + particle.dy * away;
    const colour = palette[particle.colour] ?? palette[0];

    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, rgba(colour, BLOB_ALPHA * alpha));
    gradient.addColorStop(0.6, rgba(colour, BLOB_ALPHA * alpha * 0.45));
    gradient.addColorStop(1, rgba(colour, 0));

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();
  }
}

/**
 * One frame of the field. Every blob is a closed path whose radius is a sum of
 * sines, filled with a radial gradient that reaches zero alpha at the rim —
 * the softness is the gradient, and the heavy blur on top of it is CSS.
 */
export function paintField(context: CanvasRenderingContext2D, frame: FieldFrame): void {
  const { width, height, time } = frame;
  const palette = mixPalette(frame.from, frame.to, frame.mix);
  const unit = Math.min(width, height);
  const amplitude = calmed(frame.calm, CALM_AMPLITUDE);

  context.clearRect(0, 0, width, height);

  for (const blob of BLOBS) {
    const centre = driftAt(blob, time);
    const lean = blob.depth * POINTER_REACH * unit * calmed(frame.calm, CALM_LEAN);
    const cx = centre.x * width + frame.pointerX * lean;
    const cy = centre.y * height + frame.pointerY * lean;
    const radius = blob.radius * unit;
    const colour = palette[blob.colour] ?? palette[0];

    const gradient = context.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, rgba(colour, BLOB_ALPHA));
    gradient.addColorStop(0.6, rgba(colour, BLOB_ALPHA * 0.45));
    gradient.addColorStop(1, rgba(colour, 0));

    context.beginPath();
    for (let step = 0; step <= SAMPLES; step += 1) {
      const angle = (step / SAMPLES) * Math.PI * 2;
      const reach = radius * outlineAt(blob, angle, time, amplitude);
      const x = cx + Math.cos(angle) * reach;
      const y = cy + Math.sin(angle) * reach;
      if (step === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();

    context.fillStyle = gradient;
    context.fill();
  }

  if (frame.burst) paintBurst(context, frame.burst, palette, width, height);
}
