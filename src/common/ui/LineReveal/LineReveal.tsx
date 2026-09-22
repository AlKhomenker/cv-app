import { type ReactNode, useContext, useEffect, useState } from "react";
import { useAfterPaint } from "@/common/hooks/useAfterPaint";
import { Emerging } from "@/common/utils/emerge";

export interface LineRevealProps {
  children: ReactNode;
  shown: boolean;
  className?: string;
}

/**
 * A line of text making the page's one entrance, as keyframes. Under an
 * `Emerge` it draws plainly and lets the block carry it. See `README.md`.
 */
export function LineReveal({ children, shown, className }: LineRevealProps) {
  const carried = useContext(Emerging);
  const armed = useAfterPaint();
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (shown) setPlayed(true);
  }, [shown]);

  if (carried)
    return <span className={["inline-block max-w-full", className].filter(Boolean).join(" ")}>{children}</span>;

  const state = !armed || (!shown && !played) ? undefined : shown ? "in" : "out";

  return (
    <span
      className={[
        "inline-block max-w-full origin-center scale-[0.92] opacity-0",
        "data-[state=in]:animate-line-in data-[state=out]:animate-line-out",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      data-state={state}>
      {children}
    </span>
  );
}
