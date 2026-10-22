import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { MOBILE_WORLD_SCALE, WORLD_HEIGHT, WORLD_WIDTH } from './canvasLayout';
import { MOBILE_QUERY } from '../mobileQuery';

export type PanListener = (dx: number, dy: number) => void;
/* Visible part of the world, in world px. */
export interface WorldView {
  x: number;
  y: number;
  width: number;
  height: number;
}
export type ViewListener = (view: WorldView) => void;

// Matches --pg-glide-duration.
const GLIDE_MS = 400;
// Movement before a press becomes a drag, so clicks on items still work.
const DRAG_THRESHOLD_PX = 4;
const WHEEL_LINE_PX = 16;
const KEY_PAN_PX = 80;
const KEY_PAGE_RATIO = 0.8;
// Momentum: release velocity from the last ~80ms of the drag, decaying by
// this factor per 16ms frame until it drops below the stop speed (px/ms).
const VELOCITY_WINDOW_MS = 80;
const MOMENTUM_FRICTION = 0.92;
const MOMENTUM_STOP = 0.02;
const MAX_MOMENTUM_SPEED = 3;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT', 'VIDEO'].includes(target.tagName))
  );
}

/* Pan over a fixed-size world (WORLD_WIDTH x WORLD_HEIGHT CSS px), at 1:1,
   or at MOBILE_WORLD_SCALE on phones (one fixed scale, never zoomed).
   Inputs update a target view; one rAF writes it as a single transform to
   both layers, so nothing re-renders React per frame, and nothing runs at
   rest.

   - Pan: drag (with gentle momentum on release), wheel / trackpad, and the
     arrow / page keys; always clamped to the world's edges.
   - No zoom: pinch and ctrl/cmd + scroll are swallowed on the canvas so the
     browser doesn't zoom it either. Keyboard page zoom still works.
   - moveTo centres a world point, gliding there (used by the minimap). */
