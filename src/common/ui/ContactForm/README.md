# ContactForm

One form, opened from two places: the "Write to me" button on the opening
screen, and the button under the contact rows in section 6.

One implementation, one set of fields, one set of validation rules. A second
copy would be a second set of rules that can disagree with the first, and the
one that disagreed would be the one nobody ever opened.

It lives in `common/ui` rather than in either section because neither owns it,
and a section that reached into another section's folder for it would weld the
two together.

## Two shapes, chosen by capability

Never by viewport width — a phone held sideways is a wide screen with no cursor
on it.

- **A cursor** gets a centred dialog, 480px at most, rising 14px and scaling
  from 0.985 over 220ms, over a blurred and dimmed page. It is one thing among
  several on a large screen, and covering all of it would lose the reader their
  place.
- **A finger** gets a sheet that rises from the bottom edge over the same 220ms
  and fills the screen, with the submit **pinned above the safe area** and the
  fields scrolling behind it. A dialog floating in the middle of a phone is a
  dialog with a keyboard over half of it, and a submit that scrolled away with
  the fields is a submit nobody can find.

A downward swipe closes the sheet, the transform following the finger and
completing or snapping back on release. That, the Escape, the focus trap and
who owns the input while it is open all come from
`common/hooks/usePanelGestures` — the same hook section 3's role panel and
section 5's award dialog use. This is the third panel on this page to fill the
screen, and none of them implements any of it twice.

The submit is outside the `<form>` element in the sheet, because it is pinned
below a scrolling list. `form="contact-form"` is what keeps it that form's
submit.

## The fields

Five, and who is writing decides which of them are required. A recruiter is
asking somebody to call them back, so a message with no name, no company and no
number is a message that cannot be answered — all three are required. The
LinkedIn profile is the one optional box: it is the fastest way to see who is
asking, and nobody is made to paste it.

| Field      | Required | Rule                                   |
| ---------- | -------- | -------------------------------------- |
| `name`     | yes      | at least 2 characters                  |
| `company`  | yes      | at least 2 characters                  |
| `phone`    | yes      | `+`, digits, spaces, hyphens, brackets |
| `linkedin` | no       | a `linkedin.com/…` address, or empty   |
| `message`  | yes      | at least 10 characters                 |

Labels are **always drawn and are never the placeholder**. A placeholder
disappears the moment anybody types into it, which leaves a reader who looks
away mid-form with five boxes and no idea what any of them wanted.

A required label carries **`(*)`** and an optional one carries nothing — not
the word "optional", which `linkedin` used to spell out in both locales. One
mark on four labels is counted at a glance; the other way round every label has
to be read to find the one box that can be skipped. The mark is `aria-hidden`
and the fact is carried instead by `aria-required` on the box, so a screen
reader hears "required" in its own language at the field rather than "left
paren star right paren" four times. `required` on a `FormField` is what draws
it and nothing else — the rule that decides whether a value passes is the zod
schema below, and the two are not the same statement.

Each error is in the document whether or not there is one, and fades in over
140ms. A paragraph that appears pushes every field below it down the screen
while the reader is looking at the one above; one that was always there does
not. `aria-describedby` and `aria-invalid` are set together, and focus moves to
the first field that is wrong.

Validation runs **on submit, and on blur only after the first attempt**. Marking
a field wrong before the reader has finished the form is telling them off for
not having typed fast enough.

## The rules are one zod schema

`utils/validation.ts` holds `contactSchema`, and nothing else in the app decides
what a valid message is. It is a **function of the locale's error lines** rather
than a constant, the way the auth schemas in `apps/Weblace` are functions of
`t`: a rule and the sentence said when it is broken are one fact, and keeping
them in two files is how a field ends up marked wrong under a message about a
different field.

So a field does not carry a boolean and look its message up afterwards. What
the form holds is the message itself, and its presence IS the field being
wrong — `FormRow` takes one `error` prop and derives the rest.

Values are **trimmed before they are judged**, so a box holding three spaces is
an empty box. `linkedin` is checked with a refinement rather than a pattern,
because an empty optional field has nothing to be wrong about.

There is no `react-hook-form` here, unlike the auth screens — this form is four
short inputs and a textarea inside a panel that already owns focus and gestures,
and the resolver would be the larger half of it. Zod is used for the part that
is genuinely worth one description: the rules.

Boxes are 48px tall and set at 16px, which is the size below which iOS zooms the
page on focus.

## Sending

`FORM_ENDPOINT` in `config.ts` takes a Formspree, Web3Forms or EmailJS URL; the
recipient address is configured in that service and not here, because a service
that needs a private key does not belong in a page the browser downloads. While
it is empty the form falls back to a **prefilled mailto** built from the fields.

- **Sending**: the button says so and is disabled.
- **Sent**: the form cross-fades into a confirmation that names the email
  address as a backup.
- **Failed**: everything typed is kept, and the message says what happened and
  offers the mailto. No apology — an apology is not a next step.

Spam is dropped without a word: a honeypot field nobody can see, and anything
submitted within two seconds of the page opening. Both look exactly like
success, so a robot learns nothing from the answer.

## Scroll, focus, print

**The document is already pinned** — the stage locks it and spends the scroll
inside whichever section is on screen — so there is no body to fix and no offset
to put back. What has to be held still is the section underneath, and
`usePanelGestures` holds it by taking every gesture before the stage sees it.
The reader lands back exactly where they were.

`role="dialog"`, `aria-modal`, focus into the first field, trapped while open,
and returned to the button that opened it — which is what `useContactDialog`
is for: two sections open the same form and each has its own button to give
focus back to.

It is `data-print="hide"`. A sheet of paper cannot be typed into.
