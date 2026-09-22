import type { CSSProperties } from "react";
import { blockGlyph } from "../utils/glyphs";
import { textRuns } from "../utils/runs";
import { StripRun } from "./StripRun";

export interface StripBlockProps {
  /** Which block this is. It chooses the mark and nothing else. */
  id: string;
  /** The sentence, still carrying its marks — see `utils/runs.ts`. */
  text: string;
  /** The accent number that `{share}` inside the sentence stands for. */
  share: string;
  /**
   * Where this block sits and how solid it is, as custom properties. Absent
   * under reduced motion, where the utilities lay the blocks out as an
   * ordinary column and an inline style would win over them.
   */
  style?: CSSProperties;
}

/**
 * One block of the summary, at whatever distance from the reading line it is.
 *
 * Every block is centred on the card's middle and pushed off it by its own
 * distance from that line, which is what makes four separately drawn
 * paragraphs read as one strip. They are positioned rather than laid out in
 * flow because the step between them is then the same wherever they are and
 * whatever length the sentence is, in either language, with nothing measured.
 *
 * ## The mark over the sentence
 *
 * One small glyph per block, before the words — what the block is ABOUT, drawn
 * rather than said, and the line between one block and the next as they pass.
 *
 * It is in the quiet ink and not in the accent. The accent in this section is
 * the share of pull requests reviewed, one number in one of the four
 * sentences, and a second accented thing over every block would take that
 * highlight away from it.
 *
 * It is in flow, above the text, so the mark and the sentence are centred on
 * the reading line as one thing. Floating it outside the paragraph's box would
 * hold the text exactly where it is today and let the mark drift towards the
 * block above as the strip moves — the mark belongs to its own sentence.
 *
 * It is `aria-hidden`: the sentence says what the block is, and a glyph over
 * it has nothing to add to a reader who cannot see it.
 *
 * It is sized in `em`, so it grows with the sentence it marks: the text is a
 * clamp between 18 and 30px and a fixed glyph would be a different size beside
 * it on every screen.
 */
export function StripBlock({ id, text, share, style }: StripBlockProps) {
  const Glyph = blockGlyph(id);

  return (
    <p
      className="absolute inset-x-0 top-1/2 mx-auto my-0 max-w-[40ch] text-start text-pretty
        font-light leading-[1.45] text-ink text-[clamp(18px,4.6vw,30px)] md:max-w-[58ch]
        transform-[translateY(calc(-50%+(var(--away,0)*var(--step))))_scale(var(--scale,1))]
        opacity-(--fade,1) filter-[blur(var(--haze,0px))]
        will-change-[transform,opacity,filter]
        motion-reduce:static motion-reduce:transform-none motion-reduce:opacity-100
        motion-reduce:filter-none motion-reduce:will-change-auto"
      style={style}>
      {Glyph && (
        <span aria-hidden="true" className="mb-[0.45em] block text-soft">
          <Glyph className="size-[0.78em]" strokeWidth={1.5} />
        </span>
      )}
      {textRuns(text, share).map((run) => (
        <StripRun key={run.key} run={run} />
      ))}
    </p>
  );
}