export function useWorldViewport({
  rootRef,
  groundRef,
  contentRef,
  initialFocus,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  groundRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  initialFocus: { x: number; y: number };
}) {
  const panListenersRef = useRef(new Set<PanListener>());
  const viewListenersRef = useRef(new Set<ViewListener>());
  const moveToRef = useRef<(x: number, y: number, animate: boolean) => void>(() => {});
  const initialFocusRef = useRef(initialFocus);
  const readFocusRef = useRef<() => { x: number; y: number }>(() => initialFocusRef.current);

  const subscribePan = useCallback((listener: PanListener) => {
    const listeners = panListenersRef.current;
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const subscribeView = useCallback((listener: ViewListener) => {
    const listeners = viewListenersRef.current;
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const moveTo = useCallback((x: number, y: number, animate = false) => moveToRef.current(x, y, animate), []);
  // The world point at the centre of the screen, to come back to later.
  const readFocus = useCallback(() => readFocusRef.current(), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia(MOBILE_QUERY);
    const worldScale = () => (mobile.matches ? MOBILE_WORLD_SCALE : 1);

    let viewportW = 0;
    let viewportH = 0;
    const view = { x: 0, y: 0, scale: worldScale() };
    let frame = 0;
    let momentumFrame = 0;
    let glideTimer: ReturnType<typeof setTimeout> | undefined;

    /* Clamped to the world's edges. On an axis where the screen is bigger
       than the world, the world is centred instead (the dotted ground runs
       on past it, so there's no empty edge). */
    function clampAxis(value: number, viewportSize: number, worldSize: number) {
      const overflow = viewportSize - worldSize * view.scale;
      return overflow >= 0 ? overflow / 2 : clamp(value, overflow, 0);
    }

    function clampView() {
      view.x = clampAxis(view.x, viewportW, WORLD_WIDTH);
      view.y = clampAxis(view.y, viewportH, WORLD_HEIGHT);
    }

    function visibleWorld(): WorldView {
      return {
        x: -view.x / view.scale,
        y: -view.y / view.scale,
        width: viewportW / view.scale,
        height: viewportH / view.scale,
      };
    }

    function write() {
      frame = 0;
      const transform = `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`;
      if (groundRef.current) groundRef.current.style.transform = transform;
      if (contentRef.current) contentRef.current.style.transform = transform;
      const visible = visibleWorld();
      viewListenersRef.current.forEach((listener) => listener(visible));
    }

    function scheduleWrite() {
      if (!frame) frame = requestAnimationFrame(write);
    }

    function animateNextWrite() {
      if (reducedMotion.matches) return;
      root!.dataset.gliding = '';
      clearTimeout(glideTimer);
      glideTimer = setTimeout(() => delete root!.dataset.gliding, GLIDE_MS);
    }

    function centreOn(worldX: number, worldY: number) {
      view.x = viewportW / 2 - worldX * view.scale;
      view.y = viewportH / 2 - worldY * view.scale;
      clampView();
    }

    function stopMomentum() {
      cancelAnimationFrame(momentumFrame);
      momentumFrame = 0;
    }

    function measure() {
      const visible = visibleWorld();
      viewportW = window.innerWidth;
      viewportH = window.innerHeight;
      return { x: visible.x + visible.width / 2, y: visible.y + visible.height / 2 };
    }

    function handleResize() {
      const focus = measure();
      view.scale = worldScale();
      centreOn(focus.x, focus.y);
      scheduleWrite();
    }

    function panBy(dx: number, dy: number) {
      if (dx === 0 && dy === 0) return;
      panListenersRef.current.forEach((listener) => listener(dx, dy));
      view.x += dx;
      view.y += dy;
      clampView();
      scheduleWrite();
    }

    moveToRef.current = (x, y, animate) => {
      stopMomentum();
      centreOn(x, y);
      if (animate) animateNextWrite();
      scheduleWrite();
    };

    // Native and non-passive so the page never scrolls or browser-zooms.
    // A trackpad pinch arrives as ctrl + wheel, and is ignored.
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) return;
      stopMomentum();
      const lineFactor = event.deltaMode === 1 ? WHEEL_LINE_PX : 1;
      panBy(-event.deltaX * lineFactor, -event.deltaY * lineFactor);
    }

    /* One pointer drags; extra fingers are ignored. A press only becomes a
       drag past a small threshold, and a finished drag swallows the click
       that follows it. */
    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let dragging = false;
    let suppressClick = false;
    let samples: { x: number; y: number; t: number }[] = [];

    function handlePointerDown(event: PointerEvent) {
      if (pointerId !== null || !event.isPrimary || event.button !== 0) return;
      if (isEditableTarget(event.target)) return;
      stopMomentum();
      pointerId = event.pointerId;
      startX = lastX = event.clientX;
      startY = lastY = event.clientY;
      samples = [{ x: event.clientX, y: event.clientY, t: event.timeStamp }];
      dragging = false;
      suppressClick = false;
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerId !== pointerId) return;
      if (!dragging) {
        if (Math.hypot(event.clientX - startX, event.clientY - startY) < DRAG_THRESHOLD_PX) return;
        dragging = true;
        root!.dataset.dragging = '';
        root!.setPointerCapture(event.pointerId);
      }
      panBy(event.clientX - lastX, event.clientY - lastY);
      lastX = event.clientX;
      lastY = event.clientY;
      samples.push({ x: event.clientX, y: event.clientY, t: event.timeStamp });
      while (samples.length > 2 && event.timeStamp - samples[0].t > VELOCITY_WINDOW_MS) samples.shift();
    }

    function startMomentum(vx: number, vy: number) {
      if (reducedMotion.matches) return;
      let last = performance.now();
      const step = (now: number) => {
        const dt = Math.min(64, now - last);
        last = now;
        const decay = Math.pow(MOMENTUM_FRICTION, dt / 16);
        vx *= decay;
        vy *= decay;
        const before = { x: view.x, y: view.y };
        panBy(vx * dt, vy * dt);
        // Stops when slow enough, or when it has run into a world edge.
        const moved = view.x !== before.x || view.y !== before.y;
        if (Math.hypot(vx, vy) < MOMENTUM_STOP || !moved) {
          momentumFrame = 0;
          return;
        }
        momentumFrame = requestAnimationFrame(step);
      };
      momentumFrame = requestAnimationFrame(step);
    }

    function handlePointerEnd(event: PointerEvent) {
      if (event.pointerId !== pointerId) return;
      if (dragging) {
        // Swallows only the click this same release fires (it runs before
        // any timer), so a drag that ends without one can't eat a later click.
        suppressClick = true;
        setTimeout(() => {
          suppressClick = false;
        }, 0);
        const first = samples[0];
        const last = samples[samples.length - 1];
        const dt = last.t - first.t;
        if (event.type === 'pointerup' && dt > 0 && event.timeStamp - last.t < VELOCITY_WINDOW_MS) {
          const vx = clamp((last.x - first.x) / dt, -MAX_MOMENTUM_SPEED, MAX_MOMENTUM_SPEED);
          const vy = clamp((last.y - first.y) / dt, -MAX_MOMENTUM_SPEED, MAX_MOMENTUM_SPEED);
          startMomentum(vx, vy);
        }
      }
      pointerId = null;
      dragging = false;
      delete root!.dataset.dragging;
    }

    // Capture phase: a drag's trailing click never reaches an item.
    function handleClickCapture(event: MouseEvent) {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    }

    // Safari's pinch (trackpad and touch) zooms through its own gesture events.
    function preventGesture(event: Event) {
      event.preventDefault();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (isEditableTarget(event.target)) return;
      if (event.target instanceof Element && event.target.closest('[role="dialog"]')) return;
      const page = viewportH * KEY_PAGE_RATIO;
      const deltas: Record<string, [number, number]> = {
        ArrowLeft: [KEY_PAN_PX, 0],
        ArrowRight: [-KEY_PAN_PX, 0],
        ArrowUp: [0, KEY_PAN_PX],
        ArrowDown: [0, -KEY_PAN_PX],
        PageUp: [0, page],
        PageDown: [0, -page],
      };
      const delta = deltas[event.key];
      if (!delta) return;
      event.preventDefault();
      stopMomentum();
      panBy(delta[0], delta[1]);
    }

    /* Tabbing to an off-screen item pans it into view. The browser may also
       scroll the overflow-hidden root to reveal it, which would fight the
       transform, so that scroll is undone. */
    function handleFocusIn(event: FocusEvent) {
      root!.scrollTo(0, 0);
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const rect = target.getBoundingClientRect();
      if (rect.left >= 0 && rect.top >= 0 && rect.right <= viewportW && rect.bottom <= viewportH) return;
      moveToRef.current(
        (rect.left + rect.width / 2 - view.x) / view.scale,
        (rect.top + rect.height / 2 - view.y) / view.scale,
        true,
      );
    }

    function handleScroll() {
      root!.scrollTo(0, 0);
    }

    readFocusRef.current = () => {
      const visible = visibleWorld();
      return { x: visible.x + visible.width / 2, y: visible.y + visible.height / 2 };
    };

    measure();
    centreOn(initialFocusRef.current.x, initialFocusRef.current.y);
    write();

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    root.addEventListener('wheel', handleWheel, { passive: false });
    root.addEventListener('pointerdown', handlePointerDown);
    root.addEventListener('pointermove', handlePointerMove);
    root.addEventListener('pointerup', handlePointerEnd);
    root.addEventListener('pointercancel', handlePointerEnd);
    root.addEventListener('click', handleClickCapture, true);
    root.addEventListener('focusin', handleFocusIn);
    root.addEventListener('scroll', handleScroll);
    root.addEventListener('gesturestart', preventGesture);
    root.addEventListener('gesturechange', preventGesture);

    return () => {
      cancelAnimationFrame(frame);
      stopMomentum();
      clearTimeout(glideTimer);
      moveToRef.current = () => {};
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      root.removeEventListener('wheel', handleWheel);
      root.removeEventListener('pointerdown', handlePointerDown);
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerup', handlePointerEnd);
      root.removeEventListener('pointercancel', handlePointerEnd);
      root.removeEventListener('click', handleClickCapture, true);
      root.removeEventListener('focusin', handleFocusIn);
      root.removeEventListener('scroll', handleScroll);
      root.removeEventListener('gesturestart', preventGesture);
      root.removeEventListener('gesturechange', preventGesture);
    };
  }, [rootRef, groundRef, contentRef]);

  return { subscribePan, subscribeView, moveTo, readFocus };
}
