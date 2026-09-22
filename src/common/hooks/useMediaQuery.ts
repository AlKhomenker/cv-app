import { useEffect, useState } from "react";

/**
 * One media query, as a boolean that follows changes to it.
 *
 * It exists because there are now two of them — the reader asking for less
 * movement, and what the reader is pointing WITH — and a second copy of ten
 * lines of `matchMedia` is a second place for the listener to be removed
 * wrongly. The queries themselves stay in the named hooks beside this one:
 * a component asks what it wants to know, never what to match.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    // Read once on subscribe as well: between the first render and this effect
    // the answer can already have changed, and on a first render on the server
    // it was never read at all.
    setMatches(media.matches);

    const onChange = () => setMatches(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
