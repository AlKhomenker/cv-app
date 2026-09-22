import { Icon } from "@/common/ui/Icon";
import { useLocale } from "@/i18n";
import type { HeaderLink } from "../../types";
import { GLYPH_CLASS } from "../../utils/classes";
import { useMenuCapsule } from "./hooks/useMenuCapsule";
import { MenuEntry } from "./ui/MenuEntry";

export interface MenuCapsuleProps {
  links: readonly HeaderLink[];
  onPick: (id: string) => void;
}

/**
 * The whole menu as one round control, for a screen too narrow to write ten
 * section names across.
 *
 * It is deliberately NOT a dropdown. There is one element — the shut button's
 * own glass — and pressing it makes that frame TALLER, so the sections appear
 * inside the control the reader just touched rather than in a panel that has
 * arrived over the page. Nothing new is ever painted: the border, the fill and
 * the blur belong to the frame from the first frame to the last, and the
 * glyphs inside it wear no chrome of their own.
 *
 * The trigger does not fade out the way Weblace's capsule's does. It is the
 * first row of the open capsule, turning from a menu into a close, which keeps
 * one thing to press in one place and keeps `aria-expanded` on an element that
 * is still there to be announced.
 *
 * Nothing here is clipped, and that is the reason the entries fade in rather
 * than being wiped into view by the growing frame: an `overflow: hidden` that
 * clipped the column would clip the labels beside it too, and the labels are
 * the whole point of a column of glyphs. Shut, the entries are `inert` and
 * transparent, so they are neither seen nor reachable.
 */
export function MenuCapsule({ links, onPick }: MenuCapsuleProps) {
  const { content } = useLocale();
  const { rootRef, triggerRef, open, row, height, toggle, pick } = useMenuCapsule(links.length, onPick);

  return (
    // A fixed one-row slot: the capsule is absolute inside it and grows out of
    // it, so however tall it gets the bar does not reflow and the toggles at
    // the other end never move.
    <div ref={rootRef} className="relative size-8.5 flex-none">
      {/* `rounded-full`, not the page's `rounded-round`: 50% is a circle only
          while the box is square, and this one is a column of ten glyphs for
          most of its life. A pill is the same circle while it is shut. */}
      <div
        className="glass absolute top-0 inset-s-0 flex w-8.5 flex-col items-center rounded-full
          transition-[height,border-color] duration-(--dur-slow) ease-page hover:border-soft"
        style={{ height }}>
        <button
          ref={triggerRef}
          type="button"
          className={`${GLYPH_CLASS} h-8 w-full rounded-full`}
          aria-label={content.ui.menu}
          aria-expanded={open}
          onClick={toggle}>
          <Icon name={open ? "close" : "menu"} />
        </button>

        <span
          aria-hidden
          className="h-px w-4 shrink-0 bg-hair opacity-0
            transition-opacity duration-(--dur-fast) ease-page shown:opacity-100"
          data-shown={open}
        />

        <nav
          className={`flex w-full shrink-0 flex-col items-center ${open ? "" : "pointer-events-none"}`}
          aria-label={content.ui.menu}
          inert={!open}>
          {links.map((link, index) => (
            <MenuEntry key={link.id} link={link} index={index} shown={open} row={row} onPick={pick} />
          ))}
        </nav>
      </div>
    </div>
  );
}
