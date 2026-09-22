import type { Role } from "@/content";
import { useLocale } from "@/i18n";
import type { StopState } from "../utils/track";
import { RoleBody } from "./RoleBody";

export interface TimelineStopProps {
  role: Role;
  /** Where it sits on the track, from `utils/track.ts`. */
  state: StopState;
  /** Whether this is the role on the reading line: the only one that can be opened. */
  focused: boolean;
  onOpen: (role: Role) => void;
  /** Hands the timeline the control to put focus back on when a role closes. */
  onCard: (id: string, node: HTMLButtonElement | null) => void;
}

/**
 * One role on the track: a glass card beside the rail, at whatever distance
 * the scroll has put it from the reading line.
 *
 * Its side alternates, and only once there is room for two columns. Below that
 * every card is on the same side of the rail, in one column — a card narrow
 * enough to share a phone with a second column is a card nothing fits in, and
 * a timeline whose entries swap sides every screen is a reader whose eye has
 * to start again at each one.
 *
 * Every card is in the document, always, whichever ones are painted. The track
 * is a picture of six roles and not a way of storing them — a reader on a
 * screen reader, and a search engine, get the whole history in order however
 * far the scroll happens to have gone.
 *
 * All six carry the control that opens them, and only the focused one is in
 * the tab order. That is a roving tab stop, and it is what makes an arrow key
 * work twice: moving the track moves the focus with it, so the second press
 * arrives on the role that has just reached the line rather than on one the
 * reader can no longer see.
 */
export function TimelineStop({ role, state, focused, onOpen, onCard }: TimelineStopProps) {
  const { content } = useLocale();

  return (
    <li
      className="pointer-events-none absolute inset-s-0 inset-e-0 flex items-center
        h-(--slot) pe-2 ps-[calc(var(--rail-x)+22px)]
        lg:pe-0 lg:ps-0
        lg:data-[side=start]:pe-[calc(var(--rail-x)_+_var(--rail-clear))]
        lg:data-[side=end]:ps-[calc(var(--rail-x)_+_var(--rail-clear))]"
      style={{ ...state.style, top: "calc(var(--i) * var(--slot))" }}
      data-side={state.side}
      data-drawn={state.drawn}>
      <article
        className="relative flex h-(--card-h) w-full max-w-140 flex-col
          overflow-hidden rounded-[22px] border border-hair bg-glass
          p-[clamp(16px,4vw,26px)] pb-12
          shadow-[inset_0_1px_0_var(--glass-edge),var(--glass-drop)]
          [backdrop-filter:blur(calc(var(--glass-blur)*var(--fade,1)))_saturate(var(--glass-sat))]
          scale-(--scale,1) [translate:0_var(--hover,0px)]
          opacity-(--fade,1) filter-[blur(var(--haze,0px))]
          will-change-[scale,opacity,filter]
          transition-[border-color,translate] duration-(--dur) ease-page
          data-[drawn=false]:[backdrop-filter:none]
          lg:max-w-110 lg:data-[side=start]:ms-auto
          md:data-[focused=true]:hover:[--hover:-4px] md:data-[focused=true]:hover:border-accent"
        data-focused={focused}
        data-side={state.side}
        data-drawn={state.drawn}>
        <RoleBody role={role} full={false} />

        <button
          ref={(node) => onCard(role.id, node)}
          type="button"
          className="absolute inset-0 flex cursor-pointer items-end justify-end rounded-[inherit]
            border-0 bg-transparent p-[clamp(16px,4vw,26px)] text-end
            data-[focused=true]:pointer-events-auto"
          data-focused={focused}
          tabIndex={focused ? 0 : -1}
          aria-haspopup="dialog"
          aria-label={`${content.experience.open}: ${role.role}`}
          onClick={() => onOpen(role)}>
          <span
            className="inline-flex items-center rounded-full border border-hair bg-glass-strong
              px-3 py-1 text-[0.78rem] font-semibold text-ink"
            aria-hidden="true">
            {content.experience.open}
          </span>
        </button>
      </article>
    </li>
  );
}
