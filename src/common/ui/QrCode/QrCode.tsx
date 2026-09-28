import { useMemo } from "react";
import { QUIET, darkRuns } from "./utils/runs";
import { qrMatrix } from "./utils/qr";

export interface QrCodeProps {
  text: string;
  label: string;
  className?: string;
}

/** A string as a QR code, drawn in SVG runs and `currentColor`. See `README.md`. */
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
