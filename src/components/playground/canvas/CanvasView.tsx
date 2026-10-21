import { useMemo, useRef, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PLAYGROUND_ITEMS, type PlaygroundItem } from '../../../data/playgroundItems';
import { useHasFinePointer } from '../../../lib/useHasFinePointer';
import { useAutoHoverCycle, type AutoHoverKey } from '../useAutoHoverCycle';
import { PanContext } from '../canvasContext';
import IntroNote from '../cards/IntroNote';
import PhotoboothItem from '../items/PhotoboothItem';
import MotionDemoItem from '../items/MotionDemoItem';
import WebsiteItem from '../items/WebsiteItem';
import ExtrasItem from '../items/ExtrasItem';
import SipStudioItem from '../items/SipStudioItem';
import AmoraItem from '../items/AmoraItem';
import WorktapeItem from '../items/WorktapeItem';
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
    const open = () => onOpenModal(item);
    const auto = (key: AutoHoverKey) => isAutoHover(key);
    switch (item.id) {
      case 'intro':
        return (
          <span className={styles.introCard}>
            <IntroNote />
          </span>
        );
      case 'photobooth':
        return <PhotoboothItem autoHover={auto('photobooth')} onOpen={open} />;
      case 'motion':
        return <MotionDemoItem autoHover={auto('motionDemo')} onOpen={open} />;
      case 'rewired':
        return <WebsiteItem autoHover={auto('website')} />;
      case 'extras':
        return <ExtrasItem autoHover={auto('extras')} onOpen={open} />;
      case 'sip':
        return <SipStudioItem autoHover={auto('sipStudio')} onOpen={open} />;
      case 'amora':
        return <AmoraItem autoHover={auto('amora')} />;
      case 'worktape':
        return <WorktapeItem autoHover={auto('worktape')} onOpen={open} />;
      case 'letter':
        return <LetterItem />;
      case 'me':
        return <MePhoto />;
      case 'hello':
        return <SayHelloItem autoHover={auto('sayHello')} />;
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
