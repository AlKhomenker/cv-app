import { createContext } from "react";
import type { Direction, Locale, LocaleContent } from "@/content";

export interface LocaleValue {
  locale: Locale;
  dir: Direction;
  /** Every word on the screen, in the current language. */
  content: LocaleContent;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

export const LocaleContext = createContext<LocaleValue | null>(null);
