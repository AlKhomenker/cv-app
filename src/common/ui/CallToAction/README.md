# CallToAction

The two things the page exists to ask for — **write to me** and **download
CV** — as one row, with the contact form they open.

Sections 1 and 7 both end on it. They end on this file, not on two copies of it
that happen to agree.

## Why it is a component and not markup in each section

The pair was written twice, and the two copies drifted. By the time anyone
compared them the closing's buttons had grown a still `GradientRing` inside
each one and an accent label on the download, so the pair a reader met at the
bottom of the page was not the pair they met at the top — which is the one
thing this pair has to be. A promise of sameness that depends on somebody
remembering to edit two files is not a promise.

Everything that decides what the pair IS lives here: the buttons, the labels,
the dialog, and the form it opens. The download is `features/pdf`'s
`DownloadCv` — a link to the CV file rather than a button that draws one — and
this file's job there is to place it, not to decide what it does.

## What a section may say

Two props, and they are exactly what the two callers differ by:

|           | `className`                               | `style`            |
| --------- | ----------------------------------------- | ------------------ |
| Section 1 | `mt-[clamp(18px,3.5vh,36px)]`             | —                  |
| Section 7 | `mt-[clamp(36px,9vh,96px)] origin-center` | the exit's `scale` |

Where the row sits, and how big it is. A section does not get to say what a
button looks like — that is `BeamButton`'s, and there is one look; see its
README.

`shown` is the section's own `active`, passed straight to `LineReveal`, so the
pair rises and leaves with the lines above it.

## A fragment, not a wrapper

The row and the form are returned as siblings, because both were direct
children of a `grid` section before this component existed and the sections'
`[&>*]` rules still name them. A wrapping `<div>` here would become the grid
item instead, and the form — which is fixed to the viewport — would be
answering to a layout it has nothing to do with.

## The form is per caller

`useContactDialog` is called here, so each of the two sections holds its own.
That is deliberate and not a leak: the dialog's job is to give focus back to
the button that opened it, and there are two such buttons on the page. The
`ContactForm` itself is one implementation and knows nothing about who opened
it — see `common/ui/ContactForm`.
