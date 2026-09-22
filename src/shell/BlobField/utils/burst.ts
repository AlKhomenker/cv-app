/**
 * The dot's dispersal: the particles it breaks into, and where each one is at
 * a given spread.
 *
 * It lives with the FIELD rather than with the closing section that drives it,
 * and that is the whole reason the file is here. The particles are meant to
 * end up indistinguishable from the background — the same surface, the same
 * four hues, the same softness, the same blur — and a second canvas over the
 * top would be a second surface that has to be told what the first one is
 * doing. Painting them here, they simply stop being drawn once they have
 * become what is already underneath them.
 *
 * Nothing below is random, for the same reason the blobs are written down: a
 * dispersal that looked different on every visit would be the one thing this
 * ending is not, which is the page arriving back where it opened.
 */

export interface Particle {
  /** Which way it goes, as a unit vector. Stored, so no frame pays for a sine. */
  dx: number;
  dy: number;
  /** How far it travels, as a fraction of the screen's shorter side. */
  reach: number;
  /** What it grows to, in the same units — a blob's own scale. */
  radius: number;
  /** Index into the background palette. */
  colour: number;
  /** How far into the spread it starts moving, 0 to 1. */
  delay: number;
}

/**
 * Forty-eight of them. Few enough that each is a blob rather than a grain,
 * many enough that the screen is covered by the time they have grown.
 */
const COUNT = 48;

/** The golden angle. Successive turns by it never fall into rows or spokes. */
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** The radius a particle leaves at: a point, not a disc. */
const SEED = 0.012;

/** How long a particle takes to reach full strength, and when it starts to go. */
const LIT = 0.18;
const FADING = 0.7;

function build(): readonly Particle[] {
  const particles: Particle[] = [];

  for (let index = 0; index < COUNT; index += 1) {
    const angle = index * GOLDEN;
    // `sqrt` so the particles FILL the circle they spread into rather than
    // crowding its rim — area goes as the square of a radius, which is the
    // same reason the skill clouds are sized the way they are.
    const rank = Math.sqrt((index + 0.5) / COUNT);

    particles.push({
      dx: Math.cos(angle),
      dy: Math.sin(angle),
      reach: 0.14 + rank * 0.66,
      // The far ones end up largest, so the field they leave behind is heavier
      // at its edges than in the middle — which is what the opening's own five
      // blobs are.
      radius: 0.1 + rank * 0.28,
      colour: index % 4,
      // Seven starts rather than forty-eight: the dot comes apart in a handful
      // of waves, and a particle per delay would read as a sprinkler.
      delay: (index % 7) / 24
    });
  }

  return particles;
}

export const PARTICLES: readonly Particle[] = build();

/** Slowing as it goes, never stopping dead. */
function easeOut(value: number): number {
  const left = 1 - value;
  return 1 - left * left * left;
}

/**
 * How far through its own flight a particle is, 0 to 1.
 *
 * A pure function of the spread and of nothing else — there is no velocity
 * being integrated anywhere, which is what lets the reader scroll back up and
 * watch the blobs gather into the dot along the identical path.
 */
export function flightOf(particle: Particle, spread: number): number {
  if (spread <= particle.delay) return 0;
  return easeOut((spread - particle.delay) / (1 - particle.delay));
}

/** How far from the dot it has got, as a fraction of the screen's shorter side. */
export function travelOf(particle: Particle, flight: number): number {
  return particle.reach * flight;
}

/** Its radius there: a point on the way out, a blob by the end. */
export function radiusOf(particle: Particle, flight: number): number {
  return SEED + (particle.radius - SEED) * flight;
}

/**
 * How strongly it is drawn: up as it leaves the dot, out as it becomes the
 * field.
 *
 * It has to reach nought. By the end every particle is a blob's size on a
 * canvas that already has five blobs on it, and light left over on top of that
 * would be a background brighter than the one the site opened with — which is
 * the one thing the ending claims not to be.
 */
export function alphaOf(flight: number): number {
  if (flight <= 0) return 0;
  if (flight < LIT) return flight / LIT;
  if (flight < FADING) return 1;
  return (1 - flight) / (1 - FADING);
}
