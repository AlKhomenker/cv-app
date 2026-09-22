# components/ui

shadcn components, added with the generator's layout and then styled on **this
app's** tokens.

`components.json` at the app root configures the generator: `@/components/ui`
for the parts, `@/lib/utils` for `cn`, lucide for icons. `npx shadcn@latest add
<name>` drops a new one in here.

## They are styled on `theme.css`, not on shadcn's palette

The generator's components arrive spelling `--background`, `--foreground`,
`--primary`, `--muted`, `--border`. Importing that palette would put a second
colour source beside `theme.css`, which the app's strictest rule exists to
prevent — and one of the names collides outright: **shadcn spends `accent` on a
hover surface, and here the accent is the page's blue.** `hover:bg-accent`
would have painted solid blue.

Copied-in components are meant to be edited, so they are. Every one below is
drawn in glass, hair, ink, soft and the beam hues, and there is still exactly
one place a colour is decided.

## What each one replaced

| component                  | replaced                                              | what the library actually brought                                |
| -------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| `button`                   | `common/ui/BeamButton`                                | CVA variants, `asChild`, `cn` so a caller's class wins           |
| `badge`                    | two hand-rolled pill class constants                  | one label surface for both                                       |
| `input` `textarea` `label` | the `BOX` constant in `FormRow`                       | Radix's label press behaviour                                    |
| `accordion`                | `common/ui/Collapse` + `Faq/useOneOpen`               | a MEASURED open height, and one-open for free                    |
| `dialog`                   | `common/utils/focusTrap` + half of `usePanelGestures` | a real focus trap, Escape, `aria-modal`, aria-hidden on the rest |
| `carousel`                 | the deck's own snap timer and key handling            | snaps, bounds, tween, `canScrollPrev/Next`                       |

`Button`'s `beam` variant is the one place the generator's output was not
enough: the travelling conic ring is this page's own and is kept as a variant
rather than dropped for a flat fill.

`Carousel` has one addition — a continuous `line`. The generator publishes
`selectedScrollSnap`, an integer, which is all a slider needs; section 5 is a
fanned deck that places every card by its distance from the reading position
and needs the value between two snaps as well.

## What did not move

The motion. `LineReveal`, `Emerge`, `GradientRing`, the stage, the timeline
track, the card fan and the dot dispersal are all functions of a scroll
position the stage owns, and no library has an opinion about a page whose
scroll is not the document's. `usePanelGestures` survives for exactly that
reason: Radix takes focus and Escape, and the wheel and the finger stay here.
