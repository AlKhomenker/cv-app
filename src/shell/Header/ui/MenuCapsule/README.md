# MenuCapsule

The whole menu as one round control, for a screen too narrow to write ten
section names across.

It is the shape Weblace's settings control wears, brought over to this page's
own material: a glyph button that, pressed, makes **its own frame taller** and
reveals the sections inside it, each naming itself in a bubble beside the
glyph.

It is not a dropdown. Nothing new is painted at any point — the border, the
fill and the blur belong to the same piece of glass from the first frame to
the last, and the glyphs inside wear no chrome of their own (`GLYPH_CLASS`,
not `TOGGLE_CLASS`). The capsule is `absolute` inside a fixed 34px slot, so
however tall it gets the bar does not reflow and the two toggles at the other
end never move.

## The trigger stays

Weblace's capsule cross-fades its closed face out and is then dismissed by a
press somewhere else. This one keeps the trigger as the **first row** of the
open capsule, turning from a menu glyph into a close.

Two reasons. On a touch screen a control that can only be shut by pressing
"somewhere else" is a control with no visible way back. And `aria-expanded`
belongs on an element that is still there to be announced — on the face that
has faded out it is a claim about nothing.

## Nothing is clipped

The frame has **no `overflow: hidden`**, which is why the entries fade in
rather than being wiped into view by the growing frame. A clip that held the
column would clip the labels beside it too, and the labels are the whole point
of a column of glyphs.

What keeps the entries out of sight while the capsule is shut is `inert` plus
`opacity-0`: not drawn, not focusable, not clickable. They arrive one after
another as the frame passes them — the one place on this page a stagger is
right, since the column is vertical and reads as a frame filling rather than
as a sweep across the screen. The delay is dropped on the way out, or the last
glyph would still be fading after the frame that held it had shut.

## The rows give up height rather than scroll

Ten sections plus the trigger is 355px. A phone held sideways is not that
tall, and the two usual answers are both wrong here: a scroller clips (see
above), and a menu that runs off the bottom of the screen hides the sections a
reader is most likely to be looking for.

So `fitRow` measures the space between the shut capsule and the bottom of the
screen and shrinks the entry rows until the column fits, down to 26px, which
still takes a finger. On any ordinary phone held upright nothing shrinks at
all. The trigger keeps its 34px in every case: it is one of the bar's toggles
and has to match the two beside it.

The row size is measured when the menu OPENS, and again on resize while it is
open. Shut, it is one round button and the answer would be thrown away.

## The labels are not the accessible name

Each entry carries its own `aria-label`, and the bubble is `aria-hidden` — see
`common/ui/HintLabel`. A finger never sees a bubble, so the glyphs are in the
order the page is read in and the section they lead to is announced whether
the label is visible or not.

## What it is handed

A flat list of `HeaderLink` and one `onPick`, exactly as `HeaderNav` is. The
glyph travels with the link (`link.icon`) rather than being looked up here:
the header does not know which sections exist, and `sections/glyphs.ts` is
where that mapping belongs.
