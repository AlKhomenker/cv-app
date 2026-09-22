import { useLocale } from "@/i18n";
import { TOGGLE_CLASS } from "../utils/classes";

/** Two letters of the language it switches to, named in that same language. */
export function LanguageToggle() {
  const { content, toggleLocale } = useLocale();

  return (
    <button type="button" className={TOGGLE_CLASS} aria-label={content.toggle.label} onClick={toggleLocale}>
      <span className="text-[0.72rem] font-bold tracking-[0.02em]">{content.toggle.glyph}</span>
    </button>
  );
}
