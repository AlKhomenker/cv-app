# Summary

Section 2. One glass card in the middle of the screen, and four blocks of text
passing through it as the reader scrolls.

```
        ┌───────────────────────────┐
        │   ·  ·  · (dissolving)    │
        │                           │
        │   ⑂                       │  ← the block's own mark
        │   Reviews around 80% of   │  ← the reading line
        │   the company's client …  │
        │                           │
        │   ·  ·  · (arriving)      │
        └───────────────────────────┘
                  SUMMARY              ← the caption
```

## Each block carries a mark

A small glyph over the sentence, one per block, saying what the block is about
before it is read — and, as the strip moves, the line between one block and the
next.

It is chosen by the block's **id** and never by its words — the four blocks
are the same four in both languages, and a mark read off a sentence would
change when the sentence was translated. The map is `utils/glyphs.ts`:

| block    | mark             | what it heads                                  |
| -------- | ---------------- | ---------------------------------------------- |
| `craft`  | `Code`           | React and TypeScript over .NET, C# and Node.js |
| `impact` | `GitPullRequest` | the reviews, the refactor, the products owned  |
| `ai`     | `Bot`            | the agentic lifecycle, Claude skills and rules |
| `lead`   | `Users`          | parallel projects and mentoring                |

A block whose id is not in that map simply has no mark — a new sentence in the
strip is never a strip that fails to draw. Which is also why the map has to be
**read when the summary is rewritten**: nothing breaks to tell you, the marks
just stop appearing.

It is in the **quiet ink**, not the accent. This section's accent is the share
of pull requests reviewed — one number, in one of the four sentences — and a
second accented thing over every block would take that highlight away from it.

It is sized in `em` and sits in flow above the text, so it grows with the
sentence it marks and the two are centred on the reading line as one thing.

## The title is under the card

The card IS the section — four sentences passing through one pane — so a title
above it would be the first thing read on a screen whose whole point is the
sentence at the reading line. Underneath, it is a caption: the reader arrives
at the words, and the word for what they are is below them. It fades in with
the card, on `active`, over `--dur-slow`.

It is also the section's only heading. The outline a screen reader and a search
engine read the page by had a gap here, and `aria-label` on a region is not a
heading. The region keeps its label as well, the way section 4 does — the same
word twice is cheaper than a heading nothing can find.

## Two cues, not one animation

The **card** answers `active`. It grows out of the exact centre — scale 0.6 to
1, opacity 0 to 1, the backdrop blur ramping from nothing to full, all over
`--dur-slow` on the shared curve — and collapses back into it along the same
path. One animation played forwards and backwards, which is why it never
reads as sliding in from anywhere: `transform-origin` is the centre and there
is no translate in it at all.

The **strip** answers `progress`, the reader's position inside the section,
which the stage hands down. Every block's size, opacity and blur are a
function of its signed distance from the reading line and of nothing else, so
scrolling back up runs the same states backwards rather than playing a second
animation. There is no entrance state and no exit state to get out of step.

## Why the blocks are positioned, not laid out

Each block is centred on the card's middle and pushed off it by
`--away × --step`. They are absolutely positioned, so the step between two
blocks is the same wherever they are, whatever length the sentence is and in
either language — and nothing has to be measured to know it. A flow column
would need every block's height read back before the strip could be put in the
right place, which is a `ResizeObserver`, a render per measurement, and a
different answer in Hebrew.

The card never grows to fit and never carries a scrollbar. The strip is
clipped, and the clip is masked at both ends: a line that stops against a hard
edge reads as text cut off by a box, and one that fades reads as text
dissolving into glass.

## The dwell

`readingLine` does not map progress to position linearly. Most of each block's
turn is spent still at the line and the rest is the move to the next one —
otherwise a reader scrolling steadily is always reading a sentence that is
always sliding. `READING_DEPTH` is the other half of the same decision: a
little over two screens of scroll for the whole strip, which is one reading of
each block at a normal pace and no longer.

## The marks in the content

A sentence arrives with two kinds of mark in it. `{share}` is where the one
accent number goes — the share of client pull requests reviewed, the only
highlighted thing in the section. `[[like this]]` is a Latin run that has to
keep its own direction.

Only the Hebrew carries any `[[ ]]`, and that is the point of them: Latin
inside Latin needs no isolating, while `.NET`, `C#` and `80%` inside Hebrew
come out with the dot, the hash and the percent sign on the wrong end without
a `dir="ltr"` around each. `utils/runs.ts` cuts the sentence; a sentence with
no marks comes back as one run and is rendered as plain text.

## Why the card is not `.glass`

`theme.css` gives `.glass` a `transition` from a more specific selector than a
module class. Wearing it, the card would take that transition instead of its
own and stop growing out of the centre. The card writes the same tokens out
itself — and adds the backdrop ramp, which the shared recipe has no room for.

## Reduced motion

The card is at full size from the start and the four blocks are an ordinary
column: no strip, no reading line, no mask, no blur. That column can be taller
than the card, so it scrolls, and `Stage/utils/scrollers.ts` is what stops the
stage swallowing the gesture meant for it.
