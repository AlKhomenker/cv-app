import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * The page's button, as a shadcn component: CVA for the variants, `Slot` for
 * `asChild`, `cn` so a caller's class wins.
 *
 * It is styled on THIS app's tokens and not on shadcn's. The generator's
 * palette — `--background`, `--primary`, `--muted`, `--border` — would be a
 * second colour source beside `theme.css`, and one of its names collides
 * outright: shadcn spends `accent` on a hover surface, and here the accent is
 * the page's blue. Copied-in components are meant to be edited, so they are.
 *
 * `beam` is the variant the whole page is built on and the reason this file is
 * not the generator's output verbatim. At rest it is an ordinary glass pill
 * with a hairline; under the hand a beam of the background's own four hues
 * travels around its border with a coloured bloom spilling off it.
 */
const buttonVariants = cva(
  [
    "group relative isolate inline-flex cursor-pointer items-center justify-center gap-2",
    "whitespace-nowrap font-semibold",
    "transition-[border-color,color,scale,translate] duration-(--dur) ease-page",
    "disabled:cursor-progress disabled:text-soft",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      variant: {
        beam: [
          "rounded-glass border border-hair bg-glass",
          "backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-sat)",
          "shadow-[inset_0_1px_0_var(--glass-edge)]",
          // Declared always and only running under the hand. Pausing rather
          // than removing is what makes the beam resume from where it stopped
          // instead of snapping back to nought as the pointer leaves — and a
          // paused animation costs nothing a frame, which matters on a page
          // already running a canvas.
          "animate-beam [animation-play-state:paused]",
          "hover:[animation-play-state:running] focus-visible:[animation-play-state:running]",
          "hover:border-transparent focus-visible:border-transparent",
          "hover:[translate:0_-2px] focus-visible:[translate:0_-2px]",
          "active:[translate:0_0] active:scale-[0.985]"
        ].join(" "),
        /** A glyph in a circle: the close controls, the carousel's two ends. */
        icon: [
          "rounded-round border border-hair bg-glass text-ink",
          "backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-sat)",
          "shadow-[inset_0_1px_0_var(--glass-edge)]",
          "hover:border-accent",
          "disabled:cursor-default disabled:opacity-35 disabled:hover:border-hair"
        ].join(" "),
        /** No surface at all: a word that behaves like a control. */
        ghost: "rounded-glass border border-transparent bg-transparent hover:text-accent"
      },
      /**
       * What the label is set in. Glass everywhere but the closing section,
       * where the download is the one thing left on the last screen still
       * asking to be pressed and takes the accent to say so.
       */
      tone: {
        glass: "text-ink",
        accent: "text-accent"
      },
      size: {
        default: "min-h-12 px-6",
        sm: "min-h-10 px-4 text-[0.9rem]",
        icon: "size-10 p-0 md:size-11"
      }
    },
    defaultVariants: {
      variant: "beam",
      tone: "glass",
      size: "default"
    }
  }
);

export interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Reads as a control that is working, not as one that is unavailable. */
  busy?: boolean;
}

export function Button({
  className,
  variant,
  tone,
  size,
  asChild = false,
  busy = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, tone, size }), className)}
      data-busy={busy}
      disabled={disabled || busy}
      {...props}>
      {/*
        Two spans, not one, and both only on the beam. The ring is
        `--beam-paint` cut to the border by `mask-ring`; the bloom is the same
        ring again, thicker, with the blur on a WRAPPER — a filter on the ring
        itself is applied before its own mask and would cut the glow back to
        the edge it came from.

        `Slottable` is what keeps `asChild` working with them: without it the
        slot would be handed three children and not know which one is the
        element it is supposed to become.
      */}
      {variant !== "icon" && variant !== "ghost" && (
        <span
          className="pointer-events-none absolute -inset-px z-[-2] rounded-[inherit]
            opacity-0 blur-(--beam-bloom) transition-[opacity,filter] duration-(--dur) ease-page
            group-hover:opacity-95 group-focus-visible:opacity-95
            group-active:opacity-100 group-active:blur-[calc(var(--beam-bloom)*0.6)]"
          aria-hidden="true">
          <span className="mask-ring absolute inset-0 rounded-[inherit] p-[3px] bg-[image:var(--beam-paint)]" />
        </span>
      )}
      {variant !== "icon" && variant !== "ghost" && (
        <span
          className="mask-ring pointer-events-none absolute -inset-px z-[-1] rounded-[inherit]
            p-[1.5px] bg-[image:var(--beam-paint)]
            opacity-0 transition-opacity duration-(--dur) ease-page
            group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
          aria-hidden="true"
        />
      )}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { buttonVariants };
