import { useEffect, useRef, type PointerEvent } from 'react';
import { CAPTION_HEIGHT, WORLD_HEIGHT, WORLD_WIDTH, type PlacedItem } from './canvasLayout';
import type { ViewListener } from './useWorldViewport';
import styles from './Minimap.module.css';

const MAP_WIDTH = 220;
const SCALE = MAP_WIDTH / WORLD_WIDTH;
const MAP_HEIGHT = WORLD_HEIGHT * SCALE;

/* Bottom-right overview of the world: every item as a small outline, plus
   the visible area. Click or drag on it to move the view there. The visible
   area is moved by direct style writes from the viewport's own rAF. */
export default function Minimap({
  placed,
  subscribeView,
  moveTo,
}: {
  placed: PlacedItem[];
  subscribeView: (listener: ViewListener) => () => void;
  moveTo: (x: number, y: number, animate?: boolean) => void;
}) {
  const visibleRef = useRef<HTMLSpanElement>(null);
  const draggingRef = useRef(false);

  useEffect(
    () =>
      subscribeView((view) => {
        const el = visibleRef.current;
        if (!el) return;
        // Clipped to the map: on a screen bigger than the world, the view extends past it.
        const left = Math.max(0, view.x);
        const top = Math.max(0, view.y);
        const right = Math.min(WORLD_WIDTH, view.x + view.width);
        const bottom = Math.min(WORLD_HEIGHT, view.y + view.height);
        el.style.width = `${(right - left) * SCALE}px`;
        el.style.height = `${(bottom - top) * SCALE}px`;
        el.style.transform = `translate3d(${left * SCALE}px, ${top * SCALE}px, 0)`;
      }),
    [subscribeView],
  );

  function moveToPointer(event: PointerEvent<HTMLDivElement>, animate: boolean) {
    const rect = event.currentTarget.getBoundingClientRect();
    moveTo((event.clientX - rect.left) / SCALE, (event.clientY - rect.top) / SCALE, animate);
  }

  return (
    <div
      className={styles.map}
      style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
      role="img"
      aria-label="Map of the playground. Click to move there."
      onPointerDown={(event) => {
        draggingRef.current = true;
        moveToPointer(event, true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (draggingRef.current) moveToPointer(event, false);
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
      onPointerCancel={() => {
        draggingRef.current = false;
      }}
    >
      {placed.map((box) => (
        <span
          key={box.item.id}
          className={styles.item}
          style={{ left: box.x * SCALE, top: box.y * SCALE, width: box.w * SCALE, height: (box.h + CAPTION_HEIGHT) * SCALE }}
        />
      ))}
      <span ref={visibleRef} className={styles.visible} />
    </div>
  );
}
