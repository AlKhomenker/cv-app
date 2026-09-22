# Loader

What is on screen before the page is. It covers everything, including the
canvas, so the opening makes its entrance out of a blank page rather than out
of a half-drawn one.

## What it actually waits for

Two honest milestones: `document.fonts.ready` and `load`. Nothing else is
known, so nothing else is claimed.

The bar eases toward 92% and waits there. Real progress cannot be measured —
there is no total to divide by — so the bar says the only true thing it can:
something is still coming. When both milestones land, and `MIN_MS` has passed,
it closes the remaining 8%. The minimum is there because a loader that flashes
for 80ms is worse than no loader.

## Why the bar is not state

`useLoadProgress` writes `--progress` straight onto the rail. It runs every
frame, and a `setState` per frame would re-render the whole page sixty times a
second while it is trying to load — the one moment that cost is least
affordable. One piece of state is left, `done`, and it changes once.

The bar grows by `inline-size`, not by a transform, so it fills from the
leading edge in both reading directions without a rule that names a side.

## The handover

`usePageReady` holds two flags, because the loader leaving and the opening
arriving must not happen over the top of each other:

- `onLoaded` starts the loader's fade (`--dur`).
- `ready` follows `--reveal-start` later. It gates `active` on every stage
  section and `shown` on the header, and it is what unmounts this component —
  so the fade has finished before the element goes.

## Reduced motion

No easing and no bar filling: it is empty until the page has arrived, then
full, then gone.
