import type { Role } from "@/content";
import { RoleBody } from "./RoleBody";

export interface RoleListProps {
  roles: readonly Role[];
}

/**
 * The same six roles with nothing moving: a plain column, every one of them
 * open, and no rail beside it.
 *
 * It is what a reader who has asked for less movement gets INSTEAD of the
 * timeline, not the timeline with its animation switched off. A timeline's
 * whole meaning is that it moves; standing still it is one card with five off
 * the screen, which is worse than a list and not better.
 *
 * The column is longer than the screen, so it scrolls — and the stage hands
 * it the gesture until it reaches the end, which is what
 * `Stage/utils/scrollers.ts` is for. It is a tab stop for the same reason: a
 * region a keyboard cannot scroll is one nobody can read.
 */
export function RoleList({ roles }: RoleListProps) {
  return (
    <ol
      className="grid h-full content-start gap-4 overflow-y-auto overscroll-contain
        px-(--gutter) pt-[calc(var(--header-h)+16px)] pb-10 md:px-10"
      tabIndex={0}>
      {roles.map((role) => (
        <li
          key={role.id}
          className="mx-auto flex w-full max-w-170 flex-col rounded-3xl border border-hair
            bg-glass-strong p-[clamp(18px,4.6vw,30px)]
            shadow-[inset_0_1px_0_var(--glass-edge),var(--glass-drop)]">
          <RoleBody role={role} full />
        </li>
      ))}
    </ol>
  );
}
