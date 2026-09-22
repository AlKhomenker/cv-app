import { useReducedMotion } from "@/common/hooks/useReducedMotion";
import { GradientRing } from "@/common/ui/GradientRing";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";
import { StripBlock } from "./ui/StripBlock";
import { blockStyle, readingLine } from "./utils/strip";

/**
 * Section 2. One glass card in the middle of the screen with four blocks of
 * text passing through it.
 *
 * Two things move and they move on different cues. The card is `active`: it
 * grows out of the exact centre and collapses back into it along the same
 * path, so there is one animation played forwards and backwards rather than
 * an entrance and a separate exit. The strip is `progress`, the reader's own
 * position inside the section, which runs backwards as readily as forwards
 * because every block's state is a function of its distance from the reading
 * line and of nothing else.
 *
 * All four blocks are in the document the whole time. Scroll decides only
 * where they are drawn.
 *
 * The glass is written out rather than taken from the `glass` class on
 * purpose: that class carries a theme cross-fade `transition` from a more
 * specific selector in `theme.css`, which would replace the one below and the
 * card would change colour on a theme change instead of growing out of the
 * centre. The tokens are the same tokens.
 */
export function Summary({ active, progress }: StageSectionProps) {
  const { content } = useLocale();
  const reduced = useReducedMotion();
  const { share, blocks } = content.summary;
  const line = readingLine(progress, blocks.length);

  return (
    <section
      className="grid h-full content-center justify-items-center px-(--gutter)
        pt-[calc(var(--header-h)+16px)] pb-8
        md:px-10 md:pt-[calc(var(--header-h)+28px)] md:pb-12"
      id="summary"
      aria-label={content.sections.summary}>
      {/* `--pane-blur` ramps the backdrop up with the rest of the arrival: the
          card is not a pane that appears already thick. */}
      <SectionTitle shown={active} className="pb-4 md:pb-6 lg:pb-8">
        {content.summary.title}
      </SectionTitle>

      <div
        className="relative grid max-h-full origin-center scale-60 opacity-0
          [--pane-blur:0px] [--step:clamp(150px,27vh,230px)]
          grid-rows-[minmax(0,1fr)]
          w-[min(720px,92vw)] h-[clamp(300px,52vh,440px)] p-[clamp(22px,4.4vw,40px)]
          rounded-glass border border-hair bg-glass
          shadow-[inset_0_1px_0_var(--glass-edge),var(--glass-drop)]
          [backdrop-filter:blur(var(--pane-blur))_saturate(var(--glass-sat))]
          [transition:opacity_var(--dur-slow)_var(--ease),scale_var(--dur-slow)_var(--ease),backdrop-filter_var(--dur-slow)_var(--ease),background-color_var(--dur)_var(--ease),border-color_var(--dur)_var(--ease),box-shadow_var(--dur)_var(--ease)]
          shown:scale-100 shown:opacity-100 shown:[--pane-blur:var(--glass-blur)]
          motion-reduce:h-auto motion-reduce:scale-100 motion-reduce:opacity-100
          motion-reduce:[--pane-blur:var(--glass-blur)]"
        data-pane
        data-shown={active}>
        {/* The card's edge, painted rather than drawn: a closed turn through
            the page's four hues. It does not travel — a border that moves on
            a block of text being read would be the only thing anyone read. */}
        <GradientRing />
        {/*
          The card keeps its height and the text passes through it, so the
          strip is clipped — and the clip is masked at both ends, because a
          line of text stopping against a hard edge reads as a box with the
          text cut off rather than as text dissolving into glass.

          A tab stop only when there is something to scroll: under reduced
          motion the blocks are a column that can outgrow the card, and a
          scrollable region a keyboard cannot reach is one nobody can read.
        */}
        <div
          className="relative min-h-0 overflow-hidden
            mask-[linear-gradient(to_bottom,transparent_0,#000_13%,#000_87%,transparent_100%)]
            motion-reduce:overflow-y-auto motion-reduce:mask-none
            motion-reduce:[&>*+*]:mt-[0.9em]"
          tabIndex={reduced ? 0 : undefined}>
          {blocks.map((block, position) => (
            <StripBlock
              key={block.id}
              id={block.id}
              text={block.text}
              share={share}
              style={blockStyle(position, line, reduced)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
