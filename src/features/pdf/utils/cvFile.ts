import { CV_FILE } from "@/config";

/**
 * Where the file is, seen from wherever the page happens to be served.
 *
 * `vite.config.ts` sets `base: "./"` so the built `dist/` runs from any folder
 * and from a plain file path; a leading slash would break both of those. That
 * decision arrives here as `BASE_URL`, which is why the path is joined and not
 * written out — this is the one line that turns {@link CV_FILE} into a URL,
 * and the only line that has to change if the base ever does.
 */
export const CV_URL = `${import.meta.env.BASE_URL}${CV_FILE}`;
