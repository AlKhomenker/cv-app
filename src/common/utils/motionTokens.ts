/**
 * The motion tokens, read from the stylesheet rather than repeated here.
 * One source: a duration changed in CSS changes the JavaScript too.
 */
export type MotionToken = "--dur-fast" | "--dur" | "--dur-slow" | "--dur-reveal" | "--reveal-start" | "--reveal-out";

/**
 * The unit has to be read, not assumed.
 *
 * The stylesheet is written in milliseconds, but the production minifier
 * rewrites `520ms` as `.52s` because it is two bytes shorter — and a
 * `parseFloat` alone then returns 0.52 where the source said 520. Every
 * duration this file hands out was a thousand times too small in the built
 * page and correct in dev, which is the worst shape a bug can have: entrances
 * that fired inside the frame they were meant to start from, so the browser
 * had nothing to transition from and the text simply appeared.
 */
export function motionMs(token: MotionToken): number {
  if (typeof window === "undefined") return 0;

  const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) return 0;

  return raw.endsWith("ms") ? value : value * 1000;
}
