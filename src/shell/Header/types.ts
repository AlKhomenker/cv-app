import type { LucideIcon } from "lucide-react";

export interface HeaderLink {
  /** A section id. The header does not know or care which kind it is. */
  id: string;
  label: string;
  /**
   * The same link with no room for its name — what the compact menu draws.
   * It travels WITH the link for the same reason the label does: the header
   * is handed a list, never a set of ids to look anything up by.
   */
  icon: LucideIcon;
  current: boolean;
}
