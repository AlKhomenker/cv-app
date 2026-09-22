# BlobField

The light behind the glass. A full-screen canvas under everything else, taking
no input and carrying no meaning — `aria-hidden`, and the page reads the same
with it switched off.

## What it draws

Five blobs, each with its own radius, resting position, drift speed, phase,
depth and colour. A blob's outline is its radius multiplied by a sum of sines
of the angle, each with a time term. The periods do not divide into one
another, so the shape never visibly repeats.

The numbers are **written down, not generated**. A random field would make one
visit look unlike the next, and would give a reader on reduced motion a
different still frame every load.

## Why it is drawn small

The backing store is a third of the viewport and CSS stretches it back up.
Upscaling is most of the softness; a `blur()` in the stylesheet finishes it.
That puts the expensive part — blurring a full-screen surface every frame — on
the compositor instead of in the 2D context. The canvas is also overscanned by
20%, so the blur's own soft edge falls outside the viewport rather than
crossing it as a visible border.

## The pointer

Only where there is a real pointer (`hover: hover` and `pointer: fine`). The
stored position eases 11% of the way to the real one each frame, and each blob
takes a share of that vector by its `depth`. Nothing snaps: by the time a blob
has arrived, the pointer has usually moved on. On touch there is no listener at
all — the pulse is the whole effect.

## Calm

A section with text on it asks the stage for quiet, and the stage asks the
field: a third of the pulse, a third of the speed, and a much weaker lean. It
is enough that the light is still alive behind the glass and not enough to
pull an eye off four sentences.

The field eases toward it rather than switching, which is what puts the change
in the right place — it starts settling while the section before collapses,
instead of dropping to a different speed at the boundary.

Speed is why the field keeps its **own clock**, integrated a frame at a time
instead of read off the wall clock. Every sine has a time term in it, so a
rate applied to elapsed time moves every phase at once and the whole picture
jumps the moment somebody asks for quiet. Adding `elapsed × rate` per frame
changes how fast the clock runs and never where it is.

## The closing section's dispersal

The last section's dot comes apart on THIS canvas, not on one of its own —
`utils/burst.ts` for the particles and the curves they follow,
`utils/dispersal.ts` for the one value the section writes and this loop reads.

They are painted after the blobs, out of the same mixed palette, at the same
alpha and with the same soft rim, and they fade to nothing as they reach a
blob's size. So a particle's last act is to become indistinguishable from what
it is lying on top of, and the screen the page ends on is the screen it opened
on. A second canvas over the top would be a second surface to keep in step with
this one, and its compositing would not match.

The section gives its dot's place in fractions of the SCREEN, which is not
where it is here: the surface is overscanned by `OVERSCAN` and drawn at a third
of the viewport's resolution. `utils/paint.ts` converts, and `BlobField.tsx`
reads its own scale from the same constant so the two cannot drift.

It is read per frame rather than passed in as a prop. The value changes on
every wheel event, and this canvas sits under the header, the stage and the
whole page below both.

## Theme

A theme change starts a cross-fade over `--dur`, not a swap. It fades from
**what is on screen** — `mixPalette` snapshots the part-way palette first — so
toggling twice quickly cannot jump.

## Reduced motion

The field is not consulted, and this paragraph is the only place that says so.
It used to hold one still frame at `time = 0`; it does not any more — the light
behind the glass is the page's weather rather than something happening to the
reader, and a page whose background had stopped read as a page that had
crashed.

What respects the setting is what MOVES ON it. The closing section's dispersal
is the case to copy: under reduced motion it never writes the store at all, so
the blobs carry on and not one particle is drawn. A section decides that for
itself; the field draws what it is given.
