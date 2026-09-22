import { Icon } from "@/common/ui/Icon";
import { starStyle } from "../utils/arrival";

const MARKS = [0, 1, 2, 3, 4];

/** An earned mark. Filled, and counted in one at a time. */
const FILLED_CLASS = "size-[clamp(13px,min(4.2vw,2.4vh),18px)] origin-center fill-high stroke-none";

/** One that is not. The outline that says how many there could have been. */
const EMPTY_CLASS = "size-[clamp(13px,min(4.2vw,2.4vh),18px)] fill-none stroke-hair stroke-[1.2]";

export interface StarsProps {
  rating: number;
  /** Which row this is, which is what sets when its marks are counted in. */
  index: number;
  /** The reader's place in the section, 0 to 1, or 1 with motion turned off. */
  at: number;
  /** The whole row in one sentence — a reader hears it, not five stars. */
  label: string;
}

/**
 * A rating, counted out one mark at a time as the reader scrolls.
 *
 * The earned marks make the page's one entrance — out of their own centre,
 * see `common/utils/emerge.ts` — a beat apart, so a five reads as a hand being
 * dealt rather than as a block appearing. The unearned ones never move: they
 * are the shape of what was not scored, and a row of four that arrived as a
 * row of five would say the wrong thing for a moment.
 *
 * `data-mark` is not read by anything that moves. It is what the print rules
 * name, because a sheet of paper is drawn from the whole document and most of
 * its rows were never scrolled to.
 */
export function Stars({ rating, index, at, label }: StarsProps) {
  return (
    <span className="inline-flex flex-none gap-1" role="img" aria-label={label}>
      {MARKS.map((mark) =>
        mark < rating ? (
          <Icon key={mark} name="star" className={FILLED_CLASS} style={starStyle(index, mark, at)} data-mark="" />
        ) : (
          <Icon key={mark} name="star" className={EMPTY_CLASS} />
        )
      )}
    </span>
  );
}
