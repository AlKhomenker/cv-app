# Opening

Section 1. Three lines and two buttons, centred in the middle of the full
viewport over the moving light — no card, no frame, no photograph.

```
        Alina Khomenker
    Senior Full-Stack Engineer
   6+ years, frontend oriented

  [ Write to me ] [ Download CV ]
```

Each line sits directly under the one before it with a small gap; the buttons
get a much larger one, because the lines are a block and the controls answer
them. That gap is a share of the screen — `clamp(72px, 15vh, 160px)` — not a
fixed 80px: the block is centred in whatever height the stage gives it, so a
gap counted off the screen holds the same proportion on a laptop and on a
phone held sideways, where a fixed one used to push the pair past the bottom
edge.
Nothing is placed by side, so there is no rule here for Hebrew to mirror.

## The pair is not this section's

The two buttons are `common/ui/CallToAction`, the component section 7 also ends
on. The pair a reader meets at the top of the page and the pair they meet at
the bottom have to be the same pair, and the only way to keep that true is for
them to be the same code.

All this section says about them is the gap above them. It does not say what
they look like, what they are labelled, or what pressing one does.

## The cascade runs the way the reader does

Four rows — name, role, years, and the pair of buttons, which move together
because a pair reads as a pair. Each is a `LineReveal`, and `rowDelay` spaces
them 100ms apart.

`direction` comes from the stage and reverses that order. Scrolling down, the
name moves first and the buttons last; scrolling back up, the buttons move
first and the name last. The stack therefore always fills and empties along the
scroll, never against it.

A line moves as ONE thing. It used to be one span per word, which read as a
sweep across the screen and fought the cascade down it.

## The entrance

`shown` is `active` — which the stage sets — and the entrance latch.

On a fresh load nothing moves until the webfonts have loaded and then
`--reveal-start` has passed. Both halves matter: the page still has a
stylesheet and a canvas to settle, and the two Google fonts load with
`display=swap`, so a swap landing mid-fade reflows every line at once and reads
as a blink rather than an entrance.

The stage holds the slide visible for `--reveal-out` on the way out, so it is
covered only once the last row has gone. That budget is `CASCADE_OUT_MS` plus
one `--dur-reveal`.

## The name

Latin in both languages, inside `dir="ltr"` on the heading itself.
