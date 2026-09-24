import { Bot, Code, GitPullRequest, type LucideIcon, Users } from "lucide-react";

/**
 * One mark per block of the summary, keyed by the id the content gives it.
 *
 * The id and not the words: the four blocks are the same four in both
 * languages, and a mark chosen from a sentence would be a mark that changes
 * when the sentence is translated.
 *
 * It is a `Record<string, …>` because a block's id is a plain string in the
 * content — there is no union to be exhaustive against — so the value is
 * optional and a block nobody has drawn a mark for simply has none. That is
 * the whole of the failure case: a new sentence appears in the strip with no
 * glyph over it, rather than the strip not drawing. It is also why this file
 * has to be READ when the summary is rewritten: nothing breaks to tell you,
 * the marks just stop appearing.
 */
const BLOCK_GLYPHS: Record<string, LucideIcon | undefined> = {
  /** Who she is: React and TypeScript over a .NET, C# and Node.js back end. */
  craft: Code,
  /** The reviews, the refactor that was led, and the products owned end to end. */
  impact: GitPullRequest,
  /** The agentic lifecycle: Claude skills, rules, and the standards set. */
  ai: Bot,
  /** Parallel projects run, and junior engineers mentored. */
  lead: Users
};

/** The mark for one block, or null where the content has grown a new one. */
export function blockGlyph(id: string): LucideIcon | null {
  return BLOCK_GLYPHS[id] ?? null;
}
