# pdf

The CV as a **file**, and the control that hands it over.

## Where the file is

```
apps/CvCard/public/cv/Alina-Khomenker-CV.pdf
```

That path is named once, in `src/config.ts` (`CV_FILE`), and turned into a URL
once, in `utils/cvFile.ts`. Nothing else in the app knows where the CV lives.

`public/` is copied into `dist/` verbatim, so replacing the CV is replacing that
one file — no import to update, no rebuild of anything but the copy step. The
name a browser saves it under is `CV_FILENAME`, beside it in the same config,
because the path on the server and the name on the reader's disk are two
different decisions.

**If the file is not there, the download looks like it worked.** The dev server
answers an unknown path with `index.html`, and `download` names the saved file
without checking what came back — so the reader gets that HTML page under the
CV's name and their viewer reports a damaged PDF. Nothing in the browser says
otherwise. `requireCv()` in `vite.config.ts` is the answer to that: a warning
when the dev server starts, and a failed build, so the gap is never something a
reader discovers.

## Why it is not drawn from the page any more

This feature used to import `html2pdf.js` (~900KB), set `data-pdf` on the body
so the print rules expanded every collapsed role, and draw `#main` into a PDF
through html2canvas. What came out was a **picture of this page**: the stage
flattened onto A4, the glass gone grey, the text an image rather than text.

A CV is a document that was written. The download now gives the reader that
document, so:

- there is no library to load and no work to wait for, which is why the button
  has no busy state and `ui.preparing` is gone from the locales;
- the file cannot come out wrong, because nothing renders it;
- it is a plain `<a download>`, so the reader also gets the address on hover,
  "save link as", and a middle click that opens the CV in a tab.

`download` is only honoured for a same-origin URL, which is the reason the file
ships in `public/` rather than being linked from somewhere else.

## What is left of printing

`@media print` in `base.css` and `theme.css` still lays this page out for paper,
for a reader who presses Ctrl+P on the page itself. That is the page put on
paper, and a separate thing from the CV — it is not what the button does.
