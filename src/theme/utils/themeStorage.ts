export type Theme = "light" | "dark";

/** The one key the page writes. `index.html` reads it before the first paint. */
const THEME_KEY = "cv-theme";

/** Light is the default. The system preference is not consulted — see README. */
const DEFAULT_THEME: Theme = "light";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/**
 * What the document is wearing right now. The inline boot script has already
 * written it, so React starts from the same value the reader is looking at
 * and the first render changes nothing.
 */
export function documentTheme(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const current = document.documentElement.dataset.theme;
  return isTheme(current) ? current : DEFAULT_THEME;
}

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    // Private mode, or storage turned off. The default is answer enough.
    return null;
  }
}

/** Writes the choice and puts it on the document in the same breath. */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Nothing to do: the theme still holds for this visit.
  }
}
