# Experience

Section 3. Six roles hung off one line, travelled from today back to the
beginning of the history. The line runs down the middle of a wide screen with
the roles alternating either side of it, and down the inline-start edge of a
narrow one with all six in a single column.

```
                                       ← the rail fades out at this edge
    ┌───────────────────────────┐   ┆
    │  01.2025 —  ● Present     │   │
    │  Senior Full-Stack Eng…   │   ◉
    │  Wotch / Transperra       │   │
    │               [Show more] │   │
    └───────────────────────────┘   │
                                    ◉
                         ╺━━━━━━━━━━◉━━━━━━━━━━╸ ← the reading line, pulsing
                                    │
                                    ◉  ┌──────────────────────────┐
                                    │  │  06.2022 — 12.2022       │
                                    │  │  Frontend Engineer       │
                                    ┆  │  GoTech / Varonis        │
                                       └──────────────────────────┘
                                       ← and at this one
```

## A card says three things

The year, the job, the company, and the control that shows the rest. Nothing
else is drawn on it: no place, no description, no technologies.

That is a decision about the TRACK and not about the card. `--card-h` is not a
card's own height — it is the distance the track travels per role, because the
slot is built out of it. A card given room for a paragraph is a timeline with
one role on the screen at a time, which is a deck of cards with a line drawn
down it. At three lines the roles either side of the reading line are on the
screen too, and the shape of six years is something a reader can see rather
than something they have to remember.

The rest of the role is a press away, and until then it is in the document —
see below.

## One value drives all of it

`progress` — the reader's place inside the section, which the stage hands down
— becomes a **reading position** along the track: 0 is the first role on the
line, 1 the second, and the fractions between are the timeline travelling from
one to the next. Where the track sits, how present each card is, which node is
lit: all of it is a function of that one number and of nothing else.

That is the whole of the animation. There is no entrance state and no exit
state anywhere in it, which is why scrolling back up runs the identical states
backwards rather than playing a second animation that has to be kept in step
with the first.

The reading position is **linear** — the track moves exactly as far as the hand
moved it. A deck of cards holds a card still and then hands it on, because a
card is a thing being looked at; a timeline is a thing being travelled along,
and a dwell in the middle of it is a scroll that keeps catching.

Distance from the line is used **unsigned**, which is the other half of the
same idea. A deck has a front and a back, so a card leaving and a card arriving
are different shapes; a timeline is the same object seen from either end, and
the role above the line is drawn exactly like the role below it.

A card is **brought up out of nothing by the scroll**. There is no moment at
which it appears: its opacity is the same continuous function of the distance
at every point of the way in and the way out again, an eighth of it a whole
role away and the rest of it over the last stop of travel. It reaches nothing
exactly where it stops being painted, with no corner in between — a card is at
every distance in turn, and a kink in the curve would be a flinch the reader
can see.

**Its size says the same thing, on the same curve.** Small and faint a role
out, full size on the line, small again on the way out — and since the
distance is unsigned, a card leaves at exactly the size it arrived at.

| a role away | opacity | size |
| ----------- | ------- | ---- |
| 1.0         | 0.13    | 0.84 |
| 0.6         | 0.34    | 0.88 |
| 0.4         | 0.51    | 0.91 |
| 0.2         | 0.73    | 0.95 |
| 0.0         | 1.00    | 1.00 |

It used to shrink to 0.95, which is a card that does not change size: five
percent spread over two roles of travel, four of them spent at an opacity
nobody can see through. By the time the card was legible it had finished
growing.

The size rides the opacity's curve rather than one of its own, which is what
`common/utils/emerge.ts` does for every other arrival on this site: two curves
over one object are two arrivals, and the eye can tell them apart. A gentler
curve of its own was tried first and had the same fault as 0.95 — most of the
growth spent while the card was still a ghost.

`TRACK_DEPTH` is the pace: six roles over 4.4 screens of input, about seven
tenths of a screen of scroll per role.

## Arriving is travel, not a cut

The section does not grow into place. It comes from the end of the track the
reader is entering by, and leaves towards the end they are leaving by, so a
step between two sections continues the movement the scroll was already making.

