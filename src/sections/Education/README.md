# Education

Section 5. A **fanned card stack**: five cards — one per school, one per prize
— dealt through by the scroll or by the two carousel controls at the foot of
the screen. A card leaving pops off the top of the deck toward the upper
inline-start corner.

```
        ╭──────────────╮  ← the card that has just left, popping
        │ 2023 diploma │     up and to the top-left, growing, fading
        ╰──────────────╯
            ╭───────────────────────────╮
            │ ▒▒▒▒▒▒▒▒▒ ✎ ▒▒▒▒▒▒▒▒▒▒▒▒▒ │   ← the card on top: a picture
            │ EDUCATION                 │      with its glyph set into it
            │ Moscow State University   │
            │ Industrial and civil eng. │
            │ Structural thinking, dr…  │
            ╰───────────────────────────╯╲
              ╰───────────────────────────╲    ← the fan: turned about a
                ╰───────────────────────────╲     point below the deck
                  ╰──────────────────────────╲

              ‹   ▭ ▬▬ ▭ ▭ ▭   ›            ← the carousel
```

Nothing in it is a control except the two arrows. **A card is read, not
pressed.**

## The register change

This is the one section that changes VOICE. The face is an academic serif, set
lighter and larger than anything else on the page, with the degree line in the
only italic on the site; the cards are **paper** rather than glass — a warm
near-opaque fill, a fine line, and only enough blur behind it to stop the edge
looking cut out. A degree and a set of prizes are a different kind of document
from the rest of a CV, and the reader is told so before a word of it is read.

`.paper` sits beside `.glass` in `theme.css` for the same reason `.glass` is
there: it is a MATERIAL, and a material is a fill, a border and a shadow that
have to agree, which no utility expresses. Section 6 goes back to the
grotesque, because nothing here leaks — the face is set on this section's root
and inherited, and the paper is a class.

The light behind the page warms with it. `useStack` writes `--field-warm` on
the document and `BlobField` reads it out of its own filter, so the shift
happens **as the first card is dealt** rather than at a boundary — the canvas
is already warm by the time the second card is on top, and cool again the
moment the section leaves.

## The deck is one list of one card

`utils/cards.ts` builds the two schools and the three prizes into **one**
ordered deck of **one shape**. A `Card` is an id, a glyph, a kicker, a title,
an italic lead and a body — and a school and a prize are both exactly that.

They used to be two kinds with a face each: a school was a picture over three
lines hung from the top of the card, a prize was three lines centred under a
glass medal. The deck read as two decks shuffled together, which is the one
thing a stack of cards must not do — the cards a reader is being dealt were
plainly not one kind of thing.

So the mapping happens in `cards.ts` and nothing downstream asks which kind it
has, because there is no longer a question to ask. `StackCard` renders one
`CardFace`; `StudyFace`, `AwardFace` and the `kind` field are gone. The
**kicker** is all that is left saying which of the two a card is, and it says
it in words rather than in a layout.

A prize used to be a tile that opened a dialog to say what it was. A card has
room for the name, the result and the sentence, so there is nothing left for a
press to reveal — which is what makes the dialog unnecessary rather than
missing. `AwardDive`, `useAwardDive` and `utils/dive.ts` went with it.

## The fan, and the pop

`progress` becomes a place in the deck, 0 to 4, and every card's position is a
function of its distance from that place and of nothing else. Linear, for the
same reason section 3's timeline is: the deck moves exactly as far as the hand
moved it.

Three regimes, one input:

- **Behind** — turned by 4.5° per card of depth, dropped 10px, shrunk 5%, and
  faded out over about three and a half cards.
- **On top** — square, full size, unturned.
- **Gone** — lifted 64px up and 46px toward the inline start, turned 7° against
  the fan, grown 7%, and faded to nothing over one card of travel.

The two transforms **meet at identity**, so a card exactly on the reading
position is the same card read from either side and the fan and the pop are one
continuous movement rather than two animations swapped at a boundary. Reading
it backwards deals the cards back onto the pile along the identical path.

