import type { CSSProperties } from "react";
import type { Role } from "@/content";
import { trackStyle } from "../utils/track";

export interface RailProps {
  roles: readonly Role[];
  /** Where the reader is along the track — see `utils/track.ts`. */
  line: number;
}

/**
 * How far past the first and last node the line runs, so that neither end is
 * ever on the screen. Half the viewport reaches the edge; this clears it.
 */
const OVERHANG = "60vh";

/** Where a node sits on the track, in slots. */
function at(stop: number): CSSProperties {
  return { top: `calc(${(stop + 0.5).toFixed(2)} * var(--slot))` };
}

/** The line, running well past both ends of the history. */
function lineStyle(count: number): CSSProperties {
  return {
    top: `calc(0.5 * var(--slot) - ${OVERHANG})`,
    height: `calc(${(count - 1).toFixed(2)} * var(--slot) + 120vh)`
  };
}

/**
 * The line the roles hang off, with a node at each of them.
 *
 * ONE line, and one node per role. There is no second strand and no bracket
 * around the two jobs at the same employer: a timeline that draws a line
 * beside its line is read as two timelines, and a role grouped under another
 * role is read as a sub-entry rather than as the job it was. Each card stands
 * on the line by itself, and the employer is written on the card where it can
 * be read in words.
 *
 * Nothing on the rail reacts to the reading position either. A node that lit
 * as the reader reached it would light in one frame, half way between two
 * roles, and a mark that arrives at full strength in one frame reads as the
 * scroll being caught and pulled onto the point. Where the reader is is said
 * once, by the light at the reading line, which is always exactly there.
 *
 * It runs past both ends of the history and is FADED OUT at the screen's
 * edges. It used to begin at the first node and end at the last, on the
 * reasoning that a history has a beginning — but an end that is on the screen
 * is an end the reader watches travel to the top of it, and a rail being
 * scrolled is no longer the axis the reading happens on. Where the history
 * begins is said by the first year, on the first card, in a number. The line
 * is the thing that number is written against.
 *
 * The rail travels with the track but is NOT part of it, and the mask is why.
 * A mask makes a backdrop root, so the cards' glass would stop seeing the
 * light behind the page the moment it was put anywhere above them. Here it is
 * over a line and six dots, and nothing under it asks for a backdrop.
 *
 * It is `aria-hidden`. Every date it marks is written on the card it belongs
 * to, and a reader who cannot see it has lost nothing.
 */
export function Rail({ roles, line }: RailProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0
        mask-[linear-gradient(to_bottom,transparent_0,#000_16%,#000_84%,transparent_100%)]"
      aria-hidden="true">
      <div
        className="absolute inset-s-0 inset-e-0 top-1/2 h-[calc(var(--stops)*var(--slot))]
          will-change-[translate]"
        style={trackStyle(line, roles.length)}>
        <span
          className="absolute w-px bg-hair
            inset-s-(--rail-x) [margin-inline-start:-0.5px]"
          style={lineStyle(roles.length)}
        />

        {roles.map((role, position) => (
          <span
            key={role.id}
            className="absolute size-1.75 -translate-y-1/2 rounded-full bg-hair
              inset-s-(--rail-x) [margin-inline-start:-3.5px]"
            style={at(position)}
          />
        ))}
      </div>
    </div>
  );
}
