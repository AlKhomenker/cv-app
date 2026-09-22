import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A label, not a control: a technology beside a role, a tool in the skills
 * list. It is read and never touched, which is why it is a badge and not a
 * small button — a 44px control standing in for a word would be the biggest
 * thing on the card it sits on.
 *
 * `topic` is section 4's five hues. The component does not know that the third
 * one is the violet: the caller sets `data-topic` and `theme.css` answers with
 * `--wash` and `--line`, so there is one number per topic there and not
 * fifteen here.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border leading-[1.6] transition-[color,background-color,border-color] duration-(--dur-fast) ease-page [&_svg]:pointer-events-none [&_svg]:size-3",
  {
    variants: {
      variant: {
        glass: "border-hair bg-glass text-soft",
        topic: "border-[color:var(--line)] bg-[color:var(--wash)] text-ink",
        accent: "border-accent text-accent"
      },
      size: {
        default: "px-2.5 py-0.5 text-[0.76rem]",
        lg: "px-3 py-1 text-[0.82rem]"
      }
    },
    defaultVariants: { variant: "glass", size: "default" }
  }
);

export interface BadgeProps extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export function Badge({ className, variant, size, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { badgeVariants };
