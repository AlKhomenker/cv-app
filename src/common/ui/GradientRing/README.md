# GradientRing

A border painted as a gradient. It does not move, it does not answer a
pointer, and it has no bloom — it is an edge, drawn in the four hues the page's
light is made of.

## It is not the BeamButton's ring

`BeamButton` and this share one mechanism and nothing else:

|        | `BeamButton`                    | `GradientRing`              |
| ------ | ------------------------------- | --------------------------- |
| paint  | `--beam-paint`, a lit ARC       | `--ring-paint`, a full turn |
| when   | hover, focus, press             | always                      |
| motion | 6s a lap, paused at rest        | none                        |
| bloom  | a second, thicker, blurred ring | none                        |

The two gradients are deliberately different shapes. A beam is an arc with
transparent ends, because a beam has to have somewhere to travel from and to.
A border with transparent ends is a border with a gap in it, so `--ring-paint`
closes on the hue it opened with and the seam cannot be found.

## What it needs from its parent

Positioned, and a 1px border. An absolutely positioned child is sized to its
parent's PADDING box, so `-inset-px` reaches exactly the border box and the
`mask-ring` inside it leaves exactly that one pixel.

The parent keeps its `border-hair`. The ring is opaque and covers it, so they
are never seen at once — and where `mask-composite` is unavailable `mask-ring`
hides itself, leaving the hairline as the border. That is a fallback, not a
leftover.

## Where the colours come from

`--ring-paint` in `styles/theme.css`, built from `--beam-1` … `--beam-4` —
the same four the button's beam and the summary's accent number are drawn
from, so all three change in one place.
