import { Icon } from "@/common/ui/Icon";
import { useLocale } from "@/i18n";
import { useTheme } from "@/theme";
import { TOGGLE_CLASS } from "../utils/classes";

/**
 * Icon only, so it carries its own name — and the name is the theme it
 * switches TO, which is the one a reader needs to hear before pressing it.
 */
export function ThemeToggle() {
  const { content } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      className={TOGGLE_CLASS}
      aria-label={dark ? content.theme.toLight : content.theme.toDark}
      aria-pressed={dark}
      onClick={toggleTheme}>
      <Icon name={dark ? "sun" : "moon"} />
    </button>
  );
}
