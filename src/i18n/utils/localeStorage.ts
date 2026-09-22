import { DIRECTION, type Locale } from "@/content";

/** The one key the page writes. `index.html` reads it before the first paint. */
const LOCALE_KEY = "cv-locale";

/** English is the default: the language the CV itself is written in. */
const DEFAULT_LOCALE: Locale = "en";

/**
 * Asked of `DIRECTION` rather than written out here, so the languages this
 * page has are named in one place. A third one is a line in `content/index.ts`
 * and nothing in this file.
 */
function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && Object.hasOwn(DIRECTION, value);
}

/**
 * What the document is already written in. The inline boot script has put the
 * stored choice there, so React starts from the language the reader is looking
 * at and the first render changes nothing.
 */
export function documentLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const current = document.documentElement.lang;
  return isLocale(current) ? current : DEFAULT_LOCALE;
}

export function readStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    // Private mode, or storage turned off. The default is answer enough.
    return null;
  }
}

/**
 * Writes the choice and puts it on the document in the same breath — the
 * language AND the direction, because the second is a fact about the first and
 * a caller that could pass one without the other is a caller that can get them
 * out of step.
 */
export function applyLocale(locale: Locale): void {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = DIRECTION[locale];
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    // Nothing to do: the language still holds for this visit.
  }
}
