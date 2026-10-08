import { useEffect, useRef, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import { drawTrail, type TrailPoint } from './drawTrail';
import styles from './PlaygroundCursor.module.css';

// The dot's diameter; also sets --cursor-size for the CSS. The trail starts
// exactly as wide as the dot and tapers to a tip a quarter of its radius.
const DOT_DIAMETER = 12;
const DOT_RADIUS = DOT_DIAMETER / 2;
const TIP_RATIO = 0.25;
const TIP_RADIUS = DOT_RADIUS * TIP_RATIO;
/* Each position stays in the trail this long, so the tail's length follows
   speed and it retracts into the dot within ~200ms of stopping. */
const TRAIL_LIFETIME_MS = 160;
const MAX_TRAIL_PX = 220;
const PRESS_SQUISH = [{ transform: 'scale(1)' }, { transform: 'scale(0.85)' }, { transform: 'scale(1)' }];
const PRESS_TIMING = { duration: 320, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' };

const CLICKABLE = 'a[href], button, [role="button"], [role="link"], [role="menuitemradio"], label, summary, select';
const TEXT_INPUT = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';
// Set by useCanvasViewport while the canvas is being dragged.
const DRAGGING = '[data-dragging]';

type TimedPoint = TrailPoint & { t: number };

/* Trims the history (newest first) to the trail's lifetime and max length,
   ending on a point interpolated exactly at the cut so the tail end glides
   instead of stepping from sample to sample. */
function trailPath(head: TrailPoint, history: TimedPoint[], now: number) {
  const path: TrailPoint[] = [head];
  let length = 0;
  let previous: TrailPoint = head;
  let previousAge = 0;
  for (const point of history) {
    const segment = Math.hypot(point.x - previous.x, point.y - previous.y);
    const age = now - point.t;
    const pastAge = age > TRAIL_LIFETIME_MS;
    const pastLength = length + segment > MAX_TRAIL_PX;
    if (pastAge || pastLength) {
      const byAge = pastAge ? (TRAIL_LIFETIME_MS - previousAge) / Math.max(1, age - previousAge) : 1;
      const byLength = pastLength ? (MAX_TRAIL_PX - length) / Math.max(1, segment) : 1;
      const f = Math.max(0, Math.min(1, byAge, byLength));
      path.push({ x: previous.x + (point.x - previous.x) * f, y: previous.y + (point.y - previous.y) * f });
      return path;
    }
    path.push(point);
    length += segment;
    previous = point;
    previousAge = age;
  }
  return path;
}

/* The playground's own cursor: a red dot that tracks the pointer exactly,
   with a tapered trail (drawn on one canvas) that lags behind it. Mounted
   only on fine-pointer devices; hides the native cursor for as long as it
   is mounted, which is only while on /playground. */
export default function PlaygroundCursor() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const squishRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    if (!root || !dot) return;
    const html = document.documentElement;
    html.dataset.playgroundCursor = '';

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d') ?? null;
    if (ctx) ctx.fillStyle = getComputedStyle(root).getPropertyValue('--cursor-trail');
    const head = { x: 0, y: 0 };
    let history: TimedPoint[] = [];
    let frame = 0;

    function sizeCanvas() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = getComputedStyle(root!).getPropertyValue('--cursor-trail');
    }

    function render() {
      frame = 0;
      if (!ctx) return;
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const path = trailPath(head, history, now);
      drawTrail(ctx, path, DOT_RADIUS, TIP_RADIUS);
      // Keep one expired point to interpolate the tail end against.
      const firstExpired = history.findIndex((point) => now - point.t > TRAIL_LIFETIME_MS);
      if (firstExpired !== -1) history = history.slice(0, firstExpired + 1);
      // Keeps running while the tail is retracting; idles once it's gone.
      if (firstExpired === 0) history = [];
      else frame = requestAnimationFrame(render);
    }

    function setFlag(name: string, on: boolean) {
      if (on) root!.dataset[name] = '';
      else delete root!.dataset[name];
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return;
      head.x = event.clientX;
      head.y = event.clientY;
      dot!.style.transform = `translate3d(${head.x}px, ${head.y}px, 0)`;
      setFlag('visible', true);
      const target = event.target instanceof Element ? event.target : null;
      setFlag('dragging', !!target?.closest(DRAGGING));
      if (!ctx) return;
      // Coalesced samples fill in fast flicks so the curve never steps.
      const samples = event.getCoalescedEvents?.() ?? [];
      for (const sample of samples.length ? samples : [event]) {
        history.unshift({ x: sample.clientX, y: sample.clientY, t: sample.timeStamp });
      }
      if (!frame) frame = requestAnimationFrame(render);
    }

    // Only fires when the element under the pointer changes.
    function handlePointerOver(event: PointerEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const overText = !!target?.closest(TEXT_INPUT);
      setFlag('text', overText);
      setFlag('hovering', !overText && !!target?.closest(CLICKABLE));
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return;
      squishRef.current?.animate(PRESS_SQUISH, PRESS_TIMING);
    }

    // Leaving the window hides it; the next move places it before fading back in.
    function handleMouseOut(event: MouseEvent) {
      if (event.relatedTarget) return;
      setFlag('visible', false);
      history = [];
    }

    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      cancelAnimationFrame(frame);
      delete html.dataset.playgroundCursor;
      window.removeEventListener('resize', sizeCanvas);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [reducedMotion]);

  return createPortal(
    <div
      ref={rootRef}
      className={styles.root}
      style={{ '--cursor-size': `${DOT_DIAMETER}px` } as CSSProperties}
      aria-hidden="true"
    >
      {!reducedMotion && <canvas ref={canvasRef} className={styles.trail} />}
      <div ref={dotRef} className={styles.position}>
        <div ref={squishRef} className={styles.squish}>
          <div className={styles.dot} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
