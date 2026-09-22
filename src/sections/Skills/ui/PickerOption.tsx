import { Icon } from "@/common/ui/Icon";
import type { PickerOption as Option } from "../utils/picker";

export interface PickerOptionProps {
  option: Option;
  id: string;
  /** Whether this tool is one of the lit ones. */
  chosen: boolean;
  /** Whether the keyboard is standing on this row. */
  cursor: boolean;
  onChoose: (option: Option) => void;
}

/**
 * One tool in the open list: its monogram, its name, and a tick once it is on.
 *
 * It is a `button` inside a `role="option"` nowhere — it IS the option, and
 * carries the role itself, so a screen reader is told the one thing that is
 * true of it: selected, or not. The keyboard never lands on it either; the
 * field keeps the focus and points at this row through `aria-activedescendant`,
 * which is what the combobox pattern asks for and what stops `Tab` walking
 * through forty-two stops on the way out of the section.
 *
 * The hue is the row's own, inherited from the `data-topic` the group above
 * sets — the same colour this tool's badge is drawn in below, which is what
 * ties the list to the rows behind it without a word being written.
 */
export function PickerOption({ option, id, chosen, cursor, onChoose }: PickerOptionProps) {
  return (
    <div
      id={id}
      role="option"
      aria-selected={chosen}
      data-cursor={cursor}
      className="group/option flex cursor-pointer items-center gap-2 rounded-field px-2 py-1.5
        text-[0.82rem] leading-none text-ink
        transition-[background-color] duration-(--dur-fast) ease-page
        hover:bg-(--wash)
        data-[cursor=true]:bg-[color:var(--wash)]
        aria-selected:font-semibold"
      onPointerDown={(event) => event.preventDefault()}
      onClick={() => onChoose(option)}>
      <span
        className="grid size-4.5 flex-none place-items-center rounded-full
          text-[0.58rem] font-bold tracking-tight text-page
          bg-(--hue)"
        aria-hidden="true">
        {option.mark}
      </span>
      <span className="truncate" dir="ltr">
        {option.name}
      </span>
      <Icon
        name="check"
        className="ms-auto size-4 flex-none fill-none stroke-(--hue)
          opacity-0 [stroke-linecap:round] [stroke-linejoin:round] stroke-2
          transition-opacity duration-(--dur-fast) ease-page
          group-aria-selected/option:opacity-100"
      />
    </div>
  );
}
