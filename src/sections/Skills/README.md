# Skills

Section 4. Forty-two tools as five rows of badges, one row per topic, each
badge arriving on its own as the reader scrolls, and one combobox over them
that picks which of the tools are lit.

```
  Skills

  [ Filter skills                        (3)  ✕  ⌄ ]

  ● Frontend
    (RE) React  (TY) TypeScript  (NE) Next.js  (RE) React Hooks
    (RE) React Router  (ZU) Zustand  (TA) TanStack Query …

  ● Backend and APIs
    (NE) .NET  (C) C#  (NO) Node.js  (RE) REST  (GR) GraphQL …

  ● Cloud and data
    (AZ) Azure  (AW) AWS  (DO) Docker  (CI) CI/CD …
```

## What it was, and why none of it is here

It was a colony: forty-two badges spreading out of a point into five drifting
clouds, pushed apart every frame so that none of them ever overlapped, carried
by the cursor, with a legend down the side naming the five colours. That was
one `requestAnimationFrame` loop, a separation pass over 861 pairs, a lattice
per cloud, a ring-or-bands layout, a pointer model with three different
reaches, and a category picker — about six hundred lines to say what five
headings say.

All of it is gone, and with it the reason for most of the parts:

- **The loop**, and the two util files behind it (`colony.ts`, `swarm.ts`).
  Nothing is simulated, so there is nothing to simulate per frame.
- **Drag and drop.** A badge is a fact about a CV. Moving one around the screen
  never told the reader anything the row it sits in does not, and it cost a
  pointer-capture model, a slip threshold to stop a drag also counting as a
  click, and a rule about what a finger may not do because the same gesture is
  the scroll.
- **The legend**, and the pick-and-dim behaviour under it. Naming a cloud of
  colour from the edge of the screen is only a problem while the names are kept
  somewhere other than above the badges. They are now the headings.
- **The badge as a button.** With nothing left to choose, a press had nothing
  to say — and a thing that looks pressable and does nothing is worse than a
  thing that plainly is not. The choosing came back later as ONE control over
  the rows rather than forty-two inside them; see below.

## The one control: a combobox, not forty-two buttons

`ui/SkillPicker.tsx`, under the title. It names any number of tools at once,
and the section answers by lighting exactly those:

- **Nothing chosen lights everything.** That is not an empty state — it is the
  section as it was before the field existed. A CV does not hide its own skills
  because nobody has asked a question yet.
- **A choice dims what it did not name.** Grey and in place: `grayscale(1)` and
  a `filter: opacity()`, which MULTIPLIES with the arrival opacity the scroll
  writes inline instead of fighting it for the same property. A row's heading
  goes with it once nothing under it is lit, so an unasked-for topic reads as
  one quiet block rather than a live name over grey.
- **Nothing is removed and nothing reflows.** A reader looking for four tools
  also learns which forty-two were on the list, and a list that rearranged
  itself under the eye would move the badge being read out from under it.

It is a field with a list rather than five topic buttons because the question a
reader brings here is "do they know X", where X is a name they already have in
their head. Typing three letters of it is the shortest way from the question to
the answer. The topic buttons would only answer the question the five headings
already answer.

### The keyboard, and why nothing in the list is a tab stop

The WAI-ARIA combobox pattern, kept whole: focus stays in the field, which
carries `role="combobox"`, `aria-expanded` and `aria-activedescendant`; the
arrows move a cursor through the open list, wrapping at both ends; `Enter`
lights what the cursor is on; `Escape` shuts the list, and a second `Escape`
empties the field. The list is a `listbox` with `aria-multiselectable`, its
five groups are `group`s with the topic's own name, and each row is an
`option` that says whether it is selected.

No row in it is focusable. Forty-two tab stops between the field and the rest
of the page is a keyboard reader trapped in a filter, and the pattern above
already gives them every row without one.

### The field, the count and the chevron

- **The box is the control, so the box shows the focus.** The `input` inside
  draws nothing — a ring on it would sit inside the border and read as a second
  one — and the wrapper asks for `focus-ring` on `focus-within`. See
  `focus-ring` in `styles/tailwind.css`.
