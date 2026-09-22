import { CallToAction } from "@/common/ui/CallToAction";
import { LineReveal } from "@/common/ui/LineReveal";
import { SectionTitle } from "@/common/ui/SectionTitle";
import { useLocale } from "@/i18n";
import type { StageSectionProps } from "@/shell/Stage";

/**
 * Section 1. Three lines and two buttons, centred over the moving light and
 * nothing else — no card, no frame, no photograph.
 *
 * `active` is the whole of the animation: true and every line rises into
 * place at once, false and they fade back out, and the stage waits for that
 * before it goes. It stays false while the loader is up, so the entrance
 * happens into a blank page.
 *
 * Nothing is placed by side, so there is no rule here that Hebrew mirrors.
 *
 * The two buttons are `common/ui/CallToAction` — the same file section 7 ends
 * on, so the pair a reader meets at the top of the page and the pair they meet
 * at the bottom cannot drift apart. All this section says about them is the
 * gap above them.
 *
 * "Write to me" opens the form there rather than sending the reader to the
 * bottom of the page for it. There is one form and it is the same one section 6
 * opens — see `common/ui/ContactForm` — because a second implementation is a
 * second set of validation rules that can disagree with the first.
 */
export function Opening({ active }: StageSectionProps) {
  const { content } = useLocale();

  return (
    <section
      id="opening"
      className="grid h-full content-center justify-items-center text-center
        gap-[clamp(4px,0.8vh,10px)] px-(--gutter)
        pt-[calc(var(--header-h)+24px)] pb-12
        md:px-10 md:pt-[calc(var(--header-h)+40px)] md:pb-16
        lg:px-18
        *:m-0 *:max-w-full">
      <SectionTitle as="h1" size="hero" shown={active} dir="ltr">
        {content.person.name}
      </SectionTitle>

      <p
        className="font-semibold leading-tight text-ink
          text-[clamp(1.05rem,0.9rem+1.3vw,1.9rem)]">
        <LineReveal shown={active}>{content.person.role}</LineReveal>
      </p>

      <p className="leading-[1.4] text-soft text-[clamp(0.92rem,0.86rem+0.5vw,1.15rem)]">
        <LineReveal shown={active}>{content.person.tagline}</LineReveal>
      </p>

      {/* The lines are a block; the controls answer them, so this is the one
          gap worth noticing — and the only measurement here that is not
          counted off the type. It is a share of the SCREEN rather than the
          80px it was: the three lines are centred in whatever height they are
          given, and a fixed gap is the same gap on a laptop with room to
          spare and on a phone held sideways with none. */}
      <CallToAction shown={active} className="mt-[clamp(72px,15vh,160px)]" />
    </section>
  );
}
