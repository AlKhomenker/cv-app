import { createContext } from "react";
import type { Theme } from "./utils/themeStorage";

export interface ThemeValue {
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeValue | null>(null);
