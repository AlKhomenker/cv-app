# Faq

Section 7. The questions people ask, each opening to its answer.

```
                 Questions people ask me
  ──────────────────────────────────────────────────
        What kind of role are you looking for?  ⌄
  ──────────────────────────────────────────────────
              What are you strongest at?  ⌃
        Client-side architecture in React and
        TypeScript, untangling legacy code, …
  ──────────────────────────────────────────────────
        Which areas or locations are you …  ⌄
```

## The pace is the point

**The first question is there with the title**, from the first frame, carried
by the section's own `Emerge` rather than by the scroll — a title over an empty
column reads as a section still loading rather than as one that has arrived. It
is off the schedule entirely, spacing included: what has to be spread over the
section is the questions that are left.

The rest arrive one after another over the first half — counted question `i` at
progress `0.05 + i × apart`, over `0.13` — and then **nothing moves at all**.

`apart` is counted from the length of the list, not fixed: the list is content
and it grows. Spacing the questions so the LAST one lands at `0.55` keeps the
section the same shape whatever the content does, where a fixed gap turned the
quiet half into a sixth the first time five questions were added.

That quiet is the section rather than slack in it. This is the one part of the
page that ANSWERS rather than presents, and a reader reading an answer must not
also be moving the section they are reading it in. The contacts ask for the
same shape for the same reason, one section later.

## Open is a choice, not a position

Exactly one answer stands open, and which one is real state: it is the reader's
decision, not the scroll's, so it survives scrolling back and forth over a
question that is already open. Pressing the open one closes it, so "none open"
is reachable too — a reader who has finished can put the answer away.

`useOneOpen` holds the INDEX and not a set of booleans, because "two open at
once" is a state this section does not have, and modelling it would be
modelling a state that can go wrong.

The old version of this, on the scrolling page below, also held the page still
around the question that was pressed: closing one above the finger slid the
answer out from under it. **There is nothing to hold here.** The stage is a
fixed box, the list does not scroll, and a question stays exactly where it was
drawn whatever the one above it is doing. `useCollapseHold` went with it — this
was its only caller.

## Buttons and regions, not `<details>`

`<details>` cannot be opened smoothly, and the open is the whole of what this
section does. The Radix accordion in `components/ui/accordion.tsx` does it
against a measured height, which is what replaced `common/ui/Collapse` and its
`0fr`-to-`1fr` grid rows.

One thing the swap cost: print. `Collapse` marked itself `data-open`, so
`base.css` could force every answer open on paper. Radix marks itself
`data-state` and hides a closed panel outright, so a printed PAGE now shows
only the answer that was open. The CV itself is a downloaded file and is
unaffected.

## Centred, including the chevron

The question sits centred with its chevron beside it rather than pushed out to
the inline end, so the row reads as one centred line like every title on this
page. Nothing in it is placed by side, so there is no rule here for Hebrew to
mirror — and the answer under it is centred too, inside 60 characters, because
a centred heading over a flush-left paragraph is two decisions and not one.
