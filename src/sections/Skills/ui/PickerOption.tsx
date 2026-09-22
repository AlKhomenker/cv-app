import { Icon } from "@/common/ui/Icon";
import type { PickerOption as Option } from "../utils/picker";

export interface PickerOptionProps {
  option: Option;
  id: string;
  chosen: boolean;
  cursor: boolean;
  onChoose: (option: Option) => void;
}

/** One tool in the open list: its monogram, its name, and a tick once it is on. */
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
