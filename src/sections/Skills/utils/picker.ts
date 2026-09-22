import type { Skill, Topic } from "./topics";

/**
 * One tool as the combobox lists it: the row's own facts, plus WHERE it sits
 * in the one flat list the keyboard walks.
 *
 * The index is carried on the option rather than counted at the call site for
 * the same reason `Skill.order` is: the list is read twice — once as five
 * groups under five headings, once as one run of options for `ArrowDown` — and
 * an index counted twice is two lists that can disagree.
 */
export interface PickerOption extends Skill {
  /** The topic it came from, so a chosen option is drawn in that row's hue. */
  topic: string;
  /** Its place in the flat list of everything currently listed. */
  index: number;
}

/** One topic inside the list: the heading, and the tools left under it. */
export interface PickerGroup {
  id: string;
  label: string;
  options: PickerOption[];
}

/**
 * Whether a tool answers to what has been typed.
 *
 * A plain case-insensitive substring, over the name as it is written. The
 * names are Latin in every locale — `.NET`, `CI/CD`, `C#` — so there is no
 * locale-aware folding to do, and typing `sq` finding `SQL` is the whole of
 * what a forty-two item list needs.
 */
export function matches(name: string, query: string): boolean {
  return name.toLowerCase().includes(query);
}

/**
 * The five topics as the list shows them, narrowed by what has been typed.
 *
 * A topic with nothing left in it is dropped: a heading over an empty group is
 * a reader asked to look for something that is not there. The numbering runs
 * ACROSS the groups, in the content's own order, so the keyboard walks the
 * list in exactly the order it is drawn in.
 */
export function pickerGroups(topics: readonly Topic[], query: string): PickerGroup[] {
  const wanted = query.trim().toLowerCase();
  let index = 0;

  return topics
    .map((topic) => ({
      id: topic.id,
      label: topic.label,
      options: topic.skills
        .filter((skill) => matches(skill.name, wanted))
        .map((skill) => ({ ...skill, topic: topic.id, index: index++ }))
    }))
    .filter((group) => group.options.length > 0);
}

/** The same list read as one run, which is what a key press moves through. */
export function pickerOptions(groups: readonly PickerGroup[]): PickerOption[] {
  return groups.flatMap((group) => group.options);
}

/**
 * The choice with one tool added or taken out.
 *
 * A new set every time, because the set IS the state: mutating it in place
 * would leave React holding the same reference and nothing would redraw.
 */
export function toggleKey(chosen: ReadonlySet<string>, key: string): Set<string> {
  const next = new Set(chosen);
  if (!next.delete(key)) next.add(key);
  return next;
}

/**
 * Whether a badge is lit.
 *
 * An empty choice lights EVERYTHING, which is the section as it was before the
 * combobox existed: a CV does not hide its own skills because nobody has asked
 * a question yet. Once anything is chosen, the answer is the choice and every
 * other badge goes quiet — dimmed rather than removed, because what a person
 * does NOT know is part of what the list says, and a row that reflows as the
 * reader types is a row nobody can read.
 */
export function isLit(chosen: ReadonlySet<string>, key: string): boolean {
  return chosen.size === 0 || chosen.has(key);
}

/** Whether a row's heading is lit: it is, while anything under it is. */
export function isTopicLit(chosen: ReadonlySet<string>, topic: Topic): boolean {
  return chosen.size === 0 || topic.skills.some((skill) => chosen.has(skill.key));
}

/**
 * "3 chosen" — ONE sentence per locale with the number put into it, never a
 * number with a word glued after it. See `Strengths/utils/rating.ts`, which is
 * the same rule for the same reason: Hebrew does not order the parts the way
 * English does.
 */
export function chosenLabel(template: string, count: number): string {
  return template.replace("{count}", String(count));
}

/**
 * Where a key press lands, given where it was and how many options there are.
 *
 * It wraps, and an empty list keeps the cursor at -1 — nothing is on, so Enter
 * has nothing to press. `-1` also survives a narrowing: the cursor is reset
 * whenever the query changes, so it can never point past the end of the list.
 */
export function moveCursor(cursor: number, step: 1 | -1, count: number): number {
  if (count === 0) return -1;
  if (cursor < 0) return step === 1 ? 0 : count - 1;
  return (cursor + step + count) % count;
}
