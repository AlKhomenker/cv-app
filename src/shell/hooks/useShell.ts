import { useLocale } from "@/i18n";
import { SECTION_GLYPHS, STAGE_SECTIONS } from "@/sections";
import type { HeaderLink } from "../Header";
import { useStage } from "../Stage/hooks/useStage";

/**
 * What the page is made of: the stage, and one list of links over it.
 *
 * It used to be the seam of the rewrite — the stage sections on one side, the
 * sections still living in a scrolling document on the other, and one list of
 * links over both so the header did not have to know the difference. A link
 * into that document could not simply scroll, because the stage held the
 * scroll and the document was locked until it let go, so the id was parked and
 * the jump was made once the release had landed.
 *
 * None of that is here any more. There is one list of sections and every link
 * is a step on the stage, so navigating is `goTo` and nothing else.
 */
export function useShell() {
  const { content } = useLocale();
  const { index, calm, progress, goTo, seek } = useStage(STAGE_SECTIONS);

  const links: HeaderLink[] = STAGE_SECTIONS.map((section, position) => ({
    id: section.id,
    label: content.sections[section.id],
    icon: SECTION_GLYPHS[section.id],
    current: position === index
  }));

  const navigate = (id: string) => {
    const position = STAGE_SECTIONS.findIndex((section) => section.id === id);
    if (position >= 0) goTo(position);
  };

  return { stage: { index, calm, progress, seek }, links, navigate };
}
