import type { ReactNode } from "react";
import { LineReveal } from "@/common/ui/LineReveal";

/** How large a title is set. Three sizes, and every section uses one of them. */
export type TitleSize = "hero" | "page" | "lead";

const SIZE: Record<TitleSize, string> = {
  /** The opening's name, once. The largest thing on the page. */
  hero: "font-serif font-bold tracking-[-0.02em] leading-[1.04] text-ink text-[clamp(2.2rem,1.4rem+7vw,6rem)]",
  /** Every section heading. */
  page: "font-serif font-light leading-[1.06] text-ink text-[clamp(1.4rem,min(6.2vw,4.2vh),2.6rem)]",
  /** A named group INSIDE a section — the languages under the strengths. */
  lead: "font-semibold leading-tight text-soft text-[clamp(0.84rem,min(3.4vw,2vh),1.05rem)]"
};

export interface SectionTitleProps {
  children: ReactNode;
  /** The section's own `active`. The title makes the page's one entrance on it. */
  shown: boolean;
  /** `h1` once, on the opening. `h3` for a group inside a section. */
  as?: "h1" | "h2" | "h3";
  size?: TitleSize;
  /**
   * A title that is READ but not SEEN.
   *
   * Two sections fill the whole screen with one thing — a timeline of roles, a
   * fanned deck of cards — and a heading over either would be a line competing
   * with the only thing the section is. They still need a name in the
   * document, for a screen reader and for the outline, so they take one from
   * here rather than writing their own `sr-only` span.
   */
  quiet?: boolean;
  /** Latin in every locale: the person's own name, and nothing else. */
  dir?: "ltr";
  className?: string;
}

/**
 * Every title on this page, in one file.
 *
 * Three things are decided here and nowhere else: a title is **centred**, it
 * is set in the page's serif at one of three sizes, and it makes the page's
 * one entrance — out of its own centre, over `--dur-reveal`, through
 * `LineReveal`. A section says which size and what the words are.
 *
 * It is one component for the same reason `CallToAction` is: ten sections
 * each writing their own `<h2>` is nine headings that agreed on a Tuesday and
 * had drifted into four alignments and five sizes by the end of the rewrite.
 * A section that needs a heading to be different has found a case this file
 * should answer, not a reason to write its own.
 */
export function SectionTitle({
  children,
  shown,
  as: Tag = "h2",
  size = "page",
  quiet = false,
  dir,
  className
}: SectionTitleProps) {
  if (quiet) return <Tag className="sr-only">{children}</Tag>;

  return (
    <Tag className={[SIZE[size], "text-center", className].filter(Boolean).join(" ")} dir={dir}>
      <LineReveal shown={shown}>{children}</LineReveal>
    </Tag>
  );
}
