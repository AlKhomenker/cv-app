import type { KeyboardEvent } from "react";
import type { Role } from "@/content";
import { stopState, trackStyle } from "../utils/track";
import { Rail } from "./Rail";
import { TimelineStop } from "./TimelineStop";

export interface TimelineProps {
  roles: readonly Role[];
  /** Where the reader is along the track — see `utils/track.ts`. */
  line: number;
  focused: number;
  onOpen: (role: Role) => void;
  onCard: (id: string, node: HTMLButtonElement | null) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

/**
 * Six years of work as one line with the roles hung off it, travelled rather
 * than stepped through.
 *
 * What moves is the TRACK, in one piece: the rail, its nodes and all six cards
 * slide together, and the reading line stays where it is at the middle of the
 * screen. That is the whole reason the light below is not part of it — it is
 * the place the reader is reading, not a thing on the timeline, and it holds
 * still while the years pass through it.
 *
 * Nothing here eases. The track's position is written straight from the
 * scroll, so it moves exactly as far as the hand moved it and stops exactly
 * where the hand stopped. An easing on it would spend a fifth of a second
 * catching up after every gesture, and a track still arriving after the reader
 * has stopped reads as being pulled onto the nearest role.
 *
 * Every length here is a custom property declared once, at the top, because
 * three separate things have to agree about them: the rail's position sets
 * where the cards stop, and the slot's height sets both how tall a card may be
 * and how far the track moves per role. Written out in three places they would
 * agree until somebody changed one of them.
 *
 * `--card-h` is the reason a card says only three things. It is not a card's
 * own height — it is the distance the track travels per role, so a card given
 * room for a paragraph is a timeline that shows one role at a time. At three
 * lines the roles either side of the reading line are on the screen too, which
 * is what a timeline is for.
 */
export function Timeline({ roles, line, focused, onOpen, onCard, onKeyDown }: TimelineProps) {
  return (
    <div
      className="relative h-full overflow-hidden
        [--rail-x:22px] [--rail-clear:26px]
        [--card-h:clamp(168px,22vh,212px)] [--slot:calc(var(--card-h)+clamp(22px,4vh,44px))]
        lg:[--rail-x:50%]"
      onKeyDown={onKeyDown}>
      {/* The rail travels with the cards but is a layer of its own, because it
          is MASKED — faded out at the top and bottom edges so that neither end
          of it is ever something the reader watches arrive. A mask makes a
          backdrop root, so one put above the cards would take the light behind
          the page away from their glass. */}
      <Rail roles={roles} line={line} />

      <div
        className="absolute inset-s-0 inset-e-0 top-1/2 h-[calc(var(--stops)*var(--slot))]
          will-change-[translate]"
        style={trackStyle(line, roles.length)}>
        <ol className="absolute inset-0">
          {roles.map((role, position) => (
            <TimelineStop
              key={role.id}
              role={role}
              state={stopState(position, line)}
              focused={position === focused}
              onOpen={onOpen}
              onCard={onCard}
            />
          ))}
        </ol>
      </div>

      {/* The same light as the opening and the contacts: one lamp, moved about
          the page, so the whole site reads as one piece of motion. Here it is
          the reading line itself — it sits on the rail at the middle of the
          screen and pulses, and each role's node slides into it in turn. */}
      <span
        className="pointer-events-none absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full
          bg-accent shadow-[0_0_var(--beam-bloom)_var(--page-accent)] animate-live
          inset-s-(--rail-x) -ms-1.25"
        aria-hidden="true"
      />
    </div>
  );
}
