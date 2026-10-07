import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH, INITIAL_FOCUS, canvasUnit } from './canvasLayout';

export type ViewMode = 'normal' | 'map';
export type PanListener = (dx: number, dy: number) => void;

/* Matches --pg-zoom-duration: how long the layers keep their transform
   transition after a zoom switch. */
const ZOOM_MS = 400;
// Movement before a press becomes a drag, so clicks and taps on items still work.
const DRAG_THRESHOLD_PX = 4;
const WHEEL_LINE_PX = 16;
const KEY_PAN_PX = 80;
const KEY_PAGE_RATIO = 0.8;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT', 'VIDEO'].includes(target.tagName))
  );
}

/* Pan and zoom for the playground canvas. Inputs only update a target view;
   a single rAF writes it as one transform to every layer, so nothing here
   re-renders React per frame. `mode` is the only React state.

   - Pan: wheel / trackpad scroll, pointer drag (mouse, touch, pen) and the
     arrow / page keys, always clamped so a canvas edge never comes into view.
   - Zoom (as in the old repo): pinch or ctrl/cmd + scroll out switches to a
     map view; scrolling back in or clicking returns to the normal view at
     that point. The map view is the smallest zoom that still covers the
     viewport. Only it uses scale(); the resting view is drawn at 1:1 in
     canvas units. */
