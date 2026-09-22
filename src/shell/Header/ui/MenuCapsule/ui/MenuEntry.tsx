import { HintLabel } from "@/common/ui/HintLabel";
import type { HeaderLink } from "../../../types";
import { GLYPH_CLASS } from "../../../utils/classes";
import { MENU } from "../utils/capsule";

export interface MenuEntryProps {
  link: HeaderLink;
  /** Its place down the column, which is what paces its arrival. */
  index: number;
  /** Whether the capsule has opened. Shut, the entry is not there at all. */
  shown: boolean;
  /** The row height the column was fitted to. */
  row: number;
  onPick: (id: string) => void;
}

/**
 * One section in the compact menu: its glyph, with its name beside it while a
 * pointer is on it or the focus is in it.
 *
 * It is the same anchor `HeaderNav` writes — a real `href`, so the link can be
 * opened or copied like any other, with the jump prevented because the stage
 * moves rather than the document. The name is in `aria-label` as well as in
 * the bubble: the bubble is decoration, and a finger never sees one.
 *
 * The entries appear one after another, which is the one place on this page a
 * stagger is right: the column is vertical, so it reads as the frame filling
 * as it grows rather than as a sweep across the screen. The delay is dropped
 * on the way out, or the last glyph would still be fading while the frame that
 * held it has already shut.
 */
export function MenuEntry({ link, index, shown, row, onPick }: MenuEntryProps) {
  const Glyph = link.icon;

  return (
    <HintLabel
      label={link.label}
      side="end"
      className={`w-full shrink-0 transition-opacity duration-(--dur) ease-page ${shown ? "opacity-100" : "opacity-0"}`}
      style={{ transitionDelay: shown ? `${index * MENU.stagger}ms` : "0ms" }}>
      <a
        href={`#${link.id}`}
        className={`${GLYPH_CLASS} w-full rounded-full aria-[current=true]:text-ink`}
        style={{ height: row }}
        aria-label={link.label}
        aria-current={link.current ? "true" : undefined}
        onClick={(event) => {
          event.preventDefault();
          onPick(link.id);
        }}>
        <Glyph />
      </a>
    </HintLabel>
  );
}
