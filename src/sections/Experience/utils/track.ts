import type { CSSProperties } from "react";

/**
 * How much scroll the whole timeline takes, in viewport heights.
 *
 * Six roles over a little under four and a half screens — about seventy
 * viewport heights of input each. It is a reading pace and not a distance,
 * which is why it is written in screens: what it sets is how long a reader
 * spends on one role, and that is a fraction of a screen on every monitor.
 */
export const TRACK_DEPTH = 4.4;

/** How many stops either side of the reading line are painted at all. */
const NEAR = 2;

/**
 * How a card comes up out of nothing as the track carries it towards the line.
 *
 * The exponent is what makes it a GRADUAL arrival rather than a card that is
 * simply there: at a whole role away the curve has given it about an eighth of
 * its opacity, so the card is not yet something the reader has to decide about,
 * and the rest of it arrives over the last stop of travel.
 */
const FADE_CURVE = 3;
const AWAY_BLUR = 1.6;

/**
 * How small a card is at its furthest from the reading line.
 *
 * It was 0.95, which is a card that does not change size: five percent spread
 * over two roles of travel, and four of those five spent at an opacity nobody
 * can see through. By the time the card was legible it was done growing. At
 * 0.82 the growth IS the arrival — small and faint a role away, full size on
 * the line, small again on the way out, since the distance is unsigned and a
 * card leaves exactly the way it came.
 *
 * The size rides the SAME curve as the opacity rather than one of its own,
 * which is both the simpler thing and the page's own: `common/utils/emerge.ts`
 * fades and scales every other arrival on this site off one number, for the
 * reason that two curves over one object are two arrivals the eye can tell
 * apart. Tried on its own gentler curve first, the size had finished most of
 * its work while the card was still a ghost — the same bug as 0.95, one step
 * smaller.
 */
const SMALL = 0.82;

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}

/**
 * Where the reader is along the track, as a place: 0 is the first role on the
 * reading line, 1 the second, and the fractions in between are the timeline on
 * its way from one to the next.
 *
 * It is LINEAR, and that is the whole of the change from a deck of cards. A
 * deck holds a card still and then hands it on, because a card is a thing being
 * looked at; a timeline is a thing being travelled along, and it has to move
 * exactly as far as the hand moved it or it stops feeling like scrolling. One
 * value still drives every card, the rail and the light, so scrolling back up
 * runs the identical states backwards with no second animation anywhere.
 */
export function trackLine(progress: number, count: number): number {
  return clamp(progress, 0, 1) * Math.max(1, count - 1);
}

/** Which role the reader is reading — the one nearest the reading line. */
export function focusedStop(line: number, count: number): number {
  return clamp(Math.round(line), 0, count - 1);
}

/**
 * Where the track has to be put for {@link trackLine} to report a role on the
 * reading line. It is what an arrow key means: not a number of pixels, but a
 * named place.
 */
export function stopProgress(position: number, count: number): number {
  const steps = Math.max(1, count - 1);
  return clamp(position, 0, steps) / steps;
}

/**
 * Where the track itself has to be, so that the role on the reading line is on
 * it.
 *
 * The track is one tall element that slides; the slot is a length the
 * stylesheet owns, so the same number of screens of scroll reads the same on a
 * phone and on a monitor. Half a slot is added because a stop is a band and the
 * line runs through the middle of it.
 */
export function trackStyle(line: number, count: number): CSSProperties {
  return {
    "--stops": count,
    translate: `0 calc(${(-(line + 0.5)).toFixed(4)} * var(--slot))`
  } as CSSProperties;
}

/**
 * How far off the reading line the whole section sits while it is NOT on
 * screen, so that arriving and leaving are travel along the same axis the
 * timeline is read on rather than a cut.
 *
 * The offset is taken from `progress` rather than from a direction, and that
 * is what makes one expression cover all four cases. A section is always left
 * from the end it walks out of and entered at the end it walks in from: left
 * at the bottom of the track it goes up and out, entered at the top of the
 * track it comes up from below. So the end the reader is at IS the direction,
 * and nothing has to be remembered between the two.
 */
const ARRIVE_TRAVEL = 7;

export function arrivalStyle(progress: number): CSSProperties {
  return { "--arrive": `${((0.5 - clamp(progress, 0, 1)) * 2 * ARRIVE_TRAVEL).toFixed(2)}vh` } as CSSProperties;
}

/** Which side of the rail a role is drawn on, once there is room for two. */
export type StopSide = "start" | "end";

function sideOf(position: number): StopSide {
  return position % 2 === 0 ? "start" : "end";
}

export interface StopState {
  /** False for a role too far from the reading line to be worth painting. */
  drawn: boolean;
  side: StopSide;
  /** Its place on the track and its distance from the line, for the stylesheet. */
  style: CSSProperties;
}

/**
 * Where one role sits on the track and how present it is.
 *
 * Distance from the reading line is the only input, and unlike a deck it is
 * used UNSIGNED: a timeline is the same object seen from either end, so the
 * role above the line and the role below it are drawn alike and the reader
 * reads the shape of the years rather than a queue of cards.
 *
 * A card starts at nothing and is brought up by the scroll itself — there is
 * no moment at which it appears, because its opacity is the same continuous
 * function of the distance at every point of the way in and the way out again.
 * It reaches nothing exactly at {@link NEAR}, where it stops being painted at
 * all, with no corner anywhere in between: a card is at every distance in
 * turn, and a kink in the curve would be a flinch the reader can see.
 *
 * Its SIZE says the same thing on its own curve — {@link SMALL} at the edge of
 * the painted band, full size on the line, and small again on the way out. It
 * is not eased and has no duration: like everything else on this track it is a
 * function of where the reader is, so it grows exactly as fast as they scroll
 * and stops exactly where they stop.
 */
export function stopState(position: number, line: number): StopState {
  const away = Math.min(Math.abs(position - line), NEAR) / NEAR;
  /** How far the card has arrived: nothing at the edge of the band, all of it on the line. */
  const here = (1 - away) ** FADE_CURVE;

  return {
    drawn: away < 1,
    side: sideOf(position),
    // Custom properties, which `CSSProperties` has no room for. The cast is
    // the whole of the claim: the stylesheet turns these into a position on
    // the track, because where a card sits is a length and belongs with the
    // rest of the layout rather than in a number computed here.
    style: {
      "--i": position,
      "--fade": here.toFixed(3),
      "--scale": (SMALL + (1 - SMALL) * here).toFixed(3),
      "--haze": `${(AWAY_BLUR * away * away).toFixed(2)}px`
    } as CSSProperties
  };
}
