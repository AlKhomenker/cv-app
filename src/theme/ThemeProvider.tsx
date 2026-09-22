import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext, type ThemeValue } from "./ThemeContext";
import { applyTheme, documentTheme, readStoredTheme, type Theme } from "./utils/themeStorage";

/**
 * Holds which theme the page wears and keeps the document in step with it.
 *
 * The initial value is read off the document rather than decided here: the
 * boot script in `index.html` has already written it, so the first render
 * agrees with what is on screen and neither theme flashes.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme() ?? documentTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // The cross-fade is held back by one paint. Without this the very first
  // frame would animate from the stylesheet's defaults into the stored theme.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.documentElement.dataset.themeReady = "true";
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo<ThemeValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