### Why the turn is enough to fan it

Every card is rotated about a point well **below** itself —
`origin-[50%_140%]`. A few degrees about a distant pivot swings the card
sideways by a good fraction of its own height, which is a hand of cards
spreading; the same few degrees about its own middle would be a pinwheel. So
the fan needs no sideways offset of its own, and the only horizontal numbers in
the file belong to the pop.

### Why the pop is a pop

It grows. A card that only slid away would read as going _under_ something; one
that gets very slightly larger on its way out reads as coming toward the
reader, off the top of the pile. That, and the turn against the fan, is the
whole of it.

### Direction

`rtl` is the one thing here that has to know how the page reads. There is no
logical form of `translate` or `rotate`, so which way the deck fans and which
corner a card leaves by is multiplied in rather than guessed at by a
stylesheet. Under Hebrew the deck fans the other way and cards pop off to the
top-right.

### The stacking order is fixed

`z-index: count - index`, computed from nothing but the card's place in the
deck. That is exactly right for a pile: the card being taken off lifts **over**
the one underneath it, and the fan descends away behind. Nothing has to be
re-sorted as the reading position moves.

## The carousel

Two buttons and the marks between them, pinned at the foot. They are the
section's only controls and the only part of it a keyboard or a screen reader
can act on.

They are **disabled at the two ends** rather than wrapping. A deck has a first
card and a last one, and a carousel that looped would take from the reader the
one thing the marks are there to tell them.

The chevron is the page's own, turned — and which way it turns is computed,
because `rotate` has no logical form either. Back points at the inline start in
both languages, and under Hebrew that is the right.

### The snap, and why it is not part of the gesture

When the hand has been still for 200ms and the deck is stopped between two
cards, it finishes or puts the card back, over 220ms. It waits for the hand
because a deck that dealt itself mid-gesture would be fighting the reader for
the scroll.

The transition exists only while the deck is **snapping**. A card moved by the
hand is 1:1 with it and must not lag; a card put on top by a press has no
gesture behind it to be 1:1 with, and eases rather than jumping. That is why a
carousel button sets the same flag the snap does.

### The gesture guard

The brief asks for the dominant axis to be read on touchstart so that a
sideways swipe stays the browser's own. That belongs in the **stage**, not
here: the stage is what reads the finger, and it already spends only the
vertical component. What it did not do was let a sideways gesture through, so
`useStage` measures both axes and leaves a dominantly horizontal one alone — it
neither moves the section nor calls `preventDefault`. Every pinned section gets
that, not only this one.

Nothing anywhere sets `touch-action: none`.

## The pictures

Each school card carries an abstract composition: five soft coloured blots in
the page's own hues, laid over each other and blurred. They are built from a
**seed** — the study's own id — so a card's picture is the same picture on
every render, in both languages and after every reload. A composition that
changed when the reader came back to it would be the one thing on the page that
cannot be remembered.

They are CSS gradients and not a canvas. Nothing here has to move, so nothing
has to be drawn per frame; a canvas would be a second rendering surface, a
second resize path, and a picture that is blank until an effect has run.

It is a **band** across the top of a card now, not the plate it was when a
school had a whole screen. The card is a fixed box and its words have to fit
under the picture: at the old 4:3 the sentence at the foot of the card was
clipped by the card's own edge.

### The bloom

Two copies of the composition, one sharp and one heavily blurred and saturated
under it. When a card reaches the top of the deck the pair blooms — the blurred
copy comes up to near full while the sharp one drops to a quarter and takes a
2px blur — and then returns.

Written as a state the picture settled INTO, hovering could not replay it:
there would be nothing left to replay from. Written as a one-shot that returns,
"plays once on arrival" and "replays under the pointer" are the same animation
asked for twice.

The replay is a `key` and not a class toggled off and on, because a browser is
free to fold a class removed and re-added in one frame into no change at all,
and a new identity is the one thing it cannot fold.

## The glyph in the picture

