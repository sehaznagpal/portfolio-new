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

// Image tooltips pin just under the trigger instead of following the
// cursor: slightly in from its left edge and tucked a few px up under it
// (Figma 1296:1813).
const IMAGE_INSET_X = 12;
const IMAGE_TUCK_Y = 4;

interface TooltipImage {
  src: string;
  width: number;
  height: number;
}

interface CursorTooltipProps {
  /* Text pill content. Ignored when `image` is given. */
  text?: string;
  /* Shows a small framed photo pinned under the trigger instead of a text
     pill. It isn't requested until the first hover. */
  image?: TooltipImage;
  children: ReactNode;
  className?: string;
  /* 'light' (default): cream fill, dark text — matches the case-study index
     page's own dark background. 'dark': black fill, light text — for the
     light/cream hero background (about + playground corner links there). */
  variant?: 'light' | 'dark';
  /* Fires alongside the pill's own position tracking, given the raw mouse
     event — for a caller that needs to derive something else (e.g. which
     zone of a larger area the cursor is over, to pick `text` dynamically)
     from the same movement, without it having to attach its own separate
     listener. */
  onHoverMove?: (event: React.MouseEvent) => void;
}

// Small pill that trails the cursor (eased, not 1:1) while hovering its
// children, mounted via portal so it can't be clipped by an ancestor's
// overflow. Reusable across any hoverable trigger.
export default function CursorTooltip({
  text,
  image,
  children,
  className,
  variant = 'light',
  onHoverMove,
}: CursorTooltipProps) {
  // Touch devices synthesize mouse events on tap, which would otherwise pop
  // the pill in at the tap point and leave it stuck there — a viewport-width
  // check wouldn't catch a touch tablet/laptop using the desktop layout, so
  // this checks the actual pointer capability instead (see useHasFinePointer).
  const hasFinePointer = useHasFinePointer();
  const [visible, setVisible] = useState(false);
  // Image tooltips stay mounted after the first hover so they can fade out
  // (and the photo stays loaded) instead of vanishing on unmount.
  const [imageRequested, setImageRequested] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  // Keeps the pill's own box fully inside the viewport — near an edge, the
  // raw cursor-plus-offset target would otherwise push it (or its trailing
  // lag) partway off-screen. Reads the pill's actual rendered size each
  // call since that varies with `text`.
  function clampToViewport(x: number, y: number) {
    const el = pillRef.current;
    if (!el) return { x, y };
    const maxX = Math.max(window.innerWidth - el.offsetWidth, 0);
    const maxY = Math.max(window.innerHeight - el.offsetHeight, 0);
    return { x: Math.min(Math.max(x, 0), maxX), y: Math.min(Math.max(y, 0), maxY) };
  }

  useEffect(() => {
    if (!visible || image) return;

    function tick() {
      pos.current.x += (target.current.x - pos.current.x) * LERP_FACTOR;
      pos.current.y += (target.current.y - pos.current.y) * LERP_FACTOR;
      if (pillRef.current) {
        const clamped = clampToViewport(pos.current.x, pos.current.y);
        pillRef.current.style.transform = `translate(${clamped.x}px, ${clamped.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [visible, image]);

  // Places the pill at the cursor (or under the trigger, for images)
  // immediately on the frame it shows, so it doesn't flash in at (0, 0).
  useLayoutEffect(() => {
    if (!visible || !pillRef.current) return;
    if (image) {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        pillRef.current.style.transform = `translate(${rect.left + IMAGE_INSET_X}px, ${rect.bottom - IMAGE_TUCK_Y}px)`;
      }
      return;
    }
    const clamped = clampToViewport(pos.current.x, pos.current.y);
    pillRef.current.style.transform = `translate(${clamped.x}px, ${clamped.y}px)`;
  }, [visible, image]);

  function handleMouseMove(event: React.MouseEvent) {
    onHoverMove?.(event);
    if (!hasFinePointer) return;
    target.current = { x: event.clientX + OFFSET_X, y: event.clientY + OFFSET_Y };
  }

  function handleMouseEnter(event: React.MouseEvent) {
    if (!hasFinePointer) return;
    const next = { x: event.clientX + OFFSET_X, y: event.clientY + OFFSET_Y };
    target.current = next;
    pos.current = next;
    if (image) setImageRequested(true);
    setVisible(true);
  }

  function handleMouseLeave() {
    if (!hasFinePointer) return;
    setVisible(false);
  }

  let pill: ReactNode = null;
  if (hasFinePointer && image && imageRequested) {
    pill = (
      <div className={`${styles.photo} ${visible ? styles.photoVisible : ''}`} ref={pillRef} aria-hidden="true">
        <div className={styles.photoFrame}>
          <img src={image.src} alt="" width={image.width} height={image.height} decoding="async" />
        </div>
      </div>
    );
  } else if (hasFinePointer && !image && visible) {
    pill = (
      <div className={`${styles.pill} ${variant === 'dark' ? styles.pillDark : ''}`} ref={pillRef} role="tooltip">
        {text}
      </div>
    );
  }

  return (
    <span
      ref={triggerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {pill && createPortal(pill, document.body)}
    </span>
  );
}
