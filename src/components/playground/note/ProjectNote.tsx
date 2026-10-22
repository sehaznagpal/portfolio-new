import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import CursorTooltip from '../../chrome/CursorTooltip';
import { useMediaQuery } from '../../../lib/useMediaQuery';
import paper from '../paper/notebookPaper.module.css';
import { play } from '../../../lib/sound/sound';
import styles from './ProjectNote.module.css';

// Gap from the viewport edges, and from the modal's close button.
const EDGE = 24;
const EDGE_COMPACT = 16;
const CLOSE_CLEARANCE = 8;
const COMPACT_QUERY = '(max-width: 1024px)';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const overlaps = (a: DOMRect, x: number, y: number, w: number, h: number) =>
  x < a.right && a.left < x + w && y < a.bottom && a.top < y + h;

/* A torn-out notebook page with a short note about the open project. It
   sits at the top-right of the screen (top-left on tablet and phone, clear
   of the modal's close button) and can be dragged anywhere on screen by
   mouse, pen or touch. It lives outside the modal and the canvas, so
   dragging it never closes the modal or pans the canvas. It mounts and
   unmounts with its modal, so it's back at its corner each time. */
export default function ProjectNote({
  id,
  text,
  visible,
  closeButtonRef,
}: {
  id: string;
  text: string;
  visible: boolean;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const compact = useMediaQuery(COMPACT_QUERY);
  const rootRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const drag = useRef<{ pointerId: number; dx: number; dy: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  function write() {
    const el = rootRef.current;
    if (el) el.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
  }

  /* Fully on screen, and never over the modal's close button: if it would
     cover it, it moves to whichever side of the button needs the least travel. */
  function constrain(x: number, y: number) {
    const el = rootRef.current;
    if (!el) return { x, y };
    const { width, height } = el.getBoundingClientRect();
    let nextX = clamp(x, 0, window.innerWidth - width);
    let nextY = clamp(y, 0, window.innerHeight - height);
    const close = closeButtonRef.current?.getBoundingClientRect();
    if (close && overlaps(close, nextX, nextY, width, height)) {
      const options = [
        { x: close.left - width - CLOSE_CLEARANCE, y: nextY },
        { x: close.right + CLOSE_CLEARANCE, y: nextY },
        { x: nextX, y: close.bottom + CLOSE_CLEARANCE },
        { x: nextX, y: close.top - height - CLOSE_CLEARANCE },
      ].filter((option) => option.x >= 0 && option.y >= 0 && option.x + width <= window.innerWidth && option.y + height <= window.innerHeight);
      const nearest = options.sort((a, b) => Math.hypot(a.x - nextX, a.y - nextY) - Math.hypot(b.x - nextX, b.y - nextY))[0];
      if (nearest) {
        nextX = nearest.x;
        nextY = nearest.y;
      }
    }
    return { x: nextX, y: nextY };
  }

  // Starts at its corner, before the first paint.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const edge = compact ? EDGE_COMPACT : EDGE;
    const x = compact ? edge : window.innerWidth - el.offsetWidth - edge;
    position.current = constrain(x, edge);
    write();
    // Placed once per opening; resize keeps it on screen below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleResize() {
      position.current = constrain(position.current.x, position.current.y);
      write();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current = {
      pointerId: event.pointerId,
      dx: event.clientX - position.current.x,
      dy: event.clientY - position.current.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    play('lift');
    setDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || event.pointerId !== current.pointerId) return;
    position.current = constrain(event.clientX - current.dx, event.clientY - current.dy);
    write();
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || event.pointerId !== drag.current.pointerId) return;
    drag.current = null;
    play('settle');
    setDragging(false);
  }

  return createPortal(
    <div
      ref={rootRef}
      className={`${styles.root} ${visible ? styles.visible : ''}`}
      data-sound-own
      data-dragging={dragging || undefined}
      data-draggable=""
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClick={(event) => event.stopPropagation()}
    >
      <CursorTooltip text="drag" hidden={dragging} elevated>
        <div className={styles.tilt}>
          <p id={id} className={`${styles.page} ${paper.paper} ${paper.writing}`}>
            {text}
          </p>
        </div>
      </CursorTooltip>
    </div>,
    document.body,
  );
}
