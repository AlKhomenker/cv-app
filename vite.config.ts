import { existsSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import tailwind from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { CV_FILE } from "./src/config";

/**
 * Shouts when the CV is not there.
 *
 * The download hands over a FILE and nothing draws it, so a missing one is
 * invisible in the worst possible way: an unknown path gets `index.html` back
 * — that is what an SPA fallback is for — and the browser saves that page
 * under the CV's name, because `download` names the file without checking what
 * arrived. The reader ends up with a `.pdf` their viewer will not open, and
 * nothing anywhere has reported an error.
 *
 * So the absence is reported here instead, at the only two moments it can be:
 * a warning when the dev server starts, and a FAILED BUILD, because a build
 * without the file is a broken download on a static host where nobody is
 * reading a terminal.
 */
function requireCv(): Plugin {
  const cv = fileURLToPath(new URL(`./public/${CV_FILE}`, import.meta.url));
  const message =
    `The CV is missing from public/${CV_FILE}\n` +
    "The download serves that file directly — without it the server answers with\n" +
    "index.html and the reader saves a .pdf that will not open.\n" +
    "See src/features/pdf/README.md.";

  let building = false;

  return {
    name: "cv-card:require-cv",
    config(_config, env) {
      building = env.command === "build";
    },
    configureServer(server) {
      if (!existsSync(cv)) server.config.logger.warn(`\n${message}\n`);
    },
    buildStart() {
      if (building && !existsSync(cv)) this.error(message);
    }
  };
}

/**
 * One page, no router, no backend of its own. `base: "./"` so the built `dist/`
 * can be dropped on any static host, or opened from a file path, unchanged.
 */
export default defineConfig({
  base: "./",
  plugins: [react(), tailwind(), requireCv()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
  },
  server: { port: 3005, strictPort: true }
});
