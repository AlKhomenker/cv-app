# Contacts

Section 6. Four rows and one button.

```
  Let's talk

  Phone                          (058) 442-2701   [☎]
  ────────────────────────────────────────────────────
  Email                         alinahom@me.com   [✉]
  ────────────────────────────────────────────────────
  LinkedIn                          My LinkedIn   [in]  ← a QR appears above
  ────────────────────────────────────────────────────     this row on hover
  Location                       Hadera, Israel   [⌖]

                   [ Write to me ]
```

## The quiet

The register comes back — the grotesque after section 5's academic serif, glass
after its paper, and the light behind the page loses the warmth section 5 put
into it as that section's last panel leaves.

So does the pace. This is the one section that asks the reader for something
rather than for their attention, and **once the rows have arrived nothing moves
at all**. The whole of its motion is four rows making the page's one entrance —
out of their own centre, `common/utils/emerge.ts` — one after another, and then
stopping.

## The stagger, as one function

Row `i` starts at progress `0.06 + i × 0.1` and completes within `0.18` of it.
That is a function of the reading position and of nothing else, which is the
whole of what the behaviour asked for:

- a row that has arrived **stays**, because at any greater progress the value is
  still 1 — nothing accumulates, so nothing can get out of step with the scroll;
- scrolling back up **retracts them in reverse order** for free, because row 3's
  window closes before row 2's does.

Verified over the whole range: every row's arrival is monotonic in progress, and
at no reading position is a later row ever further on than an earlier one. All
four are in by progress 0.44, and the rest of the section is still.

**The first row is there with the title**, from the first frame, carried by the
section's own `Emerge` rather than by the scroll — a title over an empty column
reads as a section still loading rather than as one that has arrived. It is off
the schedule entirely, and the counting starts at the row underneath, which is
why the four rows now finish at 0.44 where they used to finish at 0.54. The
button follows the last of them, as it always did.

## What a press does, and what decides it

**Capability, never viewport width.** A phone held sideways is a wide screen
with no cursor on it.

|          | a finger                       | a cursor                            |
| -------- | ------------------------------ | ----------------------------------- |
| Phone    | opens the dialler              | copies, and the row says so         |
| Email    | opens the mail app             | copies, and the row says so         |
| LinkedIn | opens the profile in a new tab | copies the address, and offers a QR |
| Location | nothing; it is not a control   | nothing                             |

A finger goes where the row goes, because that is the only useful thing a phone
can do with an address. A cursor copies, because a desktop mail client opening
over the page is rarely what was wanted — and the row confirms it **in place**:
the value cross-fades to one word for 1.4 seconds and back. No toast, nothing to
dismiss, and the answer is where the reader is already looking.

Copying is the better default and not the only thing allowed, so a cursor also
gets a small call control, a small mail control and a small profile control on
the row. Those are real `tel:`, `mailto:` and `https:` links, which is also how
"the four contacts are real links in the document at all times" stays true on a
desktop.

The location is not a control in either case. It answers a question and has
nowhere to go, and a row that looks pressable and does nothing is worse than a
row that plainly is not.

Copy failure is **silent**. A reader who pressed a phone number and got a dialog
about a permissions model has been handed a problem instead of a number; the row
simply does not change, and the number is still written on it.

## The glyph at the end of every row

The LinkedIn row reads **"My LinkedIn"**, not the fifty characters of the URL
behind it. A profile address is not something anybody reads off a screen — it
is something they follow or take away — and once the row says what it is in
words, the glyph beside it is what says _whose_ page it goes to. A cursor still
copies the **address**, never the words, because the words are not a thing that
can be pasted anywhere.

Every row now ends in a glyph, so the four values sit in one column and each
row names itself without being read. Only under a cursor is that glyph a
control; under a finger the row is already one link, and a second smaller link
inside it is a worse target in the middle of a better one, so the glyph is
drawn there and left inert.

