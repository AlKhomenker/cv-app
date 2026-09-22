import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { CallToAction } from "@/common/ui/CallToAction";
import { LineReveal } from "@/common/ui/LineReveal";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { useDispersal } from "./hooks/useDispersal";
import { exitStyle, spreadAt } from "./utils/closing";

/**
 * Section 7. Two lines, the point that has travelled the whole site, and the
 * two controls the opening offered.
 *
 * It is the quietest screen on the page and the only one that ends. The scroll
 * stops here — `stop` in `registry.ts` — so a gesture past the last state of
 * the dispersal moves nothing at all, and `overscroll-behavior-y` in
 * `theme.css` is what keeps that from reading as a page that tried to continue
 * and failed.
 *
 * The dispersal is not drawn here, and there is no longer a dot to draw. It is
 * painted by the BACKGROUND canvas, out of the background's own palette,
 * because the particles are meant to end up indistinguishable from it — see
 * `shell/BlobField/utils/burst.ts`. All this section hands over is how far the
 * point has come apart; the field knows where, because it is the middle of the
 * screen, which is where the point has been on every section before this one.
 *
 * The light comes back on with it. Every section since the summary has asked
 * the field for quiet; this one asks for nothing, so the pulse, the drift and
 * the pointer all ease back to what they were on the first screen. The reader
 * ends up moving the same field they moved when they arrived.
 *
 * Both lines are centred, so there is no rule here for Hebrew to mirror.
 */
export function Closing({ active, progress }: StageSectionProps) {
  const { content } = useLocale();
  const reduced = useReducedMotion();

  useDispersal(spreadAt(progress), active && !reduced);

  return (
    <section
      className="grid gap-4 h-full content-center justify-items-center text-center
        px-(--gutter) pt-[calc(var(--header-h)+24px)]
        pb-[calc(env(safe-area-inset-bottom,0px)+clamp(24px,5vh,48px))]
        md:px-10 md:pt-[calc(var(--header-h)+40px)]
        lg:px-18
        *:max-w-full"
      id="closing"
      aria-label={content.sections.closing}>
      <SectionTitle shown={active} className="mt-[clamp(30px,7vh,76px)]">
        {content.closing.thanks}
      </SectionTitle>

      <p
        className="leading-[1.4] text-soft
          text-[clamp(0.9rem,0.84rem+0.5vw,1.1rem)]">
        <LineReveal shown={active}>{content.closing.references}</LineReveal>
      </p>

      {/*
        The way out, and the only thing left moving once the lines have
        settled.

        It is the opening's pair, doing the opening's job — and it is the
        opening's own COMPONENT, not a copy of it, because two buttons a reader
        is meant to recognise as the same two cannot be two different pieces of
        code. A reader who has come this far is at the end of the page, and the
        end of the page is where a CV asks for the two things it exists to ask
        for.

        All this section adds is a size: over the last third of the reading
        position the row grows by 15%. That is the row, not the buttons.
      */}
      <CallToAction shown={active} className="origin-center" style={exitStyle(progress, reduced)} />
    </section>
  );
}
