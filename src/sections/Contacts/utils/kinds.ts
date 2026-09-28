import type { ContactKind } from "@/content";

/**
 * The rows that lead to a page on somebody else's site: LinkedIn and Behance.
 *
 * They behave alike — the row shows words rather than the address, a cursor
 * copies the address underneath, and the link opens in a new tab. The QR code
 * stays on LinkedIn alone; see the section's README.
 */
export function isProfile(kind: ContactKind): boolean {
  return kind === "linkedin" || kind === "behance";
}
