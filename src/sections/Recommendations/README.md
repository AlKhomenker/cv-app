# Recommendations

Section 8. Four people who will vouch for the work, each card a link to their
profile.

```
                   People who recommend me
             Ask them directly — each card links to LinkedIn.

   ╭──────────────────────────╮  ╭──────────────────────────╮
   │ (NS)  Name Surname       │  │ (NS)  Name Surname       │
   │       Engineering Mgr    │  │       Senior Frontend    │
   │       Worked on Transp…  │  │       Reviewed code      │
   │       View on LinkedIn   │  │       View on LinkedIn   │
   ╰──────────────────────────╯  ╰──────────────────────────╯
   ╭──────────────────────────╮  ╭──────────────────────────╮
   │ (NS)  Name Surname       │  │ (NS)  Name Surname       │
   ╰──────────────────────────╯  ╰──────────────────────────╯
```

## Why it moved last, and why it belongs here

It was the last thing living in the scrolling document under the stage, and
the reason it went last is the reason it belongs up here: it is the one
section that asks the reader to **leave**. A page that hands over a link from
a half-remembered column at the bottom is not handing it over at all.

It sits where it sat in the old document order — after what the person is like
to work with, before the questions about them — which is also the order the
argument runs in: here is the work, here is what it is like to work with me,
here are people who will say so, here is what you are probably about to ask.

## The pace

**The first card is there with the title**, from the first frame, carried by
the section's own `Emerge` rather than by the scroll — a title over an empty
column reads as a section still loading rather than as one that has arrived.
Sections 4 and 6 already did this; sections 7, 8 and 9 do it now too.

The counting therefore starts at the second card: counted card `i` arrives at
progress `0.06 + i × 0.09` and completes within `0.16` of it, so all four are
in by 0.40. Then **nothing moves at all**.

That is the same shape the questions and the contacts have, for the same
reason: a reader deciding whether to open somebody's profile must not be
moving the section while they decide. All three are sections that hand
something over rather than present something.

The entrance itself is the page's one entrance — out of the centre, over
`--dur-reveal` — through `common/utils/emerge.ts`, like every other section.

## The whole card is the link

Not the four words at the foot of it. On a phone this is a thumb reaching for
a name, and a short link inside a card is a smaller target than the card it is
inside for no reason anyone could name. `target="_blank"` with
`rel="noopener noreferrer"`, because it leaves the site.

The card lifts under the pointer by **scale**, and the entrance it is
answering is also a scale — so the two are on the same property and cannot
both own it. The lift is on the `<a>` and the entrance on the `<li>` around
it: two elements, one property each, and a card that is still settling into
place can still be pointed at.

## Start-aligned, in a centred page

The text beside the disc reads from the inline start although every title on
this page is centred. A row with a disc at one end is already a reading
direction, and centring three lines beside it would set two directions against
each other inside one card. The section's own title and its line above them
are centred like every other.

The initials are `aria-hidden`: the name is written beside them, and two
letters read out before every person would be four pieces of noise.

## The names are placeholders

Four `Name Surname` cards with one LinkedIn root between them — the real names
and URLs go in `content/*.ts`. That is also why a `Recommendation` carries an
`id`: the names are not unique yet and a React key cannot be an array index.
