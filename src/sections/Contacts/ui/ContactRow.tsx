import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/common/ui/Icon";
import type { ContactKind, ContactLine } from "@/content";
import { useLocale } from "@/i18n";
import { QrCode } from "./QrCode";

export interface ContactRowProps {
  line: ContactLine;
  /** Where the row has got to as the reader scrolls — see `utils/rows.ts`. */
  style: CSSProperties;
  /** True while a cursor is what is pointing: the row copies instead of opening. */
  fine: boolean;
  /** True while this row is saying it has been copied. */
  copied: boolean;
  onCopy: (kind: string, value: string) => void;
}

/** One glyph per kind, so every row ends in the same place and says what it is. */
const GLYPH: Record<ContactKind, IconName> = {
  phone: "phone",
  email: "mail",
  linkedin: "linkedin",
  place: "pin"
};

/** Anything that reads as latin has to keep its order on a right-to-left page. */
const RTL = /[֐-ࣿ]/;

/** A small control beside a copied value, so the dialler is still one press away. */
const SIDE =
  "grid size-9 flex-none cursor-pointer place-items-center rounded-round border border-hair " +
  "bg-glass text-ink transition-[border-color] duration-(--dur-fast) ease-page hover:border-accent";

/** The same box without the chrome, for a glyph that names a row rather than acting on it. */
const MARK = "grid size-9 flex-none place-items-center";

const STROKE = "size-4 flex-none fill-none stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]";

/** The whole row is the target, and 56px of it: a phone is pressed with a thumb. */
const ROW =
  "group relative flex min-h-14 w-full origin-center items-center gap-3 bg-transparent px-1 text-start " +
  "border-0 border-b border-hair last:border-b-0";

/** A profile is a page on somebody else's site, and leaves this one where it is. */
const AWAY = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * One contact, as the whole row rather than as a word inside it.
 *
 * What a press DOES is decided by what the reader is pointing with and never by
 * how wide their screen is. A finger goes where the row goes — the dialler, the
 * mail app, the profile — because that is the only useful thing a phone can do
 * with an address. A cursor copies it, because a desktop mail client opening
 * over the page is rarely what was wanted, and the row says so in place: the
 * value cross-fades to one word and back, with no toast and nothing to dismiss.
 *
 * A cursor still gets the dialler, the mail app and the profile, as three small
 * controls on the row. Copying is the better default, not the only thing
 * allowed.
 *
 * Every row ends in a glyph, whatever is pointing at it, so the four values sit
 * in one column and each row says what it is without being read. Only on a
 * cursor is that glyph a control of its own; under a finger the row is already
 * one link and a second one inside it would be a smaller target in the middle
 * of a bigger one.
 *
 * The location is not a control in either case. It answers a question and has
 * nowhere to go, and a row that looks pressable and does nothing is worse than
 * a row that plainly is not — so its pin is drawn in the quiet ink and carries
 * no border.
 */
export function ContactRow({ line, style, fine, copied, onCopy }: ContactRowProps) {
  const { content } = useLocale();
  const place = line.kind === "place";
  const away = line.kind === "linkedin" ? AWAY : {};
  // The LinkedIn row shows words rather than its address now, so what a cursor
  // takes from it is the address underneath them.
  const target = line.kind === "linkedin" ? line.href : line.value;
  const latin = !RTL.test(line.value);

  const glyph = <Icon name={GLYPH[line.kind]} className={`${STROKE} ${place ? "stroke-soft" : "stroke-ink"}`} />;

  const body = (
    <>
      <span className="flex-none text-[0.88rem] text-soft">{line.label}</span>
      <span className="relative ms-auto flex min-w-0 items-center justify-end">
        <span
          className="flex min-w-0 transition-opacity duration-(--dur-fast) ease-page
            data-[gone=true]:opacity-0"
          data-gone={copied}>
          <span className="truncate text-[0.95rem] text-ink md:text-[1rem]" dir={latin ? "ltr" : undefined}>
            {line.value}
          </span>
        </span>
        <span
          className="absolute inset-y-0 inset-e-0 flex items-center text-[0.95rem] font-semibold text-accent
            opacity-0 transition-opacity duration-(--dur-fast) ease-page shown:opacity-100"
          data-shown={copied}
          aria-hidden={!copied}>
          {content.contacts.copied}
        </span>
      </span>
    </>
  );

  // Nowhere to go and nothing to copy: a fact, drawn as one.
  if (place) {
    return (
      <p className={`${ROW} cursor-default`} style={style}>
        {body}
        <span className={MARK}>{glyph}</span>
      </p>
    );
  }

  // A finger goes where the row goes, and the glyph rides inside that one link
  // rather than becoming a second, smaller one within it.
  if (!fine) {
    return (
      <a className={`${ROW} no-underline`} style={style} href={line.href} {...away}>
        {body}
        <span className={MARK}>{glyph}</span>
      </a>
    );
  }

  return (
    <div className={ROW} style={style}>
      <button
        type="button"
        className="absolute inset-0 cursor-pointer border-0 bg-transparent"
        aria-label={`${line.label}: ${line.value}`}
        onClick={() => onCopy(line.kind, target)}
      />
      {body}
      <a
        className={`${SIDE} relative`}
        href={line.href}
        aria-label={
          line.kind === "phone"
            ? content.contacts.call
            : line.kind === "email"
              ? content.contacts.mail
              : content.contacts.profile
        }
        {...away}>
        {glyph}
      </a>
      {/* Never on screen by default: it is for a recruiter who wants to take
          the profile away with them, and the rest of the time it is noise. It
          answers focus anywhere in the row, because the row is no longer the
          one focusable thing in itself. */}
      {line.kind === "linkedin" && (
        <QrCode
          className="pointer-events-none absolute bottom-full inset-e-0 mb-2 size-28 rounded-glass
            border border-hair bg-page p-1 text-ink opacity-0
            transition-opacity duration-(--dur-fast) ease-page
            group-hover:opacity-100 group-focus-within:opacity-100"
          text={line.href}
          label={content.contacts.qr}
        />
      )}
    </div>
  );
}
