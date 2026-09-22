import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * One line to type in. Glass like everything else, with the field's own radius
 * — a box to type in is a different shape from a surface to read off, which is
 * why `--radius-field` exists beside `--radius-glass`.
 *
 * `aria-invalid` is what turns it red, not a prop. The form already says which
 * fields are wrong for the screen reader, and a second flag for the same fact
 * is one that can disagree with the first.
 */
export function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        // 48px tall and 16px type. Anything smaller and iOS zooms the whole
        // page the moment the field takes focus.
        "min-h-12 w-full min-w-0 rounded-field border border-hair bg-glass px-3.5 py-2.5",
        "font-sans text-[16px] text-ink",
        "backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-sat)",
        "placeholder:text-faint",
        "transition-[border-color,box-shadow] duration-(--dur-fast) ease-page",
        "hover:border-accent/60 focus-visible:border-accent",
        "aria-invalid:border-warn",
        "disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
      {...props}
    />
  );
}
