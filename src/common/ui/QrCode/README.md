# QrCode

A string as a QR code a phone can take a picture of. Used twice: the LinkedIn
row in `sections/Contacts`, and the header's page code in `shell/Header/ui/SiteQr`.

It takes the text and the name a screen reader hears, and nothing else. Where it
sits, how big it is and when it shows belong to the caller.

## How it is drawn

Drawn here, from nothing. `utils/qr.ts` is a byte-mode encoder at
error-correction level L, versions 1 to 6 — up to 134 bytes, which is every URL
this page will ever hold, and six is the last version that carries no
version-information block.

It is not a package because a package is the wrong trade for two codes of two
URLs: `utils/qr.ts` is smaller than the smallest QR library's bundle, has no
dependency to keep current, and draws as a few dozen SVG rectangles — one per
RUN of dark modules, not one per module — in `currentColor`, so it follows the
theme with nothing to redraw.

All eight masks are laid out and scored by the standard's four penalty rules,
and the best is kept. The mask is not cosmetic: it is what stops the data
drawing something a scanner would mistake for a finder pattern, and picking one
without scoring is how a code that works on one phone fails on another.

**What was checked**, because a QR code that is subtly wrong looks exactly like
one that is right:

- the generator polynomials for 7, 10 and 15 check codewords match the ones
  published in the standard, coefficient for coefficient;
- all eight format-bit strings for level L match the published table;
- the finder patterns, the timing rows, the separators and the always-dark
  module are where they belong;
- and the finished matrix decodes back to the exact URL, in byte mode, at every
  version from 1 to 6 — including each version's exact byte capacity, and a
  UTF-8 string that is not Latin.

That last check is now made by a reader written **against the standard rather
than against this file**, and it is the whole reason the list above is worth
anything. The read-back it replaced shared this file's own idea of where the
modules go, so it agreed with the encoder about two things the standard
disagreed with, and reported a clean decode both times:

- **the first copy of the format bits was written backwards.** A scanner reads
  that copy first, finds its BCH check fails, and falls back to the second one
  — so the code read, and the copy meant to be the fallback was the only one
  that worked.
- **the module walk stepped onto the timing column instead of over it.** The
  pairs of columns must run 5-4, 3-2, 1-0 once past column 6; shifting only the
  pair that meets it and then carrying on from 6 visits one column twice, never
  visits column 0, and turns the wrong way for everything to the left. The data
  codewords are long placed by then, so only the tail of the error correction
  landed wrong — five of fifteen check bytes on the profile URL. The code still
  read, by being CORRECTED, which spends the budget that is supposed to survive
  a thumbprint on the screen.

Both are fixed. What the two have in common is worth keeping in mind for
anything else hand-rolled from a spec: they were invisible to every test that
was written from the same understanding as the code.

## Why the `useMemo` stays

The matrix is eight full layouts and eight penalty scores, and the rows it is
drawn in re-render on every wheel event. The React Compiler is off in this repo
(see `.claude/rules/ReactRules.md` §5), so the memo is what keeps that work to
one run per text. `darkRuns` in `utils/runs.ts` is kept apart from `utils/qr.ts`
because it is about drawing the matrix, not about building it.
