import { useRef } from "react";
import { useBlobField } from "./hooks/useBlobField";
import { OVERSCAN } from "./utils/paint";

export interface BlobFieldProps {
  /**
   * How quiet the field should be, 0 to 1. The section on screen asks for it;
   * the field eases there rather than switching.
   */
  calm: number;
}

/**
 * The light behind the glass: a full-screen canvas of large soft blobs that
 * pulse, drift, and on a desktop lean toward the pointer. It sits under
 * everything and takes no input.
 *
 * It is drawn small and stretched, then blurred. The 20% overscan is what
 * keeps the blur from showing the canvas's own edge: the soft border falls
 * outside the viewport instead of across it. It is a style rather than a
 * class because section 7 has to undo it — the dispersal there is given a
 * place on the SCREEN and has to find it on this surface — and one number two
 * files agree on is one that cannot drift.
 *
 * The blur is a TOKEN rather than a number in the filter, and `--field-more`
 * beside it is nought until something asks for the light to stand further
 * back — which one role filling the screen does, from `theme.css`. A rule
 * there can add to the blur without knowing which of the three breakpoints
 * set it.
 *
 * `--field-warm` is the same idea for HUE, and section 5 is what writes it: the
 * paper surfaces there are warm, and light that stayed cool behind them would
 * read as a lamp of the wrong colour rather than as a page of a different
 * kind. It is a fraction on the document, written from that section's own
 * reading position, so the shift happens across the pan rather than at a
 * boundary — and it is nought everywhere else, which costs nothing.
 */
export function BlobField({ calm }: BlobFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useBlobField(canvasRef, calm);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full
        [--field-blur:42px] [--field-sat:1.1]
        filter-[blur(calc(var(--field-blur)+var(--field-more,0px)))_saturate(var(--field-sat))_sepia(calc(var(--field-warm,0)*0.4))]
        transition-[filter,opacity] duration-(--dur-slow) ease-page
        md:[--field-blur:60px]
        lg:[--field-blur:76px] lg:[--field-sat:1.12]"
      style={{ scale: String(OVERSCAN) }}
      data-field
      aria-hidden="true"
    />
  );
}
