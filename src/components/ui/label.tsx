import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A field's name. Radix's label rather than a bare `<label>` for the one thing
 * it adds: a press on it does not select the text of the label, which is what
 * a native label does on a double tap and what makes a form feel broken on a
 * phone.
 */
export function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "flex select-none items-center gap-1 text-[0.82rem] font-semibold text-soft",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
