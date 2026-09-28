/**
 * The address as a reader would type it: no scheme, no trailing slash.
 * `https://alkhomenker.github.io/cv-app/` is written under the code as
 * `alkhomenker.github.io/cv-app`, which is what the CV prints too.
 */
export function shortAddress(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
