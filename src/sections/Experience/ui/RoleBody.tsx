import { Ltr } from "@/common/ui/Ltr";
import type { Role } from "@/content";
import { useLocale } from "@/i18n";
import { companyLinkLabel, description, isRunning, spanLabel, stackPills } from "../utils/roles";
import { TechPills } from "./TechPills";

/**
 * The company name, in both places a role is drawn.
 *
 * It is the one proper noun in the block that is not the person's own, and it
 * is what a reader scanning six roles is actually looking for — so it is set
 * in the page's accent, on a hairline of its own, rather than in the same soft
 * grey as the sentence it sits in. The rule is the accent at half strength:
 * a line the width of the word, which is a name being pointed at and not a
 * field being underlined.
 */
const COMPANY_CLASS = [
  "border-b border-accent/45 pb-px font-semibold text-accent",
  "transition-[color,border-color,background-color] duration-(--dur-fast) ease-page"
].join(" ");

/**
 * The same name where it is also a LINK — an opened role only.
 *
 * The hairline fills in under the pointer and the name takes a wash of its own
 * colour, which is the whole of the hover: a name that moved, grew or changed
 * colour would be a fourth entrance on a page that has one. The negative
 * margin against the padding is what keeps that wash from shifting the line it
 * sits in — the box is wider by half a step in both directions, always, and
 * only what is painted in it changes.
 */
const COMPANY_LINK_CLASS = [
  COMPANY_CLASS,
  "-mx-0.5 rounded-sm px-0.5",
  "hover:border-accent hover:bg-accent/10",
  "focus-visible:border-accent focus-visible:bg-accent/10"
].join(" ");

export interface RoleBodyProps {
  role: Role;
  /** Everything, as an opened role shows it — or trimmed, as a card does. */
  full: boolean;
  /** Set only where something points at the heading: the open panel's label. */
  titleId?: string;
}

/**
 * One role's words, in the order they are read: the year it started, the span
 * beside it, what the job was, where, what it was, and what it was built with.
 *
 * There is one of these and not three. A card, an opened role and the plain
 * list a reader on reduced motion gets are the same six facts at three sizes,
 * and a second copy of them is a second place for a date to be wrong.
 *
 * A card draws THREE of them — the year, the job and the company — and keeps
 * the rest. `full` has never changed what a role CONTAINS, only how much of it
 * is drawn: the card used to give the description the room it had left and
 * clip the rest, and now it gives it none. It is the same decision with the
 * clip at nought, and it is why the trim is a class and not a shorter string.
 * The reader who cannot see the card at all still gets every word, in order,
 * for all six roles, however far the scroll happens to have gone.
 */
export function RoleBody({ role, full, titleId }: RoleBodyProps) {
  const { content } = useLocale();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="font-serif font-bold leading-[0.9] text-accent
            text-[clamp(2.4rem,9vw,3.2rem)]"
            dir="ltr">
            {role.start.year}
          </span>
          <span className="flex items-center gap-1.5 text-[0.9rem] text-soft">
            <span dir="ltr">{spanLabel(role)}</span>
            {isRunning(role) && (
              <>
                {/* The dot and the word say the same thing, so only one of them
                  is read out: the word, in the reader's own language. */}
                <span
                  className="inline-block size-1.75 flex-none rounded-full bg-accent
                  shadow-[0_0_var(--beam-bloom)_var(--page-accent)] animate-live"
                  aria-hidden="true"
                />
                {content.ui.present}
              </>
            )}
          </span>
        </p>

        <h3 id={titleId} className="mt-3 font-serif text-ink text-[clamp(1.05rem,3.6vw,1.3rem)]">
          {role.role}
        </h3>
        <p className="mt-1 text-[0.92rem] text-soft">
          {/*
          The company is a link to its page on LinkedIn — but only where the
          role is open. A card is ONE control: the whole of it is covered by
          the button that opens the role, so a link drawn under that button is
          a link nobody can reach, and a second target inside a card whose
          every pixel already does something is a target that can only be hit
          by accident. The reader gets the link the moment the role is open,
          which is also where there is room to notice it.
        */}
          {full ? (
            <a
              href={role.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={companyLinkLabel(content.experience.companyLink, role)}
              className={COMPANY_LINK_CLASS}>
              <Ltr>{role.company}</Ltr>
            </a>
          ) : (
            <span className={COMPANY_CLASS}>
              <Ltr>{role.company}</Ltr>
            </span>
          )}
          {/* The place follows the company on one line, and on a card it is read
            rather than drawn — the same reason as the block below. */}
          <span className={full ? "" : "sr-only"}> · {role.place}</span>
        </p>
      </div>
      {/*
        The rest of the role: what it was, and what it was built with.

        On a card it is IN the document and not ON it. The track is a picture
        of the history and never the place it is kept, so a screen reader and a
        search engine still get every role in full, in order, whichever two or
        three of them happen to be painted.

        `contents` and not a second face. The wrapper has to disappear from the
        layout when the role is open, or the margins below would be measured
        against it instead of against the sheet they are drawn on.
      */}
      <div className={full ? "contents" : "sr-only"}>
        <p className="mt-3 text-[0.92rem] leading-[1.55] text-soft">{description(role)}</p>
        <p className="mt-5 mb-2 text-[0.82rem] font-semibold tracking-wide text-ink">{content.experience.stackLabel}</p>
        <TechPills names={stackPills(role)} />
      </div>
    </div>
  );
}