- **A press opens the list; the focus does not.** Focus comes back to the field
  after every choice and after the chevron, and a list that reopened on focus
  would be one the chevron could never shut. A keyboard opens it with the
  arrows instead.
- **The count is a `role="status"`.** The choice is made in a list that is
  covering the badges it changes, so the number is the only thing that can
  report what just happened — as a number to look at, and as a sentence to be
  read out.
- **The chevron is decoration with a hit area.** `tabIndex={-1}` and
  `aria-hidden`: it only saves a reader who has not guessed that pressing the
  field opens the list, and it is out of the tab order for that reason rather
  than hidden — a pointer still needs somewhere to press.

### It has to keep its own wheel

`shell/Stage/hooks/useStage.ts` listens on the WINDOW and spends every wheel
and every finger on the section — it only asks `utils/scrollers.ts` under
reduced motion. An open list therefore has to stop those events at itself, or
scrolling it would scroll the badges behind it instead. `hooks/useSkillPicker.ts`
registers the listeners natively for that: React's own are passive, and the
panel still has to be free to scroll itself.

The list is absolutely positioned for the same kind of reason. The rows are
sized to fit a pinned screen; a panel that pushed them down would take the last
of them off the bottom of it.

### What the choice outlives

Leaving the section shuts the list — a menu standing open over the next screen
belongs to a screen that is no longer there — and leaves the CHOICE alone. A
reader who lit four tools, walked forward to the roles and came back has not
changed their mind about the four.

## One by one, as one function of the scroll

The **first row is not in the stagger at all**. Its heading and every badge
under it are in place at progress 0, so they arrive with the section's title,
on the section's own entrance — a title over an empty column reads as a screen
still loading rather than as one that has arrived.

Everything under that row is counted from the first badge that is left: badge
`i` (numbered from there) starts at progress `0.04 + i × 0.0125` and completes
within `0.1` of it. A row's heading is the same function two badge-steps ahead
of its first badge, so the name is readable before anything lands under it.

That is a function of the reading position and of nothing else, which is the
whole of what "one by one" needs:

- a badge that has arrived **stays**, because at any greater progress the value
  is still 1 — nothing accumulates, so nothing can get out of step with the
  scroll;
- scrolling back up **takes them off in reverse order** for free, because a
  later badge's window closes before an earlier one's does.

Verified over the whole range: every badge's arrival is monotonic in progress,
and at no reading position is a later badge ever further on than an earlier
one. The first counted badge is in by 0.14, the last by about 0.57, and the
rest of the section is five finished rows with nothing moving.

A badge arrives by the page's one entrance and not by one of its own: it grows
out of its own centre from 0.92 and fades in, written as inline `opacity` and
`scale` by `common/utils/emerge.ts`. Two properties the compositor already
owns, and no transition on either: the scroll is the clock, so a duration here
would only be a second one disagreeing with it.

## The order runs across the rows, not down one

The numbering is flat and continuous over all forty-two, so the section fills
topic by topic in the content's own order: the whole of Frontend, then the
whole of Backend, and so on. That order is also the document order, the tab
order and the order a screen reader reads — the rows ARE the list, paced
differently, and not a picture of one kept somewhere else.

## Two screens, and why not three

The colony asked for three: one to spread out of a point, one and a half to
play in, and the rest to fold back. There is nothing to play with now, so the
section asks for two — the badges are all in by two thirds of the way through
and the last third is the reader looking at the finished rows.

## Colour, without a legend

Five hues, in `theme.css`, keyed by `data-topic` on the row. Four of them ARE
the page's own four — the lit-edge family, chosen to stay legible over the
pastels the canvas paints, which is exactly the job here. The fifth is a
violet, because the background has no violet in it and a fifth topic must not
read as a second helping of one of the four.