Every card has a picture, and every picture has one shape set into the middle
of it — `code` and `compass` for the two schools, `crown`, `brush` and `mask`
for the three prizes. They are one list in `content/types.ts` (`CardGlyph`) and
one file here (`ui/CardGlyph.tsx`), and nothing in the drawing says which group
a shape belongs to.

**The glyph is what a reader recognises.** The composition behind it cannot do
that job on its own: five soft fields of the same five hues are five of the
same picture at a glance, and they were never meant to be more — the colour is
a temperature, the way a plate in a book has one. The shape is the card's name
in a form you can see from across the fan.

It is **frosted rather than painted**: half-transparent white with a shadow
inside its lower edge and a light along its upper-left one, both from one SVG
filter. An offset copy of the glyph is cut OUT of the glyph, which leaves a
crescent inside the shape, and the crescent is flooded with colour. Offsetting
the cut upward puts the shadow along the bottom; offsetting it down and right
puts the light along the top and left. Every path is even-odd, so the mask's
eyes, the palette's thumb hole and the compass's pivot are holes in the glass
rather than paint on top of it.

The filter's id comes from `useId`. All five cards are in the document at once
— the deck is a way of reading them, not the place they are kept — so an id
written into the file would be the same id five times.

It sits **outside the bloom's two copies**, so the bloom happens behind it and
the one legible thing in the band stays legible throughout.

### What the medal took with it

A prize used to carry a glass medal at the head of its card: a rim, a drifting
iridescent interior, a band of refraction, a specular arc and two shadows. It
was the best-looking object in the section and it is gone, because a school's
card had nothing like it and the two had to be the same card. The glyph it
carried moved into the picture, where both kinds could have one.

Deleted with it: `ui/AwardMedal.tsx`, `tileIris` in `utils/art.ts`, the
`--rim`, `--rim-lit`, `--rim-band`, `--tile-drop` and `--tile-contact` tokens
in both themes, and the `irisDrift` and `irisSheen` keyframes. `--iris-3`
survives alone: a card's picture paints with the page's four tints plus that
lilac, because five blots of four hues is one hue repeated and a reader can
see that.

## Accessibility

Every card is in the document at all times, with a real heading and real text,
whichever layout is drawn. The deck is a way of reading the section and never
the place its content is kept.

Arrow keys deal a whole card, and here the horizontal pair is right as well as
the vertical one: the deck fans sideways, and `ArrowRight` means the card the
deck hands forward in either language because the fan is built with the page's
own direction. `Home` and `End` reach the two ends.

There is no dialog and no focus to trap, because there is nothing to open. Tab
reaches the two carousel buttons and nothing else — the cards are not controls,
so they are not tab stops pretending to be.

The marks between the buttons are `aria-hidden`. They say where the reader is
and nothing else, and a reader hearing five headings already knows.

## Reduced motion

There is no deck at all: the cards lay out as five sheets in an ordinary
scrolling column, none of them turned, offset or faded. A fan with nothing to
fan would be five cards piled on one spot. The carousel goes with it — the
stage gives up the section's depth, so the column scrolls itself and two
buttons that moved a reading position which no longer exists would do nothing.

The picture is rendered in the state the bloom would have reached instead of
playing it. The glyph in it never moved, so there is nothing to hold still.

The arrow keys are handed back as well. Swallowing a key to deal a card that is
not there would take the scroll away from the reader.

## What this section took with it

`features/education` is gone. The schools and the awards used to leave the
downloaded file with it, because the PDF was drawn from the page below the
stage; the download is now the CV file itself — see `features/pdf` — so they
are in it regardless of what this section does.

Two content changes came with the new shape. `Course { name, detail }` became
`Study { id, school, degree, body }` and the flat `achievements` list became
three `Award`s with a glyph and a result, because a card needs to know which
shape is set into it and needs something to put under the heading. The line
**"References available on request"** was in that list and is not an award; it
is the closing section's second line now.

`close` moved from `experience` to `ui` when a third section wanted the same
word — and this section is no longer one of the three, since it has nothing
left to close.
