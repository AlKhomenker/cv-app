/**
 * The shape of one locale. `en.ts` is written against it and `he.ts` is too,
 * so a line that exists in one language and not the other does not compile.
 *
 * Nothing here is a colour, a size or a behaviour — this file describes WORDS
 * and the facts that travel with them (a rating, a URL, a field's input type).
 */

export type Locale = "en" | "he";
export type Direction = "ltr" | "rtl";

/**
 * Every section of the page, in the order the stage steps through them.
 *
 * It used to grow by one name per rewritten section, against a second list of
 * the ones still in a scrolling document below. That list is empty now and the
 * type behind it is gone: there is one page and this is all of it.
 */
export type StageSectionId =
  | "opening"
  | "summary"
  | "experience"
  | "skills"
  | "education"
  | "strengths"
  | "recommendations"
  | "faq"
  | "contacts"
  | "closing";

/** One block of the summary — a sentence or two, read at the card's centre. */
export interface SummaryBlock {
  /** Stable across locales: it keys the strip, not the words. */
  id: string;
  /**
   * The sentence, with two marks in it.
   *
   * `{share}` is where the one accent — the share of client pull requests
   * reviewed — is written in. `[[like this]]` marks a Latin run that must keep
   * its own `dir="ltr"`, which is why only the Hebrew carries any: a run of
   * Latin inside Latin needs no isolating, and `.NET`, `C#` and a percentage
   * inside Hebrew come out with their punctuation on the wrong end without it.
   * `sections/Summary/utils/runs.ts` is what reads both.
   */
  text: string;
}

export interface SkillGroup {
  /**
   * Stable across locales: it keys the topic and its hue, not the words. Five
   * of them, and the order below is the order the rows are drawn in and the
   * order the badges arrive in.
   */
  id: string;
  label: string;
  /**
   * The tools' own names, Latin in every locale and rendered `dir="ltr"`.
   * They are repeated per locale rather than shared because the locale file
   * is the whole of one language's content, and a list assembled from two
   * places is a list that can be half translated.
   */
  items: string[];
}

/**
 * The words on the one control section 4 has: the combobox under its title
 * that picks which tools are lit.
 *
 * `chosen` is "{count} chosen" as ONE sentence per locale with the number put
 * into it, never a number with a word glued on the end — the same rule the
 * rating line follows, and for the same reason.
 */
export interface SkillFilterWords {
  /** Names the field, and is what is written in it while it is empty. */
  label: string;
  /** "{count} chosen", beside the field once something has been picked. */
  chosen: string;
  /** What stands in the list when nothing in it answers to what was typed. */
  empty: string;
  /** The control that puts every tool back on. */
  clear: string;
}

export interface Strength {
  label: string;
  /** Out of five. Drawn as marks, and read out by a screen reader as words. */
  rating: number;
}

/**
 * A month of a year, as the two numbers it is: `month` is 1 to 12, counted the
 * way a person counts them rather than the way `Date` does.
 *
 * It is not a `Date`. Nothing here is a moment — a role started in a month,
 * and a `Date` would add a day, an hour and a time zone that the content does
 * not know and that would move the month across a boundary somewhere in the
 * world.
 */
export interface RoleDate {
  year: number;
  /** 1 to 12. */
  month: number;
}

export interface Role {
  /** Stable across locales: it keys the track and the rail, not the words. */
  id: string;
  role: string;
  company: string;
  /**
   * The company's own page on LinkedIn, which an opened role links its name
   * to. It is a URL and not a word, so it is the same string in both locales
   * — like a recommendation's `url` and a contact's `href`, which are kept
   * beside the words they belong to for the same reason: a role is read in
   * one place and not assembled out of two.
   */
  companyUrl: string;
  place: string;
  /**
   * When it started and when it ended, as NUMBERS rather than as the sentence
   * they are written into.
   *
   * The card sets the start YEAR alone in the accent colour and the span
   * beside it is built out of both dates in full — two readings of one fact,
   * which a locale string could not give. `end` is null while the role is
   * running, and that is also the only definition of a current role: a
   * `current` flag beside it would be a second source for the same thing, and
   * the two can disagree.
   *
   * A date is one object and not a year with a month beside it, for that same
   * reason: `end: null` says the role is running, and a stray `endMonth` next
   * to it would be a month belonging to a date that does not exist.
   */
  start: RoleDate;
  end: RoleDate | null;
  /** Skill tags this role used — the same Latin strings the tag list renders. */
  tech: string[];
  bullets: string[];
  stack: string;
}

/** One of the two schools, as one panel of section 5. */
/**
 * Which shape is set into a card's picture.
 *
 * One list for both kinds, because a school's card and a prize's card are the
 * same card — see `sections/Education/README.md`. The first two are the
 * schools, the last three the prizes.
 */
export type CardGlyph = "code" | "compass" | "crown" | "brush" | "mask";

export interface Study {
  /** Stable across locales: it keys the card and seeds its picture. */
  id: string;
  glyph: CardGlyph;
  school: string;
  /** What was studied. Set in italic, which is the one line that is. */
  degree: string;
  body: string;
}

export interface Award {
  /** Stable across locales: it keys the card and seeds its picture. */
  id: string;
  glyph: CardGlyph;
  name: string;
  /** What was won. The line under the name, and never a sentence. */
  result: string;
  body: string;
}

