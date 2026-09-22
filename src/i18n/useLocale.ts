import { useContext } from "react";
import { LocaleContext, type LocaleValue } from "./LocaleContext";

/** The current language and its words. Every component reads them from here. */
export function useLocale(): LocaleValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale was called outside LocaleProvider");
  return value;
}
