export interface GradientRingProps {
  /** Room for a thicker ring (`p-0.5`) or a different reach (`-inset-0.5`). */
  className?: string;
}

/**
 * A gradient painted as a border and as nothing else: still, always on, and
 * not a control's answer to anything.
 *
 * It is the quiet half of {@link ../BeamButton}. That one is a BEAM — a lit
 * arc that travels, under the hand and never otherwise. This is a BORDER: a
 * closed turn through the page's four hues, which is why it reads as the
 * edge of a surface rather than as something happening to one.
 *
 * Two things are asked of whatever it is dropped into, and both are what its
 * `-inset-px` means: the parent is POSITIONED, and its border is one pixel.
 * An absolutely positioned child is sized to its parent's padding box, so one
 * pixel out on every side is exactly the border box, and `p-px` inside
 * `mask-ring` leaves exactly that one pixel of border and nothing else.
 *
 * The parent keeps its hairline. This paints over it, opaque, so the two are
 * never seen together — but where `mask-composite` is missing the ring is not
 * drawn at all, and then the hairline is the border, which is the whole point
 * of leaving it there.
 */
export function GradientRing({ className }: GradientRingProps) {
  return (
    <span
      className={[
        "mask-ring pointer-events-none absolute -inset-px rounded-[inherit] p-px bg-(image:--ring-paint)",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    />
  );
}
