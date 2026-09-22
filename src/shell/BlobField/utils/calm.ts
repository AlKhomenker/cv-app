/**
 * How quiet "quiet" is.
 *
 * A section with text on it asks the stage for calm, and the stage asks the
 * field. What is left at full calm is a third of the pulse and a third of the
 * speed — enough that the light is still alive behind the glass, not enough
 * to pull an eye off four sentences — and a much weaker lean, because a
 * pointer that still dragged the whole field about would undo both.
 */
export const CALM_AMPLITUDE = 1 / 3;
export const CALM_RATE = 1 / 3;
export const CALM_LEAN = 0.4;

/**
 * How much of the remaining distance the field's own calm covers each frame.
 *
 * It eases rather than switches, and that is what puts the change in the
 * right place: the field starts settling as the section before collapses,
 * instead of dropping to a different speed at the boundary between them.
 */
export const CALM_EASE = 0.05;

/** What a factor is worth at this much calm, given what is left of it at full calm. */
export function calmed(calm: number, floor: number): number {
  return 1 - calm * (1 - floor);
}