The offset is taken from `progress` rather than from a direction, which is what
lets one expression cover all four cases. A section is always left from the end
it walks out of and entered at the end it walks in from — left at the bottom of
the track it goes up and out; entered at the top of it, it comes up from below.
The end the reader is at IS the direction, so nothing has to be remembered
between leaving and coming back.

## The track moves, the light does not

What slides is the **track**, in one piece — the rail, its nodes and all six
cards together. The reading line stays at the middle of the screen, and the
light that marks it is deliberately not part of the track: it is the place the
reader is reading, not a thing on the timeline. Each role's node travels into
it in turn.

**Nothing here eases.** The track's position is written straight from the
scroll, so it moves exactly as far as the hand moved it and stops exactly where
the hand stopped. An easing on it would spend a fifth of a second catching up
after every gesture, and a track still arriving after the reader has stopped
reads as being pulled onto the nearest role. The same goes for the card: its
size and its opacity follow the scroll directly, and the only thing on it with
a duration is the hover lift, which is answering a pointer rather than the
scroll.

Nothing on the rail reacts to the reading position either. A node that lit as
the reader arrived at it would light in one frame, half way between two roles,
and a mark that arrives at full strength in one frame reads as the scroll being
caught and held. Where the reader is is said once, by the light at the reading
line, which is always exactly there.

Every length is a custom property declared once at the top of `Timeline.tsx`,
because three things have to agree about them: `--rail-x` sets where the cards
stop, and `--slot` sets both how tall a card may be and how far the track moves
per role. Written out in three places they would agree until somebody changed
one of them.

## The section arrives, the timeline does not

Two cues, as everywhere on this stage, and they are not the same one.

- **`active`** is the SECTION: the whole timeline grows into place and collapses
  back out of it. That is the stage's cross-fade, and it is what `--reveal-out`
  is waiting for.
- **`progress`** is the TIMELINE: how far along the track the reader has come.

They are written on two different wrappers, one property each. On one element
they would be two rules over one opacity, and which of them won would be down
to the order Tailwind happened to emit them in.

## Sides

Roles alternate sides of the rail — even to the inline start, odd to the
inline end — and only from `lg` up. Below that the rail moves to the inline-start
edge and every card is in one column: a card narrow enough to share a phone with
a second column is a card nothing fits in, and a timeline whose entries swap
sides every screen is a reader whose eye has to start again at each one.

The alternation is why the arrow keys are vertical only even on the wide
layout. A horizontal pair would name the wrong side every second press.

## The company is a link, once the role is open

Every role carries `companyUrl` — the company's own page on LinkedIn — and the
opened role draws the company name as a link to it. `target="_blank"` with
`rel="noopener noreferrer"`, because it leaves the site, and an `aria-label`
built from `experience.companyLink` in the reader's own language, because
"Wotch / Transperra, link" does not say where it goes.

The name is drawn in the page's accent, on a hairline of its own — the accent
at 45% under the word, not the hair colour the rest of the card's rules are
drawn in. It is the one proper noun in the block that is not the person's own
and the thing a reader scanning six roles is looking for, so it is the one word
in a soft-grey sentence that is not soft grey. That much is true on a card too:
the colour is what says "company", and a name that changed colour on opening
would read as a different name.

The HOVER is the link's alone, because the card has nothing to hover — the
hairline fills in to the full accent and the name takes a wash of its own
colour, over `--dur-fast`. Nothing moves and nothing grows: the page has one
entrance and a name that jumped under the pointer would be a second. The wash
sits in a box half a step wider than the word in both directions, always, so
painting it shifts nothing on the line.

A card does not. A card is ONE control: the button that opens the role covers
all of it, so a link drawn under that button is a link nobody can reach, and a
second target inside a card whose every pixel already does something is a
target that can only be hit by accident. The link appears where the role is
open — on the panel and in the reduced-motion list — which is also where there
is room to notice it.

The URL sits in the content beside the words it belongs to, in both locales,
like a recommendation's `url` and a contact's `href`. A role is read in one
place and not assembled out of two. Two roles share one page: Lomda and
Pillstate were both Elpisor.

## Why every role is in the document

All six are a real `<ol>` with a heading, dates and every word of the
description, whichever few of them happen to be painted. The track is a picture
of the history and never the place it is kept — so a screen reader, a search
engine and a reader with styles off all get the whole thing in order.

