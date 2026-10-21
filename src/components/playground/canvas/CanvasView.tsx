import { useMemo, useRef, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PLAYGROUND_ITEMS, type PlaygroundItem } from '../../../data/playgroundItems';
import { useHasFinePointer } from '../../../lib/useHasFinePointer';
import { useAutoHoverCycle } from '../useAutoHoverCycle';
import { PanContext } from '../canvasContext';
import IntroNote from '../cards/IntroNote';
import WorkArtwork, { WORK_HOVER_KEYS } from '../items/WorkArtwork';
import LetterItem from '../items/LetterItem';
import MePhoto from '../items/MePhoto';
import SayHelloItem from '../items/SayHelloItem';
import { WORLD_HEIGHT, WORLD_WIDTH, placeItems } from './canvasLayout';
import Minimap from './Minimap';
import { useWorldViewport } from './useWorldViewport';
import styles from './CanvasView.module.css';

const WORLD_SIZE = { width: WORLD_WIDTH, height: WORLD_HEIGHT };

/* The pannable world: every item's own artwork and interaction (ported from
   the original playground) at its pinned spot on a dotted ground, with a
   small caption under each. Opens centred on the Drafts card. */
export default function CanvasView({ onOpenModal }: { onOpenModal: (item: PlaygroundItem) => void }) {
  const placed = useMemo(() => placeItems(PLAYGROUND_ITEMS), []);
  const rootRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { subscribePan, subscribeView, moveTo } = useWorldViewport({
    rootRef,
    groundRef,
    contentRef,
    initialFocus: { x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 },
  });
  const hasFinePointer = useHasFinePointer();
  const reducedMotion = useReducedMotion();
  const isAutoHover = useAutoHoverCycle(!hasFinePointer && !reducedMotion);

  function artwork(item: PlaygroundItem): ReactNode {
    const hoverKey = WORK_HOVER_KEYS[item.id];
    if (hoverKey) {
      return <WorkArtwork id={item.id} autoHover={isAutoHover(hoverKey)} onOpen={() => onOpenModal(item)} />;
    }
    switch (item.id) {
      case 'intro':
        return (
          <span className={styles.introCard}>
            <IntroNote />
          </span>
        );
      case 'letter':
        return <LetterItem />;
      case 'me':
        return <MePhoto />;
      case 'hello':
        return <SayHelloItem autoHover={isAutoHover('sayHello')} />;
      default:
        return null;
    }
  }

  return (
    <>
      <div ref={rootRef} className={styles.surface}>
        <div ref={groundRef} className={`${styles.layer} ${styles.ground}`} style={WORLD_SIZE} />
        <div ref={contentRef} className={styles.layer} style={WORLD_SIZE}>
          <PanContext.Provider value={subscribePan}>
            {placed.map((box) => (
              <div
                key={box.item.id}
                className={styles.item}
                style={{ left: box.x, top: box.y, width: box.w, height: box.h, '--cu': `${box.scale}px` } as CSSProperties}
              >
                {artwork(box.item)}
                {box.item.caption !== null && (
                  <span className={styles.caption}>{box.item.caption ?? `${box.item.title} · ${box.item.type}`}</span>
                )}
              </div>
            ))}
          </PanContext.Provider>
        </div>
      </div>
      <Minimap placed={placed} subscribeView={subscribeView} moveTo={moveTo} />
    </>
  );
}
