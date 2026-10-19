import { useMemo, useRef } from 'react';
import { PLAYGROUND_ITEMS, type PlaygroundItem } from '../../../data/playgroundItems';
import { INTRO_ID, WORLD_HEIGHT, WORLD_WIDTH, placeItems } from '../playgroundLayout';
import PlaygroundCard from '../cards/PlaygroundCard';
import Minimap from './Minimap';
import { useWorldViewport } from './useWorldViewport';
import styles from './CanvasView.module.css';

const WORLD_SIZE = { width: WORLD_WIDTH, height: WORLD_HEIGHT };

/* The pannable world: a dotted ground and every item at its auto-placed (or
   pinned) spot, at real size. Opens centred on the intro note. */
export default function CanvasView({ onOpenModal }: { onOpenModal: (item: PlaygroundItem) => void }) {
  const placed = useMemo(() => placeItems(PLAYGROUND_ITEMS), []);
  const intro = placed.find((box) => box.item.id === INTRO_ID) ?? placed[0];
  const rootRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { mode, subscribeView, moveTo } = useWorldViewport({
    rootRef,
    groundRef,
    contentRef,
    initialFocus: { x: intro.x + intro.w / 2, y: intro.y + intro.h / 2 },
  });

  return (
    <>
      <div ref={rootRef} className={styles.surface} data-mode={mode}>
        <div ref={groundRef} className={`${styles.layer} ${styles.ground}`} style={WORLD_SIZE} />
        <div ref={contentRef} className={styles.layer} style={WORLD_SIZE}>
          {placed.map((box) => (
            <PlaygroundCard
              key={box.item.id}
              item={box.item}
              onOpenModal={onOpenModal}
              width={box.w}
              style={{ position: 'absolute', left: box.x, top: box.y }}
            />
          ))}
        </div>
      </div>
      <Minimap placed={placed} subscribeView={subscribeView} moveTo={moveTo} />
    </>
  );
}