export function useCanvasViewport({
  rootRef,
  gridRef,
  contentRef,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}) {
  const [mode, setMode] = useState<ViewMode>('normal');
  const listenersRef = useRef(new Set<PanListener>());

  const subscribePan = useCallback((listener: PanListener) => {
    const listeners = listenersRef.current;
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let unit = 1;
    let viewportW = 0;
    let viewportH = 0;
    let currentMode: ViewMode = 'normal';
    const view = { x: 0, y: 0, zoom: 1 };
    let frame = 0;
    let zoomTimer: ReturnType<typeof setTimeout> | undefined;

    const canvasW = () => CANVAS_WIDTH * unit;
    const canvasH = () => CANVAS_HEIGHT * unit;
    const coverZoom = () => Math.max(viewportW / canvasW(), viewportH / canvasH());

    function clampView() {
      view.x = clamp(view.x, viewportW - canvasW() * view.zoom, 0);
      view.y = clamp(view.y, viewportH - canvasH() * view.zoom, 0);
    }

    function write() {
      frame = 0;
      const transform = `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.zoom})`;
      if (gridRef.current) gridRef.current.style.transform = transform;
      if (contentRef.current) contentRef.current.style.transform = transform;
    }

    function scheduleWrite() {
      if (!frame) frame = requestAnimationFrame(write);
    }

    function animateNextWrite() {
      if (reducedMotion.matches) return;
      root!.dataset.zooming = 'true';
      clearTimeout(zoomTimer);
      zoomTimer = setTimeout(() => delete root!.dataset.zooming, ZOOM_MS);
    }

    function changeMode(next: ViewMode) {
      currentMode = next;
      setMode(next);
    }

    // Centres a point given in canvas design units, at the current zoom.
    function centreOn(designX: number, designY: number) {
      view.x = viewportW / 2 - designX * unit * view.zoom;
      view.y = viewportH / 2 - designY * unit * view.zoom;
      clampView();
    }

    function measure() {
      const focusX = (viewportW / 2 - view.x) / (unit * view.zoom);
      const focusY = (viewportH / 2 - view.y) / (unit * view.zoom);
      viewportW = window.innerWidth;
      viewportH = window.innerHeight;
      unit = canvasUnit(viewportW, viewportH);
      root!.style.setProperty('--cu', `${unit}px`);
      return { focusX, focusY };
    }

    function handleResize() {
      const { focusX, focusY } = measure();
      if (currentMode === 'map') {
        view.zoom = coverZoom();
        centreOn(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      } else {
        centreOn(focusX, focusY);
      }
      scheduleWrite();
    }

    function panBy(dx: number, dy: number) {
      if (currentMode !== 'normal' || (dx === 0 && dy === 0)) return;
      listenersRef.current.forEach((listener) => listener(dx, dy));
      view.x += dx;
      view.y += dy;
      clampView();
      scheduleWrite();
    }

    function enterMap() {
      if (currentMode === 'map') return;
      changeMode('map');
      view.zoom = coverZoom();
      centreOn(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      animateNextWrite();
      scheduleWrite();
    }

    function returnToNormal(clientX: number, clientY: number) {
      if (currentMode === 'normal') return;
      const designX = (clientX - view.x) / (unit * view.zoom);
      const designY = (clientY - view.y) / (unit * view.zoom);
      changeMode('normal');
      view.zoom = 1;
      centreOn(designX, designY);
      animateNextWrite();
      scheduleWrite();
    }

    /* Native and non-passive so the page itself never scrolls or zooms.
       Trackpad pinch arrives as a ctrl-wheel event, same as ctrl + scroll. */
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) {
        if (event.deltaY > 0) enterMap();
        else if (event.deltaY < 0) returnToNormal(event.clientX, event.clientY);
        return;
      }
      const lineFactor = event.deltaMode === 1 ? WHEEL_LINE_PX : 1;
      panBy(-event.deltaX * lineFactor, -event.deltaY * lineFactor);
    }

    /* One pointer drags; any extra fingers are ignored, as in the old touch
       handling. The press only becomes a drag past a small threshold, and a
       finished drag swallows the click that follows it. */
    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let dragging = false;
    let suppressClick = false;

    function handlePointerDown(event: PointerEvent) {
      if (pointerId !== null || !event.isPrimary || event.button !== 0 || currentMode !== 'normal') return;
      if (isEditableTarget(event.target)) return;
      pointerId = event.pointerId;
      startX = lastX = event.clientX;
      startY = lastY = event.clientY;
      dragging = false;
      suppressClick = false;
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerId !== pointerId) return;
      if (!dragging) {
        if (Math.hypot(event.clientX - startX, event.clientY - startY) < DRAG_THRESHOLD_PX) return;
        dragging = true;
        root!.dataset.dragging = 'true';
        root!.setPointerCapture(event.pointerId);
      }
      panBy(event.clientX - lastX, event.clientY - lastY);
      lastX = event.clientX;
      lastY = event.clientY;
    }

    function handlePointerEnd(event: PointerEvent) {
      if (event.pointerId !== pointerId) return;
      if (dragging) suppressClick = true;
      pointerId = null;
      dragging = false;
      delete root!.dataset.dragging;
    }

    // Capture phase, so neither a drag's trailing click nor a map-view click reaches an item.
    function handleClickCapture(event: MouseEvent) {
      if (suppressClick) {
        suppressClick = false;
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (currentMode === 'map') {
        event.preventDefault();
        event.stopPropagation();
        returnToNormal(event.clientX, event.clientY);
      }
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
      panBy(delta[0], delta[1]);
    }

    /* Tabbing to an off-screen item pans it into view. The browser may also
       try to scroll the overflow-hidden root to reveal it, which would fight
       the transform, so that scroll is undone. */
    function handleFocusIn(event: FocusEvent) {
      root!.scrollTo(0, 0);
      const target = event.target;
      if (!(target instanceof HTMLElement) || currentMode !== 'normal') return;
      const rect = target.getBoundingClientRect();
      if (rect.left >= 0 && rect.top >= 0 && rect.right <= viewportW && rect.bottom <= viewportH) return;
      const designX = (rect.left + rect.width / 2 - view.x) / unit;
      const designY = (rect.top + rect.height / 2 - view.y) / unit;
      centreOn(designX, designY);
      animateNextWrite();
      scheduleWrite();
    }

    function handleScroll() {
      root!.scrollTo(0, 0);
    }

    measure();
    centreOn(INITIAL_FOCUS.x, INITIAL_FOCUS.y);
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

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(zoomTimer);
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
    };
  }, [rootRef, gridRef, contentRef]);

  return { mode, subscribePan };
}
