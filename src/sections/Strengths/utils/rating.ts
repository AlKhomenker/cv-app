import type { Strength } from "@/content";

/**
 * "Stress resilience: 5 out of 5" — ONE sentence per locale with two values
 * put into it, never a label with ": 5 out of 5" glued on the end. Hebrew does
 * not order those parts the way English does.
 *
 * It is what a screen reader is given for the whole hand of stars, because
 * five marks read out one at a time is five pieces of noise for one number.
 */
export function ratingLabel(template: string, strength: Strength): string {
  return template.replace("{label}", strength.label).replace("{rating}", String(strength.rating));
}
