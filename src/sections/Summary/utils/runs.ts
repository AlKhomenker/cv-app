/** Where the one accent number is written into a sentence. */
const SHARE = "{share}";

/** How a Latin run is marked in the content: `ב-[[TypeScript]]`. */
const LATIN = /\[\[([^\]]+)\]\]/g;

export interface TextRun {
  /**
   * Its place in the sentence. The sentence is fixed — runs are never added,
   * removed or reordered, only replaced wholesale when the language changes —
   * so where a run sits IS which run it is.
   */
  key: string;
  text: string;
  /** Kept in its own `dir="ltr"` span. */
  ltr: boolean;
  /** The one accent in the whole summary: the share of pull requests reviewed. */
  accent: boolean;
}

interface Part {
  text: string;
  ltr: boolean;
  accent: boolean;
}

/**
 * One sentence, cut into the pieces that have to be wrapped and the pieces
 * that do not.
 *
 * Only Hebrew carries any marks, and that is the point of them: a run of
 * Latin inside Latin needs no isolating, while `.NET`, `C#` and `80%` inside
 * Hebrew come out with the dot, the hash and the percent sign on the wrong
 * end unless each sits in its own `dir="ltr"`. A sentence with no marks comes
 * back as a single run and is rendered as plain text.
 */
export function textRuns(text: string, share: string): TextRun[] {
  const [lead, tail] = text.split(SHARE);
  const parts = latinParts(lead ?? "");

  if (tail !== undefined) {
    parts.push({ text: share, ltr: true, accent: true });
    parts.push(...latinParts(tail));
  }

  return parts.filter((part) => part.text.length > 0).map((part, position) => ({ ...part, key: `${position}` }));
}

function latinParts(text: string): Part[] {
  const parts: Part[] = [];
  let plain = 0;

  for (const match of text.matchAll(LATIN)) {
    parts.push({ text: text.slice(plain, match.index), ltr: false, accent: false });
    parts.push({ text: match[1] ?? "", ltr: true, accent: false });
    plain = match.index + match[0].length;
  }
  parts.push({ text: text.slice(plain), ltr: false, accent: false });

  return parts;
}
