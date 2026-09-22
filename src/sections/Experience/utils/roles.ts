import type { Role, RoleDate } from "@/content";

/** The dash between two dates. One character, and the same in both languages. */
const DASH = "—";

/** True while the role has not ended. The dates are the only thing that says so. */
export function isRunning(role: Role): boolean {
  return role.end === null;
}

/**
 * One date: the month and the year, `01.2025`.
 *
 * Numbers and a full stop, in that order, in both languages. Month NAMES were
 * the other option and they cannot be had for free: twelve of them per locale,
 * and — the part that decides it — a Hebrew month name inside the `dir="ltr"`
 * run this string is drawn in comes out with its letters in the wrong order.
 * The whole reason these labels are built from numbers is that a number reads
 * the same in both directions.
 */
function monthYear(date: RoleDate): string {
  return `${String(date.month).padStart(2, "0")}.${date.year}`;
}

/**
 * The span a role covers, written out: one date and a dash for a role that has
 * not ended, one date for a role that began and ended in the same month, and
 * two otherwise.
 *
 * It is built from the numbers rather than translated, which is what lets it
 * sit in `dir="ltr"` under Hebrew without dragging a Hebrew word in with it.
 * The word for a role still running is not in here: it goes beside this, in
 * the reader's own language, next to the light that says the same thing.
 *
 * The single-date case used to be a role that began and ended in one YEAR,
 * which covered two of the six. With the months in, a job held from June to
 * December is no longer one date and says so — which is the whole point of
 * adding them, since three of these roles start and end inside one year.
 */
export function spanLabel(role: Role): string {
  const from = monthYear(role.start);
  if (role.end === null) return `${from} ${DASH}`;

  const to = monthYear(role.end);
  if (to === from) return from;
  return `${from} ${DASH} ${to}`;
}

/**
 * The role, as prose.
 *
 * The content keeps a role's description as the several statements it is made
 * of, which is how the sheet of paper wants it. Everywhere else wants one
 * paragraph — the opened role, the reduced-motion list, and the copy a card
 * carries for a screen reader without drawing — so they are joined here rather
 * than being written twice.
 */
export function description(role: Role): string {
  return role.bullets.join(" ");
}

/**
 * The complete technology list, as the separate names an opened role shows.
 * The content writes it as one line because that is how it is read out of a
 * CV; the panel draws each name on its own.
 */
export function stackPills(role: Role): string[] {
  return role.stack
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}

/**
 * The name a screen reader gets for the company link: the company, and where
 * the link goes. The sentence is one string per locale rather than a company
 * name with an English word joined onto it here.
 */
export function companyLinkLabel(template: string, role: Role): string {
  return template.replace("{company}", role.company);
}
