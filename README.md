# cv-app

A one-page CV: React 19, TypeScript, Vite 7, Tailwind 4. No router, no backend,
no environment variables — the built `dist/` is a folder of static files.

Live at <https://alkhomenker.github.io/cv-app/>.

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:3005
pnpm build      # tsc --noEmit && vite build -> dist/
pnpm preview    # serve the built dist/
```

`pnpm build` fails if `public/cv/Alina-Khomenker-CV.pdf` is missing. That is
deliberate: the download hands over the file itself, and without it a static
host answers with `index.html`, which the browser then saves under a `.pdf`
name that no viewer will open.

## Replacing the CV

Put the new PDF at the path named by `CV_FILE` in [src/config.ts](src/config.ts),
or change the constant. `CV_FILENAME` in the same file is the name the browser
saves it under.

## Deploying

**GitHub Pages** happens by itself: every push to `main` runs
[.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds and
publishes `dist/`. It needs Settings → Pages → Source set to "GitHub Actions"
once — until that is set, the build succeeds and the deploy fails with a 404.

The site lands under the repository name, at `/cv-app/`. Serving it from the
root of the domain instead is a matter of the repository name: only one called
`AlKhomenker.github.io` answers at `https://alkhomenker.github.io/`.

**Any other static host** — shared PHP hosting, S3, a plain Apache box — takes
the same `dist/`: `vite.config.ts` sets `base: "./"`, so every asset path is
relative and the folder works at a domain root, in a subdirectory, or opened
from disk. Upload the _contents_ of `dist/`, including the hidden
`.htaccess`, which carries the MIME types and cache headers a stock Apache
host gets wrong.

## The contact form

`FORM_ENDPOINT` in [src/config.ts](src/config.ts) is empty, so the form opens a
prefilled `mailto:` to `CONTACT_EMAIL`. Filling it with a Formspree, Web3Forms
or EmailJS endpoint makes it post instead. The recipient address is configured
in that service — a service that needs a private key does not belong in a page
the browser downloads.
