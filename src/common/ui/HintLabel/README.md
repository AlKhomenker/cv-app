# HintLabel

The name of a control that has only a glyph, written beside it while the
pointer is on it or the focus is in it.

It exists because the header's compact menu is ten icons in a column and
nothing else: without a label, the only way to find out what one is is to
press it.

## It says nothing to a screen reader

The bubble is `aria-hidden`. The control inside it carries its own
`aria-label` — that is what a screen reader reads, and it is the same words.
An unhidden bubble would have every glyph announced twice.

So the rule for a caller is: **label the control, not just the bubble.** The
two take the same string.

## Hover and focus, and nothing else

No timer, no state, no portal — hover and focus are CSS states and the bubble
follows them with `group-hover` and `group-focus-within`. Weblace's
`HintTooltip` is the Radix arrangement instead, because it labels a point on a
canvas that cannot be hovered on its own; nothing here needs that.

**On a touch screen there is no hover**, so the bubble is for a pointer and for
the keyboard. It is not the only way to read the menu: the glyphs are in the
order the page is read in, and the control's `aria-label` carries the name for
anyone who cannot see the bubble.

## It is drawn on the page, not on glass

`bg-page` with a hairline, not the `.glass` recipe. A bubble usually stands
next to something that is itself glass, and a backdrop filter inside another
one samples a backdrop that has already been filtered — which comes out as a
smear rather than as a pane.

## Placement

`side="top"` centres the bubble above the control; `side="end"` puts it after
it along the reading direction, which is the right in English and the left in
Hebrew. The first is centred with physical properties (`left-1/2` and a
half-width shift back), because a centre is the same centre in both
directions; the second is `start-full` and a logical margin, because a side is
not.
