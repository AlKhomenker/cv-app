import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { CONTENT, DIRECTION, type Locale } from "@/content";
import { usePageTurn } from "./hooks/usePageTurn";
import { LocaleContext, type LocaleValue } from "./LocaleContext";
import { applyLocale, documentLocale, readStoredLocale } from "./utils/localeStorage";

/**
 * Holds the language the page is drawn in, and remembers it.
 *
 * The choice is kept the way the theme's is — one key in `localStorage`, read
 * by the boot script in `index.html` before the first paint — and for the same
 * reason: a reader who turned the page over to Hebrew and came back should not
 * have to turn it again. It goes no further than the browser it was made in;
 * nothing is sent anywhere.
 *
 * The initial value is read off the document rather than decided here, so the
 * first render agrees with what is already on screen. It arrives ALREADY in
 * that language rather than turning into it: the page turn belongs to a reader
 * changing their mind, and playing it on load would be the site announcing a
 * choice the reader made last time.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale() ?? documentLocale());
  const turn = usePageTurn();

  const content = CONTENT[locale];
  const dir = DIRECTION[locale];

  // The document says what it is written in and which way it reads, for the
  // browser's own reading tools and for every logical CSS property below. The
  // title is not part of that: it is one of the words, and `applyLocale` deals
  // in the document's own attributes and the key they are remembered under.
  useEffect(() => {
    applyLocale(locale);
    document.title = content.docTitle;
  }, [locale, content.docTitle]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      turn(DIRECTION[locale], DIRECTION[next], () => setLocaleState(next));
    },
    [locale, turn]
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "he" : "en");
  }, [locale, setLocale]);

  const value = useMemo<LocaleValue>(
    () => ({ locale, dir, content, setLocale, toggleLocale }),
    [locale, dir, content, setLocale, toggleLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