The trim on a card is therefore a **class and not a shorter string**. It used
to be a clip: the card drew the description in whatever room it had left and
masked the rest. Now it draws none of it, and the same words sit in the card as
`sr-only` — the same decision with the clip at nought. A reader who cannot see
the card still has every word, and the place, and the whole technology list.

The height is fixed and identical for all six. It has to be, because the slot
the track moves by is built out of it.

Cards further than two stops from the line are not PAINTED — no backdrop
filter, no opacity worth compositing — but they are still in the list. "Not
rendered" means nothing is drawn for them, not that the history has a hole in
it.

## The roving tab stop

Every card carries the control that opens it, and only the focused one is in
the tab order. That is what makes an arrow key work twice: moving the track
carries focus to the role that has just reached the line, so the second press
arrives there rather than on a card the reader can no longer see.

The key is swallowed, which is how the stage knows not to ALSO act on it — it
skips a keystroke something nearer the reader has already answered.

The control is a sheet over the whole card rather than a word in the corner,
because what a reader taps is the card. The word in the corner is inside it,
and is what the tap looks like.

## Opening a role

The panel is drawn at full size from its first frame and **clipped** to the
rectangle of the card that was touched; the clip opens to the screen's edges
while its corners ease out flat. So the card becomes the screen rather than
being replaced by one, and closing runs the identical clip backwards into the
same rectangle.

The clip is what moves rather than a width and a height, because a panel that
grew by being laid out at six sizes would re-wrap its text six times on the
way and the reader would watch the words rearrange themselves. Here the text is
laid out once, at the size it ends at.

Inside it the role sits in the **middle of the screen**. A role is three short
lines and a list, not a document, and a page of text set against the top edge
of a screen it does not fill reads as a page that has been cut off. `min-h-full`
on the column fills the padding box exactly, so `justify-center` has free space
to divide while the role is short and none once it is long enough to scroll —
one rule, both cases. The panel's padding is symmetrical for the same reason:
an asymmetrical one would centre the role somewhere just below the middle.

The control that opens it says **"Show more"**, because that is what a press
does now that the card holds three lines rather than a trimmed paragraph.

A swipe closes it too, and leaves the other way: a finger that carried the
panel down finishes the movement it was making, rather than shrinking into a
card the hand is no longer on. The two exits are the two gestures, not two
animations for one.

### Pressing the page around the role closes it

There is no backdrop to press beside this panel — it covers the screen. What
stands in for one is the space **around the words**: the margins either side of
the column and the room above and below it. A press that starts and ends there
closes the role, as a press beside a dialog would.

That space is two boxes and nothing else — the scroller and the sheet centred
inside it — so nothing has to be marked as text: whatever else the press lands
on, the role drew it.

It is a **press**, not a click, because three different gestures end in the
same place and a click cannot tell them apart:

| the gesture                     | what a click would do  |
| ------------------------------- | ---------------------- |
| a swipe down that closed it     | close it a second time |
| a swipe down the reader gave up | close it anyway        |
| a drag across the words         | close it mid-selection |

All three move, so all three are told apart by how far the pointer travelled
between press and release — 6px. A selection can be made without moving much
at all, so that is checked as well.

The contact form is the other panel on the same gesture hook and deliberately
does **not** get this: throwing away what somebody has typed because they
pressed next to a field is a bug, not a convenience.

### What "scroll is locked" means here

The brief asks for the scroll position to be stored, the body fixed and the
offset restored on close. **The document is already pinned** — the stage locks
it and spends the scroll on how far along the track the reader is instead — so
there is no body to fix and no offset to put back. What has to be held still is
the TRACK, and the panel holds it by taking every gesture before the stage sees
them: one listener on the window, in the CAPTURE phase, which is what puts it
ahead of the stage's own listeners on that same window. A gesture aimed inside
the panel is let through so the text can scroll; everything else is swallowed.

The reader therefore lands back on exactly the card they opened, at exactly the
point along the timeline they left it, which is what the instruction was for.

### The bar goes with the timeline

