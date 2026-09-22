import type { CSSProperties, ReactNode } from "react";
import { Emerging } from "@/common/utils/emerge";

export interface EmergeProps {
  children: ReactNode;
  shown: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * A block making the page's one entrance: out of its own centre, slowly. It
 * tells the lines under it not to repeat it. See `README.md`.
 */
export function Emerge({ children, shown, className, style }: EmergeProps) {
  return (
    <div
      className={[
        "origin-center scale-[0.92] opacity-0",
        "transition-[opacity,scale] duration-(--dur-reveal) ease-page",
        "shown:scale-100 shown:opacity-100",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      data-shown={shown}
      style={style}>
      <Emerging.Provider value={true}>{children}</Emerging.Provider>
    </div>
  );
}
