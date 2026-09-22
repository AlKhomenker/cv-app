import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { type ComponentProps, createContext, type KeyboardEvent, use, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Derived from the hook rather than imported from `embla-carousel`, which is a
// transitive package this app does not depend on directly. It is what shadcn's
// own carousel does, and it keeps the option types in step with the version
// actually installed.
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselApi = UseEmblaCarouselType[1];

export interface CarouselProps {
  opts?: UseCarouselParameters[0];
  plugins?: UseCarouselParameters[1];
  orientation?: "horizontal" | "vertical";
  /** Hands the carousel's own api out, for a section that draws from it. */
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextValue extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  /** Where the carousel is between its snaps, 0 to `count - 1`. */
  line: number;
  count: number;
  selected: number;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel(): CarouselContextValue {
  const context = use(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

/**
 * shadcn's carousel, over Embla, with one thing added: a continuous **line**.
 *
 * The generator's version publishes `selectedScrollSnap` — an integer, which
 * is all a slider needs. Section 5 is a fanned deck whose every card is placed
 * by its distance from the reading position, so it needs the value BETWEEN two
 * snaps as well. `line` is Embla's own `scrollProgress` put back on the scale
 * the snaps are counted in, so it is the carousel's own reading of where it
 * is, not a second one kept beside it.
 *
 * Keyboard is Embla's and the buttons': the stage owns the wheel, and a
 * carousel that also answered it would be two things moving on one gesture.
 */
export function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [line, setLine] = useState(0);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;

    const read = () => {
      const snaps = api.scrollSnapList();
      setCount(snaps.length);
      setSelected(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      // `scrollProgress` is 0 to 1 across the whole track. Multiplied by the
      // gaps between snaps it becomes the same number the fan is placed from.
      setLine(api.scrollProgress() * Math.max(1, snaps.length - 1));
    };

    read();
    api.on("reInit", read).on("select", read).on("scroll", read);
    return () => {
      api.off("reInit", read).off("select", read).off("scroll", read);
    };
  }, [api]);

  return (
    <CarouselContext
      value={{
        carouselRef,
        api,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        line,
        count,
        selected
      }}>
      <div
        className={cn("relative", className)}
        onKeyDownCapture={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        {...props}>
        {children}
      </div>
    </CarouselContext>
  );
}

export function CarouselViewport({ className, children, ...props }: ComponentProps<"div">) {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className={cn("overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

export function CarouselContent({ className, ...props }: ComponentProps<"div">) {
  const { orientation } = useCarousel();
  return <div className={cn("flex", orientation === "vertical" && "flex-col", className)} {...props} />;
}

export function CarouselItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  );
}
