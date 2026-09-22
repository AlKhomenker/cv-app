import { LineReveal } from "@/common/ui/LineReveal";
import { useLocale } from "@/i18n";
import type { HeaderLink } from "../types";

export interface HeaderNavProps {
  links: readonly HeaderLink[];
  /** Whether the names are written in. */
  shown: boolean;
  onPick: (id: string) => void;
}

/**
 * The section names, in the order the page is read in.
 *
 * They arrive together. A stagger along the row would be a sweep ACROSS the
 * screen, which is the reading the sections were deliberately taken off.
 *
 * At 360px the names do not fit, so the row carries its own scroll. Its
 * scrollbar is hidden the way every other one is.
 */
export function HeaderNav({ links, shown, onPick }: HeaderNavProps) {
  const { content } = useLocale();

  return (
    <nav
      className="flex min-w-0 flex-auto items-center gap-0.5 overflow-x-auto
        overscroll-x-contain scrollbar-none
        md:gap-1 lg:overflow-x-visible"
      aria-label={content.ui.menu}>
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="inline-flex min-h-8.5 flex-none items-center whitespace-nowrap
            rounded-glass px-2.5 text-[0.8rem] text-soft no-underline
            transition-colors duration-(--dur-fast) ease-page hover:text-ink
            aria-[current=true]:font-semibold aria-[current=true]:text-ink
            md:min-h-9.5 md:px-3 md:text-[0.85rem]"
          aria-current={link.current ? "true" : undefined}
          onClick={(event) => {
            event.preventDefault();
            onPick(link.id);
          }}>
          <LineReveal shown={shown}>{link.label}</LineReveal>
        </a>
      ))}
    </nav>
  );
}
