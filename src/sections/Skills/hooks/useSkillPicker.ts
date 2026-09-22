import { type KeyboardEvent, type RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  moveCursor,
  type PickerGroup,
  type PickerOption,
  pickerGroups,
  pickerOptions,
  toggleKey
} from "../utils/picker";
import type { Topic } from "../utils/topics";

export interface SkillPicker {
  /** Whether the list is standing open under the field. */
  open: boolean;
  /** What has been typed into the field. */
  query: string;
  /** The keys of the tools that are lit. Empty means all of them are. */
  chosen: ReadonlySet<string>;
  /** The five topics as the list shows them, narrowed by {@link query}. */
  groups: PickerGroup[];
  /** Where the keyboard is in the flat list, or -1 when it is nowhere. */
  cursor: number;
  /** How many tools are lit. Zero means the choice is empty, so all are. */
  count: number;
  root: RefObject<HTMLDivElement | null>;
  list: RefObject<HTMLDivElement | null>;
  field: RefObject<HTMLInputElement | null>;
  type: (value: string) => void;
  /** Opens the list without moving the cursor — what pressing the field does. */
  show: () => void;
  /** The chevron: open it, or shut it if it is already open. */
  toggle: () => void;
  /** Lights one tool, or puts it out again. The list stays open. */
  choose: (option: PickerOption) => void;
  /** Puts every tool back on, and empties the field with it. */
  clear: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * The one control section 4 has: which tools are lit, what has been typed to
 * find them, and where the keyboard is in the list.
 *
 * All of it is one hook because all of it can be wrong together — a cursor
 * pointing at an option the query has just filtered away, a list standing open
 * over a section the reader has already left — and state that can reach a
 * combination nobody wants has one owner.
 *
 * `active` is the SECTION's own cue. A list left hanging open over the next
 * section would be a menu belonging to a screen that is no longer there, so
 * arriving and leaving both shut it. The CHOICE survives that on purpose: a
 * reader who lit four tools, walked forward to the roles and came back has not
 * changed their mind about the four.
 */
export function useSkillPicker(topics: readonly Topic[], active: boolean): SkillPicker {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState<ReadonlySet<string>>(() => new Set());
  const [cursor, setCursor] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  const groups = pickerGroups(topics, query);
  const options = pickerOptions(groups);

  useEffect(() => {
    if (!active) setOpen(false);
  }, [active]);

  // A press anywhere else shuts the list. `pointerdown` and not `click`: the
  // reader has already decided by the time the finger lands, and waiting for
  // the release leaves the list open over whatever is being pressed.
  useEffect(() => {
    if (!open) return;

    const onDown = (event: PointerEvent) => {
      const node = event.target;
      if (node instanceof Node && root.current?.contains(node)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  /**
   * The list keeps its own wheel and its own finger.
   *
   * `shell/Stage/hooks/useStage.ts` listens on the window and spends every
   * gesture on the section — it only asks `absorbedByPane` under reduced
   * motion, so without this an open list would scroll the badges behind it
   * instead of itself. Stopping the event at the list is enough: the stage's
   * listener is further up, on the window, and never sees it.
   *
   * Native listeners rather than React props, because both events are passive
   * by default in React and the panel must also be free to scroll itself.
   */
  useEffect(() => {
    const node = list.current;
    if (!open || !node) return;

    const keep = (event: Event) => event.stopPropagation();
    node.addEventListener("wheel", keep);
    node.addEventListener("touchmove", keep);
    node.addEventListener("touchstart", keep);
    return () => {
      node.removeEventListener("wheel", keep);
      node.removeEventListener("touchmove", keep);
      node.removeEventListener("touchstart", keep);
    };
  }, [open]);

  // The option the keyboard is on has to be visible to be of any use. `nearest`
  // scrolls the list by the least that makes it so, and never the page.
  useEffect(() => {
    if (!open || cursor < 0) return;
    const node = list.current?.querySelector('[data-cursor="true"]');
    node?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  const type = useCallback((value: string) => {
    setQuery(value);
    setOpen(true);
    // The list under the cursor has just changed, so the cursor is nowhere
    // again. Anything else points at a row that has moved or gone.
    setCursor(-1);
  }, []);

  const show = useCallback(() => setOpen(true), []);

  const toggle = useCallback(() => {
    setOpen((was) => !was);
    field.current?.focus();
  }, []);

  const choose = useCallback((option: PickerOption) => {
    setChosen((was) => toggleKey(was, option.key));
    setCursor(option.index);
    // A multiple choice stays open — the reader is picking tools, not one
    // tool — and the field keeps the focus so the next key press still lands
    // in the list rather than on whatever was pressed.
    field.current?.focus();
  }, []);

  const clear = useCallback(() => {
    setChosen(new Set());
    setQuery("");
    setCursor(-1);
    field.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const step = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;

      if (step !== 0) {
        event.preventDefault();
        setOpen(true);
        setCursor((was) => moveCursor(was, step, options.length));
        return;
      }

      if (event.key === "Enter") {
        const option = cursor < 0 ? undefined : options[cursor];
        if (!option) return;
        event.preventDefault();
        choose(option);
        return;
      }

      if (event.key === "Escape") {
        // One press per thing to undo, innermost first: the list, then what
        // was typed to narrow it. A single press that did both would take the
        // reader further back than they asked to go.
        event.preventDefault();
        if (open) {
          setOpen(false);
          return;
        }
        setQuery("");
        setCursor(-1);
      }
    },
    [choose, cursor, open, options]
  );

  return {
    open,
    query,
    chosen,
    groups,
    cursor,
    count: chosen.size,
    root,
    list,
    field,
    type,
    show,
    toggle,
    choose,
    clear,
    onKeyDown
  };
}
