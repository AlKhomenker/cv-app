import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A list of questions where one answer stands open at a time.
 *
 * Radix owns the part that was hand-rolled here: which item is open, the
 * roving heading/button/region markup, `aria-expanded`, and the height
 * animation, which it drives from `--radix-accordion-content-height` — a
 * measured pixel value, so the answer opens to its own height rather than to a
 * `max-height` guess that either clips a long answer or dawdles on a short one.
 *
 * The chevron reads its state through `group-data-[state=open]` rather than
 * being told: the trigger already says `aria-expanded`, and a second source for
 * the same fact is one that can be wrong.
 */
export function Accordion({ ...props }: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-hair last:border-b-0", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          // Deliberately unopinionated about family and size: the FAQ sets its
          // own, paced off the viewport, and a base that fought it would be two
          // font-size rules whose winner is an emit order.
          "group flex flex-1 cursor-pointer items-center justify-between gap-2 py-4 text-start font-semibold",
          "text-ink transition-colors duration-(--dur-fast) ease-page",
          "hover:text-accent aria-expanded:text-accent",
          className
        )}
        {...props}>
        {children}
        <ChevronDown
          className="mt-0.5 size-5 flex-none text-soft transition-transform duration-(--dur) ease-page
            group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden
        data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}>
      <div className={cn("pb-4 text-[0.95rem] leading-[1.6] text-soft", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
