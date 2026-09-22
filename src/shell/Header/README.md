# Header

The bar across the top: the section names at one end, language and theme at the
other.

The bar has **no surface of its own** — no fill, no border, no shadow. The
names sit directly on the moving light. The only glass in it is the two
toggles, which are controls and need an edge to read as pressable.

It slides down from above the top edge once, on load, over `--dur-slow`.
`useAfterPaint` holds it up for exactly one paint; set in the same render, the
browser folds the two states together and draws the bar already in place.

Both ends are placed with logical properties, so they swap when the page turns
Hebrew. No component is told which direction it is in.

## Below `md` the names become one control

A phone cannot carry ten section names across the top, so under 768px the bar
draws `MenuCapsule` at that end instead: one round glyph that stretches into a
column of the sections, each naming itself in a bubble beside its icon. The
row of names and the menu are two components and **only one of them is ever
rendered** — `useNarrowScreen` chooses. Showing one and hiding the other with
a `md:` utility would leave the hidden one holding its open state and its tab
stops.

The row of names used to carry its own horizontal scroll at 360px. That was
the old answer to the same problem, and it is gone: a strip of words that has
to be swiped sideways to be read is not a menu.

## The names come and go with the opening

`shown` is the stage's own state, so the names rise into place on load and blur
away the moment the opening does — the same gesture in both places. They arrive
together rather than one after the other: the row is horizontal, and a stagger
along it is a sweep across the screen, which is the reading the sections were
deliberately taken off.

They are also the only way around the page, so `useHeaderLabels` writes them
back whenever the pointer is over the bar or the focus is inside it. On a touch
screen there is no hover — and no names either, since a touch screen is a
narrow one and gets the menu instead, which is always there to be pressed.

## The links are strings, not section ids

The header takes a flat list of `HeaderLink` and one `onPick`. It does not know
which links are stage sections and which are still in the old document — that
is `useShell`'s problem, and it is the reason the ids here are plain strings.

A link carries its `icon` for the same reason it carries its `label`: the menu
needs a glyph per section, and the header looking one up by id would be the
header knowing which ids exist. The mapping lives in `sections/glyphs.ts`,
beside the list of sections itself.
