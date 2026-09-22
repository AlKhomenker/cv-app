/**
 * The door to the content. Everything a person reads comes from here, and the
 * components below name a locale only through {@link useLocale}.
 */
import { en } from "./en";
import { he } from "./he";
import type { Direction, Locale, LocaleContent } from "./types";

export const CONTENT: Record<Locale, LocaleContent> = { en, he };

/** Reading direction per locale. Nothing else in the app names a direction. */
export const DIRECTION: Record<Locale, Direction> = { en: "ltr", he: "rtl" };

export type {
  Award,
  CardGlyph,
  ContactKind,
  ContactLine,
  Direction,
  FieldName,
  FormField,
  Locale,
  LocaleContent,
  Question,
  Recommendation,
  Role,
  RoleDate,
  SkillFilterWords,
  SkillGroup,
  StageSectionId,
  Strength,
  Study,
  SummaryBlock,
  ValidatedField
} from "./types";