`data-topic` is set **once per row**. The heading's dot and every badge under
it inherit `--hue`, `--wash` and `--line` from it, so no component in this
folder knows which of the five colours it is being drawn in. A badge is not
painted in its hue at full strength either: `--wash` tints the surface and
`--line` draws the edge. The monogram is the only thing filled solid, and it is
`aria-hidden` — it says nothing the name beside it does not, and two letters
read out before every tool would be forty-two pieces of noise.

## When it does not fit, the rows travel

Every size in here is written to fit a pinned screen — the type, the gaps, the
badge padding and the monogram are all `clamp(…, min(Xvw, Yvh), …)`, so they
answer a narrow screen and a short one at the same time. On a phone held
upright that is still not enough: at 375×667 the five rows come to 623px in
482px of room, and the last topic was **140px below the bottom edge with no
way to reach it**, because the stage keeps every wheel and every finger for
itself and a pane inside it that scrolls is a pane nobody can drive.

So the rows pan. The layout is three flex items in a column:

- the **title** and the **field** keep their height — `shrink-0` on both, or
  the flex box would take the overflow out of the heading's line;
- the **rows** sit in a box with `min-h-0` and `overflow-hidden`, which is what
  lets that box shrink to the space left. Without `min-h-0` a flex item refuses
  to go below its content, which is exactly how the overflow ended up at the
  foot of the section in the first place;
- inside that box the rows are one block carrying a `translate`, pulled up by
  `hidden × panAt(progress)` — see below.

`justify-center-safe` on the column is what makes both cases one layout: the
three blocks are centred on a screen with room for them, and packed from the
top on one without, rather than hung half off it.

### How much, and when

`hooks/useRowsFit.ts` measures rather than declaring: `offsetHeight` of the
rows against `clientHeight` of the box, under a `ResizeObserver` on both. A
breakpoint would answer for the window and be wrong about the other two things
that decide this — the length of the words in whichever language is on, and
how many tools the CV lists — and wrong in the direction that hides content.

It reads `offsetHeight`, **not** `getBoundingClientRect`. The section is drawn
inside a `common/ui/Emerge`, which is a scale, and a rect under a scale reports
the drawn size rather than the laid-out one: 8% small for most of the entrance,
and a different number on every frame of it.

`panAt` in `utils/arrival.ts` ramps the travel to 1 by progress `0.62`, just
past the last badge's own arrival. Earlier and a row would be carried up before
the badges in it had appeared; later and the reader would be scrolling a
finished picture to reach the end of it. On a screen with room for all five
rows, `hidden` is 0 and nothing moves at all.

## Under reduced motion, none of that happens

The stage gives such a section no scroll of its own, every badge is in place
from the first frame, and the rows become an ordinary column that scrolls
itself — `motion-reduce:block`, `motion-reduce:overflow-y-auto`, and a tab stop
so a keyboard can reach it. The pan is held at 0 and the box stops clipping
(`motion-reduce:overflow-visible`), because a real scroller and a pan would be
two answers to one gesture. `utils/scrollers.ts` is what lets that column take
the gesture back.

## Direction

Everything here is logical and mirrors for free: the padding is `px-(--gutter)`,
the rows wrap from the inline start, and the heading's dot sits before its label
in both languages. The tool NAMES are the exception and carry `dir="ltr"`, as
they do everywhere on this page — they are Latin in every locale.

## What this section took with it

`content.skills.hintDrag` and `hintTouch` are gone from `types.ts` and from both
locale files. They were one line of guidance each, chosen by what the reader was
pointing with, and both of them described dragging.

The colour tokens were renamed with the idea: `--swarm-1…5` are `--topic-1…5`
and `[data-swarm="…"]` is `[data-topic="…"]`. The values did not change.

The list borrows those same tokens rather than owning any colour: a group in it
carries `data-topic`, so a tool is drawn in the list in the hue its badge is
drawn in below, and this folder still knows nothing about which of the five it
is using.

`features/skills` went when the colony landed, and with it the tag list on the
page below the stage. The skills used to go missing from the downloaded file
with it, because the PDF was drawn from that page; the download is now the CV
file itself — see `features/pdf` — and the skills are in it.
