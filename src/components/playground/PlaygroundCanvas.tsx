import { useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useHasFinePointer } from '../../lib/useHasFinePointer';
import { CANVAS_HEIGHT, CANVAS_ITEMS, CANVAS_WIDTH } from './canvasLayout';
import { PanContext } from './canvasContext';
import { useCanvasViewport } from './useCanvasViewport';
import { useAutoHoverCycle } from './useAutoHoverCycle';
import { useTheme } from './theme/ThemeContext';
import ThemeCurtain from './theme/ThemeCurtain';
import CanvasItem from './CanvasItem';
import DraftsCard from './items/DraftsCard';
import PhotoboothItem from './items/PhotoboothItem';
import MotionDemoItem from './items/MotionDemoItem';
import WebsiteItem from './items/WebsiteItem';
import ExtrasItem from './items/ExtrasItem';
import SipStudioItem from './items/SipStudioItem';
import LetterItem from './items/LetterItem';
import AmoraItem from './items/AmoraItem';
import MePhoto from './items/MePhoto';
import SayHelloItem from './items/SayHelloItem';
import PhotoboothModal from './modals/PhotoboothModal';
import SipStudioModal from './modals/SipStudioModal';
import ExtrasModal from './modals/ExtrasModal';
import MotionDemoModal from './modals/MotionDemoModal';
import PortfolioButton from './chrome/PortfolioButton';
import ShareMenu from './chrome/ShareMenu';
import Toolbar from './chrome/Toolbar';
import styles from './PlaygroundCanvas.module.css';

type ModalKey = 'photobooth' | 'sipStudio' | 'extras' | 'motionDemo';

// --cu itself is written by useCanvasViewport on every resize.
const CANVAS_SIZE = { '--canvas-w': CANVAS_WIDTH, '--canvas-h': CANVAS_HEIGHT } as CSSProperties;

/* The pannable canvas plus the fixed UI over it. The grid and the items sit
   in two canvas-sized layers that move together; the theme curtain slides
   between them. Theme colours apply only through data-theme here. */
export default function PlaygroundCanvas() {
  const { theme } = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { mode, subscribePan } = useCanvasViewport({ rootRef, gridRef, contentRef });
  const hasFinePointer = useHasFinePointer();
  const reducedMotion = useReducedMotion();
  const isAutoHover = useAutoHoverCycle(!hasFinePointer && !reducedMotion);
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

  const closeModal = () => setOpenModal(null);
  const modalProps = (key: ModalKey) => ({ open: openModal === key, onClose: closeModal });

  return (
    <div className={styles.viewport} data-theme={theme === 'default' ? undefined : theme}>
      <div ref={rootRef} className={styles.surface} data-mode={mode} style={CANVAS_SIZE}>
        <div ref={gridRef} className={`${styles.layer} ${styles.grid}`} />
        <ThemeCurtain theme={theme} />
        <div ref={contentRef} className={styles.layer}>
          <PanContext.Provider value={subscribePan}>
            <CanvasItem box={CANVAS_ITEMS.photobooth}>
              <PhotoboothItem autoHover={isAutoHover('photobooth')} onOpen={() => setOpenModal('photobooth')} />
            </CanvasItem>
            <CanvasItem box={CANVAS_ITEMS.motionDemo}>
              <MotionDemoItem autoHover={isAutoHover('motionDemo')} onOpen={() => setOpenModal('motionDemo')} />
            </CanvasItem>
            <CanvasItem box={CANVAS_ITEMS.website}>
              <WebsiteItem autoHover={isAutoHover('website')} />
            </CanvasItem>
            <CanvasItem box={CANVAS_ITEMS.extras}>
              <ExtrasItem autoHover={isAutoHover('extras')} onOpen={() => setOpenModal('extras')} />
            </CanvasItem>
            <CanvasItem box={CANVAS_ITEMS.sipStudio}>
              <SipStudioItem autoHover={isAutoHover('sipStudio')} onOpen={() => setOpenModal('sipStudio')} />
            </CanvasItem>
            <CanvasItem box={CANVAS_ITEMS.drafts}>
              <DraftsCard />
            </CanvasItem>
            <CanvasItem box={CANVAS_ITEMS.letter}>
              <LetterItem />
            </CanvasItem>
            <CanvasItem box={CANVAS_ITEMS.amora}>
              <AmoraItem autoHover={isAutoHover('amora')} />
            </CanvasItem>
            <CanvasItem box={CANVAS_ITEMS.me}>
              <MePhoto />
            </CanvasItem>
            <CanvasItem box={CANVAS_ITEMS.sayHello}>
              <SayHelloItem autoHover={isAutoHover('sayHello')} />
            </CanvasItem>
          </PanContext.Provider>
        </div>
      </div>

      <PortfolioButton />
      <ShareMenu />
      <Toolbar />

      <PhotoboothModal {...modalProps('photobooth')} />
      <SipStudioModal {...modalProps('sipStudio')} />
      <ExtrasModal {...modalProps('extras')} />
      <MotionDemoModal {...modalProps('motionDemo')} />
    </div>
  );
}
