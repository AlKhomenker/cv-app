import { useContext } from "react";
import { ThemeContext, type ThemeValue } from "./ThemeContext";

/** The theme the page is drawn in. Every component reads it from here. */
export function useTheme(): ThemeValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme was called outside ThemeProvider");
  return value;
}