The location's pin is inert in both cases, and drawn in the quiet ink with no
border around it — the one glyph in the column that has to look like a label
rather than a button, because its row goes nowhere.

The glyphs are drawn in `common/ui/Icon`, in the one 20x20 box and the one
stroke weight as everything else on the page. The LinkedIn mark is drawn rather
than taken from the brand sheet: a solid logo would be the only filled shape in
the set.

## The QR code

Drawn here, from nothing. `utils/qr.ts` is a byte-mode encoder at
error-correction level L, versions 1 to 6 — up to 134 bytes, which is every URL
this page will ever hold, and six is the last version that carries no
version-information block.

It is not a package because a package is the wrong trade for one code of one
URL: this file is smaller than the smallest QR library's bundle, has no
dependency to keep current, and draws as a few dozen SVG rectangles — one per
RUN of dark modules, not one per module — in `currentColor`, so it follows the
theme with nothing to redraw.

All eight masks are laid out and scored by the standard's four penalty rules,
and the best is kept. The mask is not cosmetic: it is what stops the data
drawing something a scanner would mistake for a finder pattern, and picking one
without scoring is how a code that works on one phone fails on another.

**What was checked**, because a QR code that is subtly wrong looks exactly like
one that is right:

- the generator polynomials for 7, 10 and 15 check codewords match the ones
  published in the standard, coefficient for coefficient;
- all eight format-bit strings for level L match the published table;
- the finder patterns, the timing rows, the separators and the always-dark
  module are where they belong;
- and the finished matrix decodes back to the exact URL, in byte mode, at every
  version from 1 to 6 — including each version's exact byte capacity, and a
  UTF-8 string that is not Latin.

That last check is now made by a reader written **against the standard rather
than against this file**, and it is the whole reason the list above is worth
anything. The read-back it replaced shared this file's own idea of where the
modules go, so it agreed with the encoder about two things the standard
disagreed with, and reported a clean decode both times:

- **the first copy of the format bits was written backwards.** A scanner reads
  that copy first, finds its BCH check fails, and falls back to the second one
  — so the code read, and the copy meant to be the fallback was the only one
  that worked.
- **the module walk stepped onto the timing column instead of over it.** The
  pairs of columns must run 5-4, 3-2, 1-0 once past column 6; shifting only the
  pair that meets it and then carrying on from 6 visits one column twice, never
  visits column 0, and turns the wrong way for everything to the left. The data
  codewords are long placed by then, so only the tail of the error correction
  landed wrong — five of fifteen check bytes on the profile URL. The code still
  read, by being CORRECTED, which spends the budget that is supposed to survive
  a thumbprint on the screen.

Both are fixed. What the two have in common is worth keeping in mind for
anything else hand-rolled from a spec: they were invisible to every test that
was written from the same understanding as the code.

It renders on hover of the LinkedIn row, or on keyboard focus anywhere within
it — the row is a copy control and a profile link now rather than one link, so
what reveals the code is focus _inside_ the row rather than on it — and is
never on screen otherwise. It is for a recruiter who wants to take the profile away with them;
the rest of the time it is noise.

## The form

One form, opened from two places — the button on the opening screen and the
button under these rows — with one set of fields and one set of rules. It lives
in `common/ui/ContactForm`, which has its own README. What differs between the
two places is nothing at all; what differs between a cursor and a finger is only
the shape it arrives in.

## Accessibility and reduced motion

The four contacts are real links, in order, whatever the scroll is doing. Under
reduced motion the reading position is simply taken as finished: the rows are in
place from the first frame with no stagger, which is what the section is once it
has arrived anyway.

## What this section took with it

`features/contact` and `features/contacts` are both gone — the first became the
shared form, the second became this. The phone number, the email, the profile
and the town used to go missing from the downloaded file with them, because the
PDF was drawn from the page below the stage; the download is now the CV file
itself — see `features/pdf` — and the contact details, which are the part of a
CV that most needs to survive being printed, are in it.
