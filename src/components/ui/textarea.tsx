import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** The same field, taller. Resized by the reader and never by the page. */
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-[124px] w-full min-w-0 resize-y rounded-field border border-hair bg-glass px-3.5 py-2.5",
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
