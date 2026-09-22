/**
 * How far through a section the reader is, 0 to 1, for every section that
 * asked for the scroll.
 *
 * It is not React state, and that is the whole point of the file. The value
 * changes on every wheel event, and the stage sits above the header, the
 * canvas and the entire document below it — a state write per event would
 * re-render all of that sixty times a second while somebody is reading four
 * sentences. Here only what subscribes re-renders, which is the one slide
 * that asked for the scroll.
 */
export interface ProgressSource {
  /** Listen to one section's value. A write to another never wakes this. */
  subscribe: (position: number, listener: () => void) => () => void;
  read: (position: number) => number;
}

export interface ProgressStore extends ProgressSource {
  write: (position: number, value: number) => void;
}

/**
 * One value per section, rather than one value for the stage.
 *
 * It used to be a single number, because only one section took the scroll and
 * a section without a depth never wrote. Two of them do now, and they are
 * NEIGHBOURS: stepping from the summary into the experience writes the
 * arriving section's position, and with one value the section still fading out
 * would be dragged to it — the summary snapping back to its first sentence, or
 * the timeline jumping to its last role, while it is still on screen.
 *
 * Keyed, each section keeps the place it was left at for as long as it is
 * drawn, and a step writes only the section being stepped into.
 */
export function createProgress(): ProgressStore {
  const listeners = new Map<number, Set<() => void>>();
  const values = new Map<number, number>();

  return {
    subscribe(position, listener) {
      let group = listeners.get(position);
      if (!group) {
        group = new Set();
        listeners.set(position, group);
      }
      group.add(listener);
      return () => {
        group.delete(listener);
      };
    },
    read: (position) => values.get(position) ?? 0,
    write(position, value) {
      if ((values.get(position) ?? 0) === value) return;
      values.set(position, value);
      const group = listeners.get(position);
      if (!group) return;
      for (const listener of group) listener();
    }
  };
}
