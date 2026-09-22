import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { useTimeline } from "./hooks/useTimeline";
import { arrivalStyle } from "./utils/track";
import { RoleList } from "./ui/RoleList";
import { RolePanel } from "./ui/RolePanel";
import { Timeline } from "./ui/Timeline";

/**
 * Section 3. Six roles hung off one line, travelled from today back to the
 * beginning of the history.
 *
 * Two cues, as everywhere on this stage. `active` is the SECTION arriving and
 * leaving — the whole timeline grows into place and collapses out of it, one
 * animation played in both directions. `progress` is the reader's own position
 * ALONG it, and it is the whole of the timeline: where the track sits and how
 * present each card is are functions of the distance from the reading line and
 * of nothing else, so scrolling back up runs the identical states backwards.
 *
 * All six roles are in the document at all times, in order, with their
 * headings, their dates and every word of their descriptions — whichever few
 * of them happen to be painted. The track is a picture of the history and
 * never the place it is kept.
 */
export function Experience({ active, progress, seek }: StageSectionProps) {
  const { content } = useLocale();
  const reduced = useReducedMotion();
  const roles = content.experience.items;
  const timeline = useTimeline(roles, progress, seek);

  return (
    <section className="relative h-full" id="experience" aria-label={content.sections.experience}>
      {/* The timeline has no title drawn on it — the cards are the section.
          The heading is here for the outline a screen reader and a search
          engine read the page by, which a line of cards cannot give them. */}
      <SectionTitle quiet shown={active}>
        {content.experience.title}
      </SectionTitle>

      {reduced ? (
        <RoleList roles={roles} />
      ) : (
        /* Two wrappers, and each owns ONE cue. The outer is the section
           arriving and leaving with the stage; the inner is the timeline
           standing aside while a role fills the screen. Written on one element
           they would be two rules over one opacity, and which won would be
           down to the order Tailwind happened to emit them in.

           The section does not grow into place, it TRAVELS into it: it comes
           from the end of the track the reader is entering from and leaves
           towards the end they are leaving by, so the step between two
           sections continues the movement the scroll was already making
           instead of cutting to a new picture. */
        <div
          className="relative h-full opacity-0 [translate:0_var(--arrive)]
            transition-[opacity,translate] duration-(--dur-slow) ease-page
            shown:opacity-100 shown:[translate:0_0]"
          style={arrivalStyle(progress)}
          data-shown={active}>
          <div
            className="h-full transition-[opacity,filter] duration-(--dur-slow) ease-page
              data-[dimmed=true]:opacity-0 data-[dimmed=true]:blur-[6px]"
            data-dimmed={timeline.open !== null}>
            <Timeline
              roles={roles}
              line={timeline.line}
              focused={timeline.focused}
              onOpen={timeline.openRole}
              onCard={timeline.registerCard}
              onKeyDown={timeline.onKeyDown}
            />
          </div>
        </div>
      )}

      {timeline.open && (
        <RolePanel
          open={timeline.open}
          leaving={timeline.leaving}
          onClose={timeline.closeRole}
          onClosed={timeline.onClosed}
        />
      )}
    </section>
  );
}
