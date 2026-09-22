import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { LocaleProvider } from "@/i18n";
import { ThemeProvider } from "@/theme";
import "@/styles/tailwind.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/theme.css";

const container = document.getElementById("root");
if (!container) throw new Error("index.html has no #root to mount into");

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>
);
