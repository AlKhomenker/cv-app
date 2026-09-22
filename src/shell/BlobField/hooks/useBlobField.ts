import { type RefObject, useEffect, useRef } from "react";
import { motionMs } from "@/common/utils/motionTokens";
import { useTheme } from "@/theme";
import { CALM_EASE, CALM_RATE, calmed } from "../utils/calm";
import { readBurst } from "../utils/dispersal";
import { paintField } from "../utils/paint";
import { BLOB_PALETTE, mixPalette, type Rgb } from "../utils/palette";
import { ease, hasFinePointer } from "../utils/pointer";

/**
 * The field is drawn far below the viewport's resolution and stretched back
 * up. Upscaling is most of the blur, which means the expensive part — a
 * `blur()` over a full-screen surface every frame — is paid once by the
 * compositor in CSS instead of by the 2D context in JavaScript.
 */
const RESOLUTION = 0.32;

/**
 * The longest the field's clock moves in one frame, in seconds. A tab in the
 * background stops being sent frames, and without a ceiling the field would
 * jump by however long the reader was elsewhere on its way back.
 */
const MAX_STEP = 0.05;

interface FieldState {
  pointerX: number;
  pointerY: number;
  targetX: number;
  targetY: number;
  /** The palette being left, the one arriving, and when the change started. */
  from: readonly Rgb[];
  to: readonly Rgb[];
  mixStart: number;
  mixDuration: number;
  /**
   * The field's OWN clock, in seconds, integrated a frame at a time rather
   * than read off the wall clock.
   *
   * Calm slows the field down, and a rate applied to elapsed time moves every
   * sine's phase at once — the whole picture would jump the moment a section
   * asked for quiet. Adding `elapsed × rate` per frame changes how fast the
   * clock runs and never where it is.
   */
  clock: number;
  last: number;
  /** Where the quiet is now, and where it is being asked to go. */
  calm: number;
  calmTarget: number;
}

function createState(palette: readonly Rgb[], calm: number): FieldState {
  return {
    pointerX: 0,
    pointerY: 0,
    targetX: 0,
    targetY: 0,
    from: palette,
    to: palette,
    mixStart: 0,
    mixDuration: 0,
    clock: 0,
    last: 0,
    calm,
    calmTarget: calm
  };
}

function progress(state: FieldState, now: number): number {
  if (state.mixDuration <= 0) return 1;
  return Math.min(1, (now - state.mixStart) / state.mixDuration);
}

/**
 * Runs the background field on the canvas it is handed: the chaotic pulse, the
 * lean toward the pointer, the quietening a section can ask for, the palette
 * cross-fade on a theme change, and the resize.
 */
export function useBlobField(canvasRef: RefObject<HTMLCanvasElement | null>, calm: number): void {
  const { theme } = useTheme();
  const stateRef = useRef<FieldState | null>(null);
  const drawRef = useRef<(() => void) | null>(null);

  stateRef.current ??= createState(BLOB_PALETTE[theme], calm);

  // The loop is outside React and reads the target off the state it owns, so
  // a section asking for quiet must not re-run the effect below — restarting
  // it would reset the clock and jump the picture.
  useEffect(() => {
    const state = stateRef.current;
    if (state) state.calmTarget = calm;
  }, [calm]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;

    const resize = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * RESOLUTION));
      canvas.height = Math.max(1, Math.round(window.innerHeight * RESOLUTION));
    };

    const draw = () => {
      const now = performance.now();
      const elapsed = Math.min((now - state.last) / 1000, MAX_STEP);
      state.last = now;
      state.calm = ease(state.calm, state.calmTarget, CALM_EASE);
      state.clock += elapsed * calmed(state.calm, CALM_RATE);
      state.pointerX = ease(state.pointerX, state.targetX);
      state.pointerY = ease(state.pointerY, state.targetY);
      paintField(context, {
        width: canvas.width,
        height: canvas.height,
        time: state.clock,
        pointerX: state.pointerX,
        pointerY: state.pointerY,
        from: state.from,
        to: state.to,
        mix: progress(state, now),
        calm: state.calm,
        // Read per frame rather than passed in. The closing section writes it
        // on every wheel event, and a prop would re-render the page under the
        // canvas sixty times a second to move forty-eight blobs.
        burst: readBurst()
      });
    };

    const onResize = () => {
      resize();
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      state.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      state.targetY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    state.mixDuration = motionMs("--dur");
    state.last = performance.now();
    drawRef.current = draw;
    resize();
    window.addEventListener("resize", onResize, { passive: true });

    const tick = () => {
      draw();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const fine = hasFinePointer();
    if (fine) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      drawRef.current = null;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      if (fine) window.removeEventListener("pointermove", onPointerMove);
    };
  }, [canvasRef]);

  // A theme change starts a cross-fade from whatever is on screen — not from
  // the palette it was heading for, so a second toggle mid-fade cannot jump.
  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;

    const next = BLOB_PALETTE[theme];
    if (state.to === next) return;

    const now = performance.now();
    state.from = mixPalette(state.from, state.to, progress(state, now));
    state.to = next;
    state.mixStart = now;

    if (state.mixDuration <= 0) drawRef.current?.();
  }, [theme]);
}
