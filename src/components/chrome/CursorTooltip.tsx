import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useHasFinePointer } from '../../lib/useHasFinePointer';
import styles from './CursorTooltip.module.css';

// How much of the remaining distance to the cursor is closed each frame —
// lower reads as a slower, more trailing lag; higher tracks closer to 1:1.
const LERP_FACTOR = 0.18;

// Nudges the pill clear of the cursor itself so it doesn't sit hidden
// directly underneath it.
const OFFSET_X = 16;
const OFFSET_Y = 20;

interface CursorTooltipProps {
  text: string;
  children: ReactNode;
  className?: string;
}

// Small pill that trails the cursor (eased, not 1:1) while hovering its
// children, mounted via portal so it can't be clipped by an ancestor's
// overflow. Reusable across any hoverable trigger.
export default function CursorTooltip({ text, children, className }: CursorTooltipProps) {
  // Touch devices synthesize mouse events on tap, which would otherwise pop
  // the pill in at the tap point and leave it stuck there — a viewport-width
  // check wouldn't catch a touch tablet/laptop using the desktop layout, so
  // this checks the actual pointer capability instead (see useHasFinePointer).
  const hasFinePointer = useHasFinePointer();
  const [visible, setVisible] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!visible) return;

    function tick() {
      pos.current.x += (target.current.x - pos.current.x) * LERP_FACTOR;
      pos.current.y += (target.current.y - pos.current.y) * LERP_FACTOR;
      if (pillRef.current) {
        pillRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  // Places the pill at the cursor immediately on the frame it mounts, so it
  // doesn't flash in at (0, 0) before the first tick above ever runs.
  useLayoutEffect(() => {
    if (visible && pillRef.current) {
      pillRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
    }
  }, [visible]);

  function handleMouseMove(event: React.MouseEvent) {
    if (!hasFinePointer) return;
    target.current = { x: event.clientX + OFFSET_X, y: event.clientY + OFFSET_Y };
  }

  function handleMouseEnter(event: React.MouseEvent) {
    if (!hasFinePointer) return;
    const next = { x: event.clientX + OFFSET_X, y: event.clientY + OFFSET_Y };
    target.current = next;
    pos.current = next;
    setVisible(true);
  }

  function handleMouseLeave() {
    if (!hasFinePointer) return;
    setVisible(false);
  }

  return (
    <span
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {hasFinePointer &&
        visible &&
        createPortal(
          <div className={styles.pill} ref={pillRef} role="tooltip">
            {text}
          </div>,
          document.body,
        )}
    </span>
  );
}
