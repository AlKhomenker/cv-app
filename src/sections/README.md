# sections

One folder per section of the page. `registry.ts` lists them in the order the
stage steps through them, and `glyphs.ts` beside it gives each one an icon —
for the places a section has to be named with no room for its name, which
today is the header's compact menu on a phone. The last of them is the **closing**, which ends the
page: a gesture past it moves nothing at all, because there is no section
after it and nothing under the stage to fall through to.

**The rewrite is finished.** For most of it the page had two halves — these
sections pinned to the `Stage`, and the ones not yet rewritten in an ordinary
scrolling document below it, moving up one at a time. The recommendations were
the last thing down there. With them here the document has nothing left in it,
so it is gone and `<main>` is the stage.

What went with it, in one commit: `features/` (except `pdf`, which is a
download and never was a section), `SectionId` and `SECTIONS`, `content.nav`,
`useScrollSpy`, `goToSection`, `common/ui/Section`, `common/ui/Reveal`,
`useReveal`, `revealObserver`, the `arrived` variant, the `.below` rules in
`theme.css` and the `data-reveal` print override in `base.css`. The language
turn moved rather than went: `.flip` is on the stage's own root now, because
the stage is what a reader sees turning over.

## One entrance, ten sections

Everything that arrives anywhere on this page grows out of its own centre and
fades in: a `scale` from 0.92 and an `opacity`, no translate, over
`--dur-reveal`. It is written once, in `common/utils/emerge.ts`, and reached
three ways —

- `common/ui/LineReveal` for a line of text, as keyframes, because a line has
  to play on the first frame it is drawn and a transition cannot promise that;
- `common/ui/Emerge` for a block a section brings in all at once;
- `emergeStyle(arrivalAt(…))` for a section that paces its own contents off the
  reading position — the skills' badges, the strengths' stars, the questions,
  the contact rows. Those cannot use a flag: there is no moment they arrive AT,
  there is a position they are a function of.

A section chooses WHEN its pieces arrive and never HOW. A reader who has learnt
how one section arrives has learnt how all ten do.

**They do not stack.** A section wraps its body in an `Emerge` and then puts a
`LineReveal` title inside it, and two identical curves on one set of words
multiply into a third, slower one — the heading arriving after the paragraph
under it. `Emerge` says so through `Emerging`, and the line under it draws
plainly and is carried by the block.

## One title

`common/ui/SectionTitle` is every heading on the page, above the stage and
below it: centred, in the page's serif, at one of three sizes, making the
entrance above. Two sections fill the screen with one thing — a timeline of
roles, a fanned deck — and take a `quiet` title, which is read and not seen.

Nine sections each writing their own `<h2>` is nine headings that agreed on a
Tuesday and had drifted into four alignments and five sizes by the end of the
rewrite. The same argument already made `common/ui/CallToAction` one file: the
pair of buttons a reader meets at the top of the page and the pair they meet at
the bottom cannot be two implementations.

## Moving one takes what belonged to it with it

And sometimes more.

- The **experience** took the tag highlight, which pressed a skill below and
  dimmed the roles that never used it. With the roles pinned above, a press
  would light something the reader cannot see, so the skills became labels —
  and then moved here themselves.
- The **education** took `Course` with it: two schools that were a name and a
  line became `Study`, and a flat list of achievements became three `Award`s
  with a glyph each.
- The **contacts** took the form. It was a section of the document and is now a
  dialog opened from two places, so it lives in `common/ui/ContactForm` where
  neither of them owns it.
- The **strengths** took the languages with them. Two stops with a rule between
  them made a reader scroll past a heading to reach three words, and three
  words have never been a screen; they are one section because they are one
  answer. `Stars` came up too, and lost the observer-driven stagger it had down
  there — up here there is a reading position instead.
- The **questions** took `useCollapseHold` out of `common/hooks` and deleted
  it. It held the scrolling page still around a question that was pressed; the
  stage is a fixed box and there is nothing to hold.
- The **recommendations** came up last and took the whole document with them —
  the list above. They also gave a `Recommendation` an `id`: the four names are
  placeholders and identical, so a card's key could not be one of them and must
  not be an array index.

One section did not move anywhere. The **about** is gone: four sentences that
restated the summary almost word for word, under a heading of their own, on a
page whose second section is the summary.

Three things came the other way, out of a section and into `common/` once a
second section wanted them: `usePanelGestures` with `focusTrap` and `swipe`
(three panels now fill the screen), `useMediaQuery` under `useReducedMotion`
and `useFinePointer`, and the word `close`.

The **closing** took the scroll's own ending with it. Until it landed, a
gesture past the last section released the stage and the document below
arrived; now it does not. That was a narrowing while there was still something
down there to reach, and it stopped being one the day there was not.

The teardown finished in a second pass. `released`, `release()` and the
`stop` flag are gone from `useStage`, `Stage`, `StageSlide` and
`StageSection`: with nothing under the stage none of them could do anything,
and the lock now goes on once and stays on. `StageDirection` went with them —
it was threaded from the stage down to every section and no section ever read
it.

What none of them took with them was the **PDF**, and for most of the rewrite
that was the open wound: the file was drawn from `#main`, therefore from the
page below only, so every section that moved up here left the downloaded CV
without it — the opening, the summary, the work history, the skills, the
schools and the awards, the strengths, the languages, the questions, and the
phone number, the email and the profile.

**That gap is closed, and not by rebuilding the printable page.** The download
hands over the CV as a FILE — `features/pdf`, `public/cv/` — so it no longer
matters what is on the stage and what is below it, which is just as well,
because there is no longer anything below it. A document that was written is a
better answer than a document that was traced. `@media print` still lays the
page out for a reader who prints the page itself.
