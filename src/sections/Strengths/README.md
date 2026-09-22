# Strengths

Section 6. Eight strengths scored out of five, and the three languages they are
exercised in.

```
                        Strengths

  Stress resilience              ★ ★ ★ ★ ★   5/5
  Communication                  ★ ★ ★ ★ ★   5/5
  Ownership and responsibility   ★ ★ ★ ★ ★   5/5
  …
  Fast learner                   ★ ★ ★ ★ ☆   4/5

                        Languages
              ( Hebrew ) ( English ) ( Russian )
```

## Why the languages are in here

Because they are one answer. "What are you like to work with, and what can you
be worked with in" was two stops on the old scrolling page with a rule between
them, which made a reader scroll past a heading to reach three words — and
three words have never been a screen.

The languages keep a name of their own, as an `h3` through the page's one
`SectionTitle`, so the document still has both headings in it. What went is the
second screen, not the second idea.

## The stars are counted, not shown

The **first row is not counted in**. It is in place at progress 0, stars and
all, so it arrives with the title above it rather than after it — a heading
over an empty column reads as a screen still loading.

The rest are counted from the row under it: row `i` (numbered from there)
starts at progress `0.05 + i × 0.055` and completes within `0.12` of it.
Inside that window each earned star follows the one before it by `0.012` —
small enough that all five land inside the row's own arrival, so a five reads
as a hand being dealt rather than as a block appearing.

The two entrances are **nested**, and that is the point: the row carries the
label into place while the marks fill in behind it, and because a scale inside
a scale multiplies, a star that has not been counted yet is inside a row that
has not fully arrived either.

An **unearned** mark has no arrival at all. It is the outline that says how
many there could have been, and it is drawn from the first frame — a row of
four that arrived as a row of five would say the wrong thing for a moment.

Everything here is the page's one entrance: out of the centre, over
`--dur-reveal`, through `common/utils/emerge.ts`. Nothing translates.

## Three ways of saying one number

The stars are read at a glance, the figure beside them is read when the glance
was not enough, and a screen reader is given neither — it gets one sentence,
`"Stress resilience: 5 out of 5"`, built by `utils/rating.ts` from a template
the locale owns. Five marks read out one at a time would be five pieces of
noise for one number, which is why the hand carries `role="img"` and a label
rather than five glyphs.

The figure is tabular so eight of them line up down the page, and `dir="ltr"`
because `4/5` is a number and not a phrase.

## It has to fit

The section is pinned and the stage keeps every gesture, so the eight rows and
the languages have to fit the screen they are on — the type, the gaps and the
star size are all `clamp(…, min(Xvw, Yvh), …)`, which answers a narrow screen
and a short one at once. Under reduced motion the stage gives the section no
scroll, every mark is in place from the first frame, and the rows become an
ordinary column that scrolls itself.

## What this section took with it

`features/strengths` and `features/languages` are both gone, and so is
`Stars`' old `group-arrived:` entrance — it was a row's stagger inherited
through `transition-delay: inherit`, which the observer below the stage wrote.
There is no observer up here; there is a reading position.
