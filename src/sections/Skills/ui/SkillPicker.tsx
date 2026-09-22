import { useId } from "react";
import { Icon } from "@/common/ui/Icon";
import type { SkillFilterWords } from "@/content";
import type { SkillPicker as Picker } from "../hooks/useSkillPicker";
import { chosenLabel } from "../utils/picker";
import { PickerOption } from "./PickerOption";

export interface SkillPickerProps {
  picker: Picker;
  words: SkillFilterWords;
  className?: string;
}

/** The one control in section 4: a combobox naming any number of the tools. See `../README.md`. */
export function SkillPicker({ picker, words, className }: SkillPickerProps) {
  const listId = useId();
  const cursorId = picker.cursor < 0 ? undefined : `${listId}-${picker.cursor}`;

  return (
    <div
      ref={picker.root}
      className={["relative mx-auto mt-[clamp(6px,1.6vh,14px)] w-full max-w-95", className].filter(Boolean).join(" ")}>
      <div
        className="flex items-center gap-1.5 rounded-field border border-hair bg-glass-strong
          px-2.5 py-1 backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-sat)
          transition-[border-color] duration-(--dur-fast) ease-page
          focus-within:border-accent focus-within:focus-ring">
        <input
          ref={picker.field}
          type="text"
          role="combobox"
          aria-expanded={picker.open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={cursorId}
          aria-label={words.label}
          placeholder={words.label}
          value={picker.query}
          className="min-h-9 w-full min-w-0 bg-transparent font-sans text-[16px] text-ink
            placeholder:text-faint focus:outline-none
            md:text-[0.86rem]"
          onChange={(event) => picker.type(event.target.value)}
          onClick={picker.show}
          onKeyDown={picker.onKeyDown}
        />

        {picker.count > 0 && (
          <>
            <span
              role="status"
              aria-label={chosenLabel(words.chosen, picker.count)}
              className="rounded-full border border-accent px-1.5 text-[0.7rem] font-semibold leading-normal text-accent">
              {picker.count}
            </span>
            <button
              type="button"
              className="grid size-7 flex-none place-items-center rounded-full text-soft
                transition-[color] duration-(--dur-fast) ease-page hover:text-ink"
              aria-label={words.clear}
              onClick={picker.clear}>
              <Icon name="close" className="size-4 fill-none stroke-current [stroke-linecap:round] stroke-[1.6]" />
            </button>
          </>
        )}

        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="grid size-7 flex-none place-items-center rounded-full"
          onClick={picker.toggle}>
          <Icon
            name="chevron"
            className="size-4 fill-none stroke-soft [stroke-linecap:round] [stroke-linejoin:round]
              stroke-[1.6] transition-transform duration-(--dur) ease-page"
            style={{ rotate: picker.open ? "180deg" : "0deg" }}
          />
        </button>
      </div>

      {picker.open && (
        <div
          ref={picker.list}
          id={listId}
          role="listbox"
          aria-multiselectable="true"
          aria-label={words.label}
          className="absolute inset-x-0 top-[calc(100%+6px)] z-30 max-h-[min(44vh,320px)]
            overflow-y-auto overscroll-contain rounded-field border border-hair bg-glass-strong
            p-1.5 text-start shadow-(--glass-drop)
            backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-sat)">
          {picker.groups.length === 0 && <p className="px-2 py-2 text-[0.8rem] text-soft">{words.empty}</p>}

          {picker.groups.map((group) => (
            <div key={group.id} role="group" aria-label={group.label} data-topic={group.id}>
              <p
                className="flex items-center gap-1.5 px-2 pb-0.5 pt-1.5 text-[0.7rem] font-semibold
                  leading-none text-soft"
                aria-hidden="true">
                <span className="size-1.5 flex-none rounded-full bg-(--hue)" />
                {group.label}
              </p>

              {group.options.map((option) => (
                <PickerOption
                  key={option.key}
                  option={option}
                  id={`${listId}-${option.index}`}
                  chosen={picker.chosen.has(option.key)}
                  cursor={picker.cursor === option.index}
                  onChoose={picker.choose}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
