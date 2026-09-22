import { useNarrowScreen } from "@/common/hooks/useNarrowScreen";
import { useLocale } from "@/i18n";
import { useHeaderLabels } from "./hooks/useHeaderLabels";
import type { HeaderLink } from "./types";
import { HeaderNav } from "./ui/HeaderNav";
import { LanguageToggle } from "./ui/LanguageToggle";
import { MenuCapsule } from "./ui/MenuCapsule";
import { ThemeToggle } from "./ui/ThemeToggle";

export interface HeaderProps {
  links: readonly HeaderLink[];
  /** Whether the section names are written in. The toggles never leave. */
  shown: boolean;
  onPick: (id: string) => void;
}

/**
 * The bar across the top: the section names at one end, language and theme at
 * the other. The bar itself has no surface — no fill, no border, no shadow —
 * so the names sit directly on the moving light. The only glass in it is the
 * two toggles, which are controls and need an edge to be pressable.
 *
 * It starts above the top edge and slides into place once, on load. It also
 * fades, which is not its own doing: a role filling the screen carries a close
 * control in the corner this bar keeps its toggles in, so `theme.css` takes it
 * out of the way while one is open. The transition for that is declared here
 * rather than there, because a bar's own movement belongs to the bar.
 *
 * Everything is laid out with logical properties, so the two ends swap when
 * the page turns Hebrew and no component is told about it.
 *
 * Below `md` the names do not fit, so the end they are written at carries the
 * menu as ONE control instead — see `MenuCapsule`. Only one of the two is ever
 * rendered: the other would keep its state and its tab stops while nobody
 * could see it.
 */
export function Header({ links, shown, onPick }: HeaderProps) {
  const { content } = useLocale();
  const labels = useHeaderLabels(shown);
  const narrow = useNarrowScreen();

  return (
    <header
      className="fixed inset-x-0 top-0 z-30 px-(--gutter)
        pt-[calc(env(safe-area-inset-top,0px)+8px)]
        md:px-6 md:pt-[calc(env(safe-area-inset-top,0px)+12px)]
        lg:px-10
        translate-y-[-130%] transition-[transform,translate,opacity] duration-(--dur-slow) ease-page
        entered:translate-y-0"
      data-entered={labels.entered}
      data-print="hide">
      {/* No preventDefault: the browser's own jump is what moves focus into
          `#main`. The handler only tells the stage to get out of the way. */}
      <a
        className="absolute -top-50 inset-s-(--gutter) z-1 rounded-glass border border-hair
          bg-page px-4 py-2.5 text-ink no-underline
          transition-[top] duration-(--dur) ease-page focus:top-1"
        href="#main"
        onClick={() => onPick("main")}>
        {content.ui.skip}
      </a>
      <div
        className="mx-auto flex min-h-11 max-w-(--maxw) items-center gap-1.5 md:min-h-13 md:gap-2.5 lg:min-h-14"
        onPointerEnter={labels.hold}
        onPointerLeave={labels.release}
        onFocus={labels.hold}
        onBlur={labels.release}>
        {narrow ? (
          <MenuCapsule links={links} onPick={onPick} />
        ) : (
          <HeaderNav links={links} shown={labels.shown} onPick={onPick} />
        )}
        <div className="ms-auto flex flex-none items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
