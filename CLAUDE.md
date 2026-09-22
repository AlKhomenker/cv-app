# cv-app — working rules

## Comments in `.tsx`

A `.tsx` file carries **one short comment above the component** — a line or
three saying what it is, and a pointer to the folder's `README.md`. Nothing
else.

- **No per-prop doc comments.** The interface names the props; a type and a
  good name already say what a `/** */` over each one repeats.
- **No inline essays in the markup.** A class or an attribute that needs a
  paragraph to justify it needs that paragraph in the README, not between two
  JSX attributes.
- **No history, no rationale, no alternatives weighed, no "why not X".** That
  is what the README is for, and it is where a reader goes looking for it.

The full explanation lives in the sibling `README.md` — one per section, one
per shell part, one per shared component that has earned one. If the component
being written has no README beside it, write the explanation into the nearest
one that covers it, or start a new one.

**When a component changes, its README changes in the same edit.** A `.tsx`
comment that has grown past a few lines is a README entry that ended up in the
wrong file.

## `.ts` is not covered by this

A hook or a util IS the explanation, and keeps its prose —
`shell/Stage/hooks/useStage.ts`, `common/utils/emerge.ts`,
`sections/*/utils/*.ts`. The rule above is about components: markup is read
for its shape, and a paragraph between two attributes hides that shape.
