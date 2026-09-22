import {
  Briefcase,
  CircleQuestionMark,
  FileText,
  GraduationCap,
  House,
  type LucideIcon,
  Mail,
  MessageSquareQuote,
  Sparkles,
  Star,
  Wrench
} from "lucide-react";
import type { StageSectionId } from "@/content";

/**
 * One glyph per section, for the places a section is named without room for
 * its name — today that is the header's compact menu, where ten section names
 * do not fit across a phone.
 *
 * It sits here rather than in the header because it is a fact about the
 * SECTIONS, in the same folder as the list of them, and because the header is
 * deliberately kept from knowing which ids exist: it is handed links, and the
 * glyph travels with the link like the label does.
 *
 * They are lucide's, not the hand-drawn set in `common/ui/Icon`: ten glyphs
 * drawn by hand to one stroke weight is ten chances to draw one badly, and the
 * stroke every icon in the bar is given is a class rather than the file it
 * came from — see `Header/utils/classes.ts`.
 */
export const SECTION_GLYPHS: Record<StageSectionId, LucideIcon> = {
  opening: House,
  summary: FileText,
  experience: Briefcase,
  skills: Wrench,
  education: GraduationCap,
  strengths: Star,
  recommendations: MessageSquareQuote,
  faq: CircleQuestionMark,
  contacts: Mail,
  closing: Sparkles
};
