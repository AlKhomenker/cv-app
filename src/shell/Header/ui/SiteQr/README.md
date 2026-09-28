# SiteQr

A toggle in the header, first of the three at the inline end. A press opens a
small panel under it with a QR code for this page and the short address beneath
it. It is for the moment a reader has the CV open on a laptop and wants it on
their phone, or wants to hand it to someone across a table.

## What the code carries

`SITE_URL` in `src/config.ts` — the GitHub Pages address from
`.github/workflows/deploy.yml`. It is written out rather than read from
`location`, so the code shown on `localhost` or a preview build still sends the
phone to the published page. If the site moves, that constant is the one line to
change.

The code itself is `common/ui/QrCode`, the same encoder the LinkedIn row in
Contacts uses.

## A press, not a hover

The LinkedIn QR appears on hover because it is a side note on a row. This one is
the whole point of its control, and a phone has no hover, so it opens on a press
and shuts on the same press, on Escape, or on a press anywhere else — the three
ways out `MenuCapsule` gives the menu. `hooks/useSiteQr.ts` holds that. Escape
hands focus back to the toggle, because the panel is about to be `inert`.

## How it sits

The panel is `absolute` under the toggle and aligned to its inline end, so it
grows toward the middle of the screen in both directions of reading and never
off the edge. It fades on `--dur-fast`, like the hint bubbles; shut it is
`opacity-0` and `inert`, so it is neither seen nor reachable.

It is drawn on `bg-page` with a hairline and `--glass-drop`, not on `glass`: a
QR code needs a flat, high-contrast field behind it, and a backdrop blur over
the moving light is neither.

The toggle carries `aria-expanded` and `aria-controls`, and its name comes from
`siteQr.open` in the locale files. The code is announced by `siteQr.code`.

The header is `data-print="hide"`, so none of this reaches paper.
