# Closing

Section 7. Two lines, the point that has travelled the whole site, and the two
controls the opening offered. It is the quietest screen on the page and the
only one that ends.

```
                    ·                ← the dot, still and lit

            Thank you for your time

         References available on request


         [ Write to me ]  [ Download CV ]   ← +15% over the last third
```

## The dispersal is painted by the background, not by this section

The dot holds still and bright through the **first third**, then breaks into
forty-eight particles that spread outward, slow as they go, grow, lose
definition, and stop being drawn. By the end the screen is the screen the site
opened on.

That only works because the particles are painted on the **background canvas
itself** — `shell/BlobField/utils/burst.ts`, with the store they arrive through
in `dispersal.ts` beside it. They come out of the same palette, at the same
alpha, with the same soft rim and under the same blur as the five blobs that
are already there, so the last thing that happens to a particle is that it
becomes indistinguishable from what it is lying on top of. A second canvas over
the top would be a second surface to keep in step with the first, and its
compositing would not match.

What this section hands over is two numbers and a fraction: where its dot is in
fractions of the **screen**, and how far it has come apart. The canvas is
overscanned and drawn at a third of the viewport's resolution; converting
between the two is `paint.ts`'s business and not a section's, which is why
`OVERSCAN` lives there and `BlobField.tsx` reads its own scale from it.

The rect is measured once per layout and never per wheel event — a
`getBoundingClientRect` is a forced reflow, and the dot does not move while the
reader scrolls. Only the particles leaving it do.

### One value, read both ways

`spread` is a function of the reading position and of nothing else. There is no
velocity integrated anywhere and no particle holds any state, so scrolling back
up gathers the blobs into the dot along the identical path — not a reversal of
the dispersal, the same arithmetic read backwards.

Nothing in the particle table is random, for the reason the blobs are written
down: a dispersal that looked different on every visit would be the one thing
this ending claims not to be, which is the page arriving back where it opened.

## The light comes back on

Every section since the summary asks the stage for `calm`. This one asks for
nothing, so the field eases back to the opening's own amplitude, its own drift
speed and its full lean toward the pointer — and it starts easing as section 6
collapses, which is where a change of light belongs.

The reader ends the page moving the same field they moved on the first screen.
Nothing says so.

## The end of the scroll

Nothing declares it. The stage never releases the scroll and there is no
section after this one, so a gesture past the final state of the dispersal
moves nothing — and takes no cooldown with it either, so turning back is
available on the very next one. A `stop` flag in `registry.ts` used to say so
out loud, back when the alternative was falling through to a scrolling
document; there is no document and so nothing to declare.

`overscroll-behavior-y: none` on the document, in `theme.css`, is the other
half. Without it the stop is a rubber-band: the page pulls down an inch and
springs back, which reads as something that tried to continue and failed rather
than as something that had finished.

**Nothing loops back to the top, and nothing returns on its own.**

### What this costs, until the rewrite is finished

The scroll no longer reaches the document below. `about`, `strengths`,
`languages`, `recommendations` and `faq` are still down there and are now
reachable **only through the header**, which already releases the stage and
jumps once the release has landed — see `useShell`. That is a real narrowing
and it is deliberate: when `features/` goes, there will be nothing down there
to reach and this paragraph goes with it.

## The way out

The brief asked for a pair of icons pinned in the corner since section 1, grown
by 15% here. There is no such pair: the corner carries the language and theme
toggles, the header's own names are the menu, and "write to me" and "download
CV" have always been buttons inside sections 1 and 6. So they are buttons here
too — the **same** two, doing the same job at the end of the page that they do
at the beginning of it.

They are also the opening's own COMPONENT — `common/ui/CallToAction`, rendered
here with two props. Not a copy of its markup, and not two buttons that happen
to agree with it today.

They used to be a copy, and the copy had drifted: a still `GradientRing` inside
each button and an accent label on the download, neither of which section 1
has. Both are gone with the copy. A ring is an edge and a beam is a control
answering a press — a distinction the components already draw — and a button
wearing the ring as well was answering with the wrong half, then swapping
halves under the hand.

What the end of the page still does is on the ROW, not on the buttons: over the
last third of the reading position it grows by 15%, which is the `style` this
section passes. That is a size, and a size leaves the buttons untouched.

Tab from the closing text reaches them, so a keyboard reader is never trapped
at the end of the page.

## Direction

Both lines are centred and so are the controls, so the layout is symmetrical
and there is no rule here for Hebrew to mirror. The only thing that moves with
the language is the header, which mirrors for every section.

## Reduced motion

There is no depth, so `progress` never leaves nought and none of the above is
driven by anything. The section answers with a different behaviour rather than
a slower one:

- **no particle is ever emitted.** The store is never written, so the field
  draws its five blobs and nothing else.
- **the dot cross-fades out** on arrival, over `--dur-slow`, and that is the
  whole of it — it is a full stop rather than a thing that came apart.
- **the controls are at their full size and accent from the first frame.** They
  do not grow into being the most active thing on screen; they simply are.

The two lines are real text in the document in both cases. The canvas is
`aria-hidden` and the dot is decoration.