A role that fills the screen carries its own close control in the corner the
header keeps its toggles in. Two controls in one corner is a reader pressing
the wrong one, so `theme.css` takes the header out while `data-panel="open"` is
on the document — the same mechanism the stage's own lock uses. Focus does not
follow it out of sight: the panel traps focus, which is the half of this a
stylesheet cannot do.

## The rail

**One** line, one node per role, and nothing else on it.

It runs well past both ends of the history and is **faded out at the screen's
edges**, so neither end of it is ever on the screen. It used to begin at the
first node and end at the last, on the reasoning that a history has a
beginning — and that was the wrong thing to say with a line. An end that is on
the screen is an end the reader watches travel to the top of it, and a rail
being scrolled has stopped being the axis the reading happens on. Where the
history begins is said by the first year, on the first card, in a number; the
line is what that number is written against.

The nodes fade with it, because a dot still lit where the line has already gone
is a mark with nothing to be a mark on.

### Why the rail is its own layer

The fade is a `mask-image`, and a mask makes a **backdrop root**. Put anywhere
above the cards it would cut their glass off from the light behind the page —
the backdrop-filter would sample the masked group instead of the canvas, and
six glass cards would turn into six flat ones. So the rail travels with the
track without being part of it: one more element carrying the same
`trackStyle`, with nothing underneath it that asks for a backdrop.

It is the same reason the two wrappers around the timeline keep their opacity
at exactly 1 whenever a card is drawn.

Two earlier drafts put more on it and both were wrong. A second strand beside
the rail — drawn for the two jobs at one employer — reads as a second timeline,
not as a note about the first. Lighting one role faintly when its neighbour is
read makes it a sub-entry of that neighbour rather than the job it was. Each
card stands on the line by itself; the employer is written on the card, in
words, where it can actually be read.

Nothing on it lights up as the reader passes, for the reason given above: the
reading line already says where the reader is, and it never has to guess.

It is `aria-hidden`. Every date it marks is written on the card it belongs to,
and a reader who cannot see it has lost nothing.

### Why the years are on the cards

An earlier draft drew 2017 to today down the edge as a proper scale, with each
role a segment positioned by its real dates. A track cannot do that and stay a
track: two roles that began in the same year would want the same place on it,
and six cards of a fixed height need six stops of a fixed height. So the
spacing is one stop per role, and the year is where it is already being read —
large, first line of the card, next to the line it belongs to.

### The span carries months, the big number does not

`01.2025 — 12.2022`, and the large accent number stays the year alone. Three of
the six roles begin and end inside one year, and a span that said "2022 — 2022"
was saying nothing about a job held from June to December; the large number is
a place on the history rather than a date, and a month in it at 3.2rem would
crowd the line it heads.

A date is written as **numbers**, `MM.YYYY`. Month names were the other option
and they are not free: twelve per locale, and a Hebrew month name placed inside
the `dir="ltr"` run this string is drawn in comes out with its letters in the
wrong order. Numbers read the same in both directions, which is the reason
these labels were built out of numbers in the first place.

The dates themselves come from the CV in `public/cv`, which is where the months
were already written down.

## Direction

The track itself has no side, so there is nothing in it for Hebrew to mirror.
Everything that does have one is logical: `--rail-x` is read through
`inset-inline-start`, the cards are inset with `ps-*`/`pe-*`, and the close
control is at `end-*`. The Latin values — the year,
the span, the company, every technology name — are each in their own
`dir="ltr"`, and the span is built out of the numbers rather than
translated, which is what keeps a Hebrew word from being dragged inside it.

The word for a role still running is the exception and is deliberately OUTSIDE
that span, in the reader's own language, beside the light that says the same
thing.

## Reduced motion

The timeline is replaced, not switched off. Its whole meaning is that it moves;
standing still it is one card with five off the screen, which is worse than a
list and not better. So the reader gets a plain column with every role open and
no rail, and the stage gives up the depth it would have spent — see
`Stage/utils/travel.ts` — so the column scrolls itself instead.

## What this section took with it

The page below the stage no longer has an Experience of its own. That used to
mean the work history was missing from the downloaded file, because the PDF was
drawn from that page; it does not any more. The download is the CV file itself
— see `features/pdf` — so what is on the stage and what is below it no longer
decides what a reader downloads.
