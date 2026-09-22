import type { SkillGroup } from "@/content";

export interface Skill {
  /** Stable across renders and locales: the topic's id and the tool's name. */
  key: string;
  name: string;
  /**
   * Its place in the ONE flat order every badge arrives in.
   *
   * It is carried on the skill rather than worked out at the call site because
   * the five rows and the single stagger are the same list read two ways, and
   * an index counted twice is two lists that can disagree.
   */
  order: number;
  /** Two letters in a filled circle. Decoration; see {@link monogram}. */
  mark: string;
}

export interface Topic {
  /** `theme.css` turns it into the hue the row and its badges are drawn in. */
  id: string;
  label: string;
  /** The order of its first skill, which is what its heading is timed to. */
  order: number;
  skills: Skill[];
}

/**
 * The first two letters of a name, in capitals, ignoring what is not a letter
 * or a digit.
 *
 * `.NET` gives NE and not `.N`, `CI/CD` gives CI, `C#` gives C. The mark is
 * decoration and is read out by nobody — the name is written beside it — so a
 * one-letter mark for a one-letter name is a mark and not a bug.
 */
export function monogram(name: string): string {
  const letters = name.replace(/[^a-z0-9]/gi, "");
  return letters.slice(0, 2).toUpperCase();
}

/**
 * The content's five groups as five rows of badges, numbered through.
 *
 * The numbering runs across the rows rather than within one, so the whole
 * section fills topic by topic in the content's own order — which is also the
 * order the badges are in the document and the order a screen reader reads
 * them in. Nothing here reorders anything.
 */
export function topicsOf(groups: readonly SkillGroup[]): Topic[] {
  let order = 0;
  return groups.map((group) => ({
    id: group.id,
    label: group.label,
    order,
    skills: group.items.map((name) => ({
      key: `${group.id}:${name}`,
      name,
      order: order++,
      mark: monogram(name)
    }))
  }));
}
