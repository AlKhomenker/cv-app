# Emerge

A block making the page's one entrance: out of its own centre, slowly. A
`scale` from 0.92 and an `opacity` over `--dur-reveal`, with no translate, on
the page's single easing — the flag-driven block form of
`common/utils/emerge.ts`.

`shown` drives both directions, and it is a section's own `active`. Going
false takes the block back out the same way.

## What belongs in it, and what does not

Use it for what a section brings in **all at once**. A section that paces its
contents off the reading position instead — the skills' badges, the strengths'
stars, the contact rows — writes `emergeStyle(arrivalAt(…))` inline and never
comes through here: there is no moment those arrive AT, there is a position
they are a function of. `common/ui/LineReveal` is the same entrance for a
single line of text, as keyframes rather than as a transition, because a line
has to play on the first frame it is drawn and a transition cannot promise
that.

## The lines inside it do not repeat it

It publishes `Emerging`, and a `LineReveal` under it draws plainly. Two
identical curves on one set of words multiply into a third, slower one, and
the heading ends up arriving after the paragraph beneath it. See
`common/ui/LineReveal/README.md` for the measurements.

## It is a `div` on purpose

Anything with an `opacity` or a `scale` of its own is **wrapped** rather than
given these classes. Two rules naming one property on one element are settled
by whatever order Tailwind happens to emit them in, which is not an order
anyone here chose.

## The one section that cannot use it

A scale on an ancestor changes what `getBoundingClientRect` reports and does
**not** fire a `ResizeObserver`, so anything inside that measures itself is
handed numbers 8% small — and a stage slide is drawn from the first frame, off
screen and scaled down, which is exactly when a carousel initialises. Section
5 writes its fade by hand for that reason; the note is in
`sections/Education/Education.tsx`. Anything else that measures itself under
an `Emerge` has the same problem and the same answer: read `offsetHeight` and
`clientHeight`, which are layout values a transform does not touch. That is
what `sections/Skills/hooks/useRowsFit.ts` does.

## The duration is not decoration

A section has to finish emptying before the stage hides it — the slide waits
`--reveal-out`, which is longer than `--dur-reveal` on purpose — and the step
cooldown in `shell/Stage/hooks/useStage.ts` is `--dur-reveal` for the same
reason. A section whose body answered nothing at all would sit at full opacity
for the whole wait and then blink out in one frame when visibility flipped,
which is what this was added to stop.
