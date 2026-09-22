import { useMemo } from "react";
import { qrMatrix } from "../utils/qr";

export interface QrCodeProps {
  /** What the code carries. The matrix is a function of it and nothing else. */
  text: string;
  /** What a reader who cannot see it is told the code is. */
  label: string;
  className?: string;
}

/** Modules of clear space each side. Four is what the standard asks for. */
const QUIET = 4;

/**
 * The LinkedIn profile as a code a phone can take a picture of.
 *
 * It is drawn as SVG rectangles — one per run of dark modules along a row, not
 * one per module — so a 29×29 code is a few dozen shapes rather than four
 * hundred. It is `currentColor`, so it follows the theme without being told,
 * and it costs nothing to redraw when the theme changes because there is
 * nothing to redraw: no canvas, no image, no request.
 *
 * `useMemo` is one of the few here that is not the compiler's work: the matrix
 * is eight full layouts and eight penalty scores, and the row it sits in
 * re-renders on every wheel event.
 */
export function QrCode({ text, label, className }: QrCodeProps) {
  const runs = useMemo(() => darkRuns(qrMatrix(text)), [text]);
  const size = runs.size + QUIET * 2;

  if (runs.size === 0) return null;

  return (
    <svg className={className} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
      <rect width={size} height={size} fill="var(--page)" rx={QUIET / 2} />
      {runs.bars.map((bar) => (
        <rect
          key={`${bar.row}-${bar.from}`}
          x={bar.from + QUIET}
          y={bar.row + QUIET}
          width={bar.length}
          height={1}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

interface Bar {
  row: number;
  from: number;
  length: number;
}

/** Each row's dark modules collapsed into the fewest rectangles that draw them. */
function darkRuns(matrix: number[][]): { size: number; bars: Bar[] } {
  const bars: Bar[] = [];
  matrix.forEach((row, y) => {
    let from = -1;
    row.forEach((cell, x) => {
      if (cell === 1 && from === -1) from = x;
      if (cell === 0 && from !== -1) {
        bars.push({ row: y, from, length: x - from });
        from = -1;
      }
    });
    if (from !== -1) bars.push({ row: y, from, length: row.length - from });
  });
  return { size: matrix.length, bars };
}
