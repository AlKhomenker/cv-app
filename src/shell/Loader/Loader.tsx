import { useEffect, useRef } from "react";
import { useLocale } from "@/i18n";
import { useLoadProgress } from "./hooks/useLoadProgress";

export interface LoaderProps {
  /** Called once, when the page has finished arriving. */
  onLoaded: () => void;
}

/**
 * The bar the page arrives behind. It covers everything until the webfonts and
 * every other resource are in, then fades, and the opening makes its entrance
 * into the space it leaves.
 */
export function Loader({ onLoaded }: LoaderProps) {
  const { content } = useLocale();
  const railRef = useRef<HTMLDivElement>(null);
  const done = useLoadProgress(railRef);

  useEffect(() => {
    if (done) onLoaded();
  }, [done, onLoaded]);

  return (
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-page px-(--gutter)
        transition-opacity duration-(--dur) ease-page
        done:pointer-events-none done:opacity-0"
      data-done={done}
      data-print="hide"
      role="progressbar"
      aria-label={content.ui.loading}>
      <div
        ref={railRef}
        className="h-0.5 w-[min(220px,60vw)] overflow-hidden rounded-full bg-line">
        {/* `inline-size`, not a transform: it fills from the leading edge in
            both reading directions without a rule that names a side. */}
        <div
          className="h-full rounded-[inherit]
            w-[calc(var(--progress,0)*100%)]
            bg-[linear-gradient(to_right,var(--beam-2),var(--beam-3),var(--beam-1),var(--beam-4))]"
        />
      </div>
    </div>
  );
}
