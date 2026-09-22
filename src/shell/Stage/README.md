# Stage

The pinned viewport the rewritten sections are drawn in.

## The scroll contract

While the stage holds the input, **the document cannot move**. The lock is
`data-stage="locked"` on `<html>`, which `styles/theme.css` turns into
`overflow: hidden`. A wheel, a swipe or an arrow key therefore changes which
section is drawn, or how far through one the reader is, and never where the
page is — which is what makes the page look motionless while its content
changes.

Every section is absolutely positioned in the same box. Only the active one is
opaque, so a step is a cross-fade in place. Two sections are never side by
side, so there is no edge between them to see.

**The page has two ends and the stage never lets go.** A gesture past either
end moves nothing at all: the stage keeps the scroll and the section holds at
its final state. It takes no cooldown either, so turning back is available on
the very next gesture rather than most of a second later.

It used to release past the last section — fade out, unlock, and hand the
scroll to a document underneath — and a `stop` flag on the closing was what
suppressed that. Both went when the last section moved onto the stage: there
is nothing under it to release TO, so the ending is a fact about the array
rather than a flag on a section. Only the
SCROLL ends: the header still releases the stage for a link into the document
below, and an upward gesture at the top of that still comes back.

## A section that takes the scroll

A section in `registry.ts` may declare a **`depth`**, in viewport heights.
Without one it is a step: one gesture, one section. With one the gesture moves
a value INSIDE it instead, and only a gesture made at either end of that value
steps out. `progress`, 0 to 1, is that value, and it is the whole of such a
section's animation — read forwards going down and backwards coming up, so
there is no entrance and exit to get out of step with each other.

Depth is written in screens rather than pixels because what it sets is a
reading pace, and a reading pace is a fraction of a screen. A gesture that
runs past either end stops there rather than stepping, so one flick can finish
the strip or leave the section but never both.

`progress` is **not React state**. It changes on every wheel event, and the
stage sits above the header, the canvas and the whole document below it; a
state write per event would re-render all of that while somebody reads four
sentences. `utils/progress.ts` is a subscription and each SLIDE is a
subscriber, so what re-renders is the one section that asked for the scroll.

There is one value **per section**, which is the day the file said it would
grow an index arriving. The summary and the experience are neighbours and both
take the scroll: with a single value, a step would write the section being
stepped into and drag the one still fading out along with it — the summary
snapping back to its first sentence, or the timeline jumping to its last role,
while it is still on screen. Keyed, a section keeps the place it was left at
for as long as it is drawn.

## A section that moves the reader itself

`seek` is the other half of `progress`: the same value, written rather than
read. A gesture is the stage's business and a section never touches one, but a
jump to a NAMED place inside a section is something only that section knows how
to ask for — an arrow key on a timeline of six roles means "the next role", not "a
hundred and twenty pixels". It goes through the same two values a gesture does,
so nothing that draws can tell a seek from a scroll, and it does nothing at all
for a section that declared no depth.

A section may also declare **`calm`**, which is not about the scroll at all:
it is how quiet the background should be while the section is on screen. The
field eases there rather than switching, so the change lands while the section
before it is collapsing.

## Which way the finger was going

A finger is read for its **dominant axis**, once, in the first eight pixels of
the gesture. Vertical is the stage's — it moves the reader through the page the
way the wheel does. Sideways is the browser's, and the stage does not touch it:
nothing is prevented and nothing moves, so a back-swipe stays a back-swipe.

It lives here rather than in a section because the finger is the stage's to
read, and because the first section whose own content travels sideways (the
education) would otherwise have had to choose between answering the swipe and
letting the browser answer it. Nothing anywhere sets `touch-action: none`.

The axis is decided from where the finger STARTED and never revisited. A swipe
that wandered would otherwise change hands halfway through and leave the page
half moved.

## Panes that take their own scroll

The stage calls `preventDefault()` on every wheel and every touch, which would
also swallow a gesture meant for something scrollable inside a section. Under
reduced motion a section is allowed to lay its text out as an ordinary column,
and `utils/scrollers.ts` hands the gesture to that column until it reaches its
end — at which point there is nothing left to absorb and the stage steps as
usual.

It is consulted only under reduced motion, because that is the only layout
that puts a real scroller on the stage. A `getComputedStyle` per ancestor per
wheel event is not a cost to pay on a page that has no scroller in it.

`depth` goes with it: under reduced motion a section has no span at all,
whatever it asked for. A depth paces an ANIMATION, and four screens of scroll
spent on a picture that is not changing is four screens spent on nothing — so
the stage steps section by section and the column inside each one scrolls
itself.

## Why the listeners re-register on every step

`useStage`'s input effect depends on `index`, so each step tears the listeners
down and puts them back. That is deliberate: the alternative is
mirroring the index into a ref so a stale closure can read it, which is two
sources of truth for one number. Adding five listeners is cheaper than that
bug.

The one thing that IS a ref is `travelled`, the pixels scrolled inside the
current section — and for the opposite reason. It changes per event, so as
state it would re-register the listeners mid-swipe and lose the finger's
anchor. It has a single writer, and `progress` is its single published form.

`passive` is `false` on wheel and touch, and always was for a locked stage: it
has to call `preventDefault()` on both. It used to follow `released`, because a
released stage must not.

## During the rewrite

`sections/registry.ts` lists what is on the stage. Everything not yet rewritten
is in the old scrolling document below, and arrives when the stage lets go. The
last section to move up here takes `SectionId` and `features/`
with it.