export interface Recommendation {
  /** Stable across locales, and the card's key: the names are not unique. */
  id: string;
  name?: string;
  initials: string;
  role: string;
  /** How we worked together. Empty when there is nothing to say. */
  relation: string;
  url: string;
}

/**
 * Every field the form checks — which is now every field it has. `linkedin` is
 * the one that may be left empty; its rule only applies to what was typed, so
 * it still belongs to this list rather than beside it.
 */
export type ValidatedField = "name" | "company" | "phone" | "linkedin" | "message";
export type FieldName = ValidatedField;

export interface FormField {
  name: FieldName;
  label: string;
  type: "text" | "tel" | "url" | "textarea";
  /** Drawn on the label, and never the rule — `utils/validation.ts` holds that. */
  required: boolean;
  rows?: number;
  inputmode?: string;
  autocomplete?: string;
}

export interface Question {
  q: string;
  a: string;
}

/**
 * What a contact row IS, which decides everything else about it: the shape of
 * its value, where a tap goes, whether a cursor copies it instead, and whether
 * it is a control at all. A row never carries a flag the kind already answers.
 */
export type ContactKind = "phone" | "email" | "linkedin" | "place";

export interface ContactLine {
  kind: ContactKind;
  label: string;
  value: string;
  /** Where a tap goes on a touch screen. Empty for the one that goes nowhere. */
  href: string;
}

export interface LocaleContent {
  docTitle: string;
  toggle: { glyph: string; label: string };
  /** The theme control. The label names the theme it switches TO. */
  theme: { toLight: string; toDark: string };
  /** The stage sections, by the names the header puts in its row. */
  sections: Record<StageSectionId, string>;
  person: { name: string; role: string; tagline: string };
  ui: {
    skip: string;
    menu: string;
    loading: string;
    /** The word on every control that shuts something that fills the screen. */
    close: string;
    /** The word beside a running role's span, next to the live dot. */
    present: string;
    /** "{label}: {rating} out of 5" — one sentence per locale, never joined. */
    rating: string;
  };
  /** The opening shows the person's own lines; these are its two controls. */
  opening: { write: string; download: string };
  /**
   * Section 2. Four blocks that pass through one card as the reader scrolls,
   * and the single number set in the accent colour inside them.
   */
  summary: { title: string; share: string; blocks: SummaryBlock[] };
  /**
   * Section 4. Five rows of badges, one row per topic, each badge arriving on
   * its own as the reader scrolls, and one combobox over them that picks which
   * of the tools are lit. Nothing else in the section is a control: a badge is
   * a fact about the CV, and `filter` is the whole of what can be pressed.
   */
  skills: { title: string; filter: SkillFilterWords; groups: SkillGroup[] };
  /**
   * Section 6. Eight strengths scored out of five, and the languages they
   * are exercised in — one section, because they are one answer.
   */
  strengths: { title: string; items: Strength[] };
  /**
   * Section 3. Six roles on a timeline, one of them on the reading line at a
   * time, each opening to fill the screen. `open` and `close` are the two
   * controls.
   */
  /** `companyLink` is "{company} on LinkedIn" — the name a link gets read by. */
  experience: { title: string; stackLabel: string; open: string; companyLink: string; items: Role[] };
  /** The named group inside section 6, and the three names under it. */
  languages: { title: string; items: string[] };
  /**
   * Section 5. A fanned deck of cards — one per school and one per prize —
   * dealt through by the scroll or by the two carousel controls. `prev` and
   * `next` name those two.
   *
   * `studiesTitle` and `awardsTitle` are the kicker at the head of a card's
   * words. They are the only thing left saying which of the two a card is,
   * now that the two are printed identically.
   */
  education: {
    title: string;
    prev: string;
    next: string;
    studiesTitle: string;
    studies: Study[];
    awardsTitle: string;
    awards: Award[];
  };
  /**
   * Section 8. Four people who will vouch for the work, each card a link to
   * their profile. `cta` is the words on that link.
   */
  recommendations: { title: string; lede: string; cta: string; items: Recommendation[] };
  contact: {
    title: string;
    lede: string;
    submit: string;
    sending: string;
    fields: FormField[];
    errors: Record<ValidatedField, string>;
    mailtoNotice: string;
    mailtoSubject: string;
    success: string;
    failure: string;
    failureLink: string;
  };
  /** Section 7. Seven questions, one answer open at a time. */
  faq: { title: string; items: Question[] };
  /**
   * Section 6. Four rows and one button. `copied` is what a row says for a
   * moment after a cursor has taken its value; `call`, `mail` and `profile`
   * name the three small controls that still open the dialler, the mail app
   * and the profile.
   */
  contacts: {
    title: string;
    items: ContactLine[];
    copied: string;
    call: string;
    mail: string;
    profile: string;
    /** What the QR code is, for a reader who cannot see it. */
    qr: string;
  };
  /**
   * Section 7. Two lines and nothing else — the thanks, and the note under it.
   *
   * The two controls beneath them carry no words of their own: they are
   * {@link LocaleContent.opening}'s pair, because the last screen offers
   * exactly the two things the first one did, and a second wording of them is
   * a second thing to keep in step.
   */
  closing: { thanks: string; references: string };
}
