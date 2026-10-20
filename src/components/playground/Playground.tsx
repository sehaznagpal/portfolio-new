import { useEffect, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PLAYGROUND_ITEMS, type PlaygroundItem, type PlaygroundModalId } from '../../data/playgroundItems';
import { useHasFinePointer } from '../../lib/useHasFinePointer';
import { useTheme } from './theme/ThemeContext';
import { themeGround } from './theme/themes';
import ThemeCurtain from './theme/ThemeCurtain';
import CanvasView from './canvas/CanvasView';
import GridView from './grid/GridView';
import ViewToggle, { type PlaygroundView } from './chrome/ViewToggle';
import PortfolioButton from './chrome/PortfolioButton';
import ShareMenu from './chrome/ShareMenu';
import Toolbar from './chrome/Toolbar';
import PhotoboothModal from './modals/PhotoboothModal';
import SipStudioModal from './modals/SipStudioModal';
import ExtrasModal from './modals/ExtrasModal';
import MotionDemoModal from './modals/MotionDemoModal';
import WorktapeModal from './modals/WorktapeModal';
import styles from './Playground.module.css';

const VIEW_KEY = 'portfolio:playground-view';
// Half of the ~250ms crossfade each way.
const FADE = { duration: 0.125, ease: 'easeOut' } as const;

function readStoredView(): PlaygroundView | null {
  try {
    const stored = localStorage.getItem(VIEW_KEY);
    return stored === 'canvas' || stored === 'grid' ? stored : null;
  } catch {
    return null;
  }
}

function storeView(view: PlaygroundView) {
  try {
    localStorage.setItem(VIEW_KEY, view);
  } catch {
    // Storage unavailable (e.g. private browsing): the choice just won't persist.
  }
}

/* The playground shell: the themed ground, the canvas or grid view (canvas
   by default with a mouse, grid on touch, then whatever was last picked),
   the fixed UI and the project modals. Theme colours apply only here. */
export default function Playground() {
  const { theme } = useTheme();
  const hasFinePointer = useHasFinePointer();
  const reducedMotion = useReducedMotion();
  const [view, setView] = useState<PlaygroundView>(() => readStoredView() ?? (hasFinePointer ? 'canvas' : 'grid'));
  const [openModal, setOpenModal] = useState<PlaygroundModalId | null>(null);

  // The canvas pans instead of scrolling; the grid is a normal scrolling page.
  useEffect(() => {
    if (view !== 'canvas') return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [view]);

  function changeView(next: PlaygroundView) {
    if (next === view) return;
    storeView(next);
    window.scrollTo(0, 0);
    setView(next);
  }

  function openItem(item: PlaygroundItem) {
    if (item.action && 'modal' in item.action) setOpenModal(item.action.modal);
  }

  const ground = themeGround(theme);
  const groundStyle = {
    '--pg-ground': ground.ground,
    '--pg-ground-dot': ground.dot,
    '--pg-caption': ground.dark ? 'var(--pg-paper)' : 'var(--pg-ink)',
  } as CSSProperties;
  const modalProps = (id: PlaygroundModalId) => ({
    open: openModal === id,
    onClose: () => setOpenModal(null),
    note: PLAYGROUND_ITEMS.find((item) => item.action && 'modal' in item.action && item.action.modal === id)?.note,
  });
  const fade = reducedMotion ? { duration: 0 } : FADE;

  return (
    <div className={styles.playground} style={groundStyle} data-view={view}>
      <div className={styles.backdrop} aria-hidden="true">
        <ThemeCurtain theme={theme} />
        {view === 'grid' && <div className={styles.dots} />}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
          {view === 'canvas' ? <CanvasView onOpenModal={openItem} /> : <GridView onOpenModal={openItem} />}
        </motion.div>
      </AnimatePresence>

      <ViewToggle view={view} onChange={changeView} />
      <PortfolioButton />
      <ShareMenu />
      <Toolbar />

      <PhotoboothModal {...modalProps('photobooth')} />
      <MotionDemoModal {...modalProps('motionDemo')} />
      <SipStudioModal {...modalProps('sipStudio')} />
      <ExtrasModal {...modalProps('extras')} />
      <WorktapeModal {...modalProps('worktape')} />
    </div>
  );
}
