# LineReveal

A line of text making the page's one entrance: out of its own centre and back
into it, as one thing.

It is the line-of-text form of `common/utils/emerge.ts` — the same scale from
0.92, the same `--dur-reveal`, the same easing that `common/ui/Emerge` uses for
a block and `emergeStyle` writes inline for a scroll-paced one. **No
translate**: it used to rise half an em, and the rule the page settled on is a
scale about the centre and nothing else.

`shown` drives both directions. There is **no delay and no stagger**: every
line on a section arrives together.

## Inside an `Emerge` it does nothing

`common/ui/Emerge` runs the same curve over the same duration on a whole
block, and a section wraps its body in one and then puts a `LineReveal` title
inside it. Both played, so the line's real opacity was the PRODUCT of two
identical curves — 9% where the badges around it were 31%, 54% where they were
73%. The heading read as arriving after the content it names.

The outer one wins. `Emerge` publishes `Emerging` from
`common/utils/emerge.ts`, and a `LineReveal` under it draws its words plainly
and lets the block carry them. A line with no `Emerge` over it — the opening,
the summary, the closing, the bar across the top — is untouched and still
plays its own.

It is a context and not a prop because the two are rarely adjacent: the
section wraps its body, and `common/ui/SectionTitle` reaches for a
`LineReveal` several files away without either of them knowing about the
other.

## Why there is no stagger

Three attempts, each failing differently, and the browser settled it:

1. **`transition-delay`** — a transition only runs if the browser has already
   drawn the value it moves FROM. Lines with a delay had no observed start
   state and appeared at their end value.
2. **A JavaScript timer** — same result, because the problem was never _when_
   the flag flipped.
3. **`animation-delay`** with `fill-mode: both` — correct, and measured
   working: delays of 0/260/520/780/1040ms with a clean opacity ramp on each.

Each mechanism was one more thing standing between the flag and the fade.
Removing the stagger removes the whole class of failure, and a section arriving
at once is what was asked for.

## An animation, not a transition

`animation-fill-mode: both` makes the start value explicit, so a line that has
only just been drawn still plays rather than appearing finished. A transition
needs the browser to have observed the start value, which is not something a
component can guarantee about its own first frame.

## Three states, not two

`data-state` is `"in"`, `"out"`, or absent. Absent is a line that has never
been shown: it cannot be `"out"`, because that animation's first keyframe is
the visible one, so playing it would flash the line into view in order to fade
it back out.

## This line ignores `prefers-reduced-motion`

By instruction, and it is now the only part of the page that does: the
entrance plays the same for every reader, and no operating-system setting
changes it.

That is a deliberate accessibility trade. The preference exists for people who
get motion sickness from moving interfaces; the growth is 8% over 720ms, which
is small, but it is movement. If it ever needs to come back, the narrow version
is the honest one: keep the opacity fade for everyone and drop only the `scale`
under the query, since the fade is not what causes the harm.

**What does read the query**, since section 3 asked for it: the stage gives up
a section's `depth` (`Stage/utils/travel.ts`) and hands the gesture to a real
scroller instead (`Stage/utils/scrollers.ts`); the summary lays its blocks out
as an ordinary column; and the experience replaces its timeline with a plain list
of open roles. Those are LAYOUTS rather than durations — each one is a
different thing to read, not the same thing moving less.
