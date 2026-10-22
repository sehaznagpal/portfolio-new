import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PLAYGROUND_ITEMS, type PlaygroundItem, type PlaygroundModalId } from '../../data/playgroundItems';
import { useTheme } from './theme/ThemeContext';
import { themeGround } from './theme/themes';
import ThemeCurtain from './theme/ThemeCurtain';
import CanvasView, { type CanvasHandle } from './canvas/CanvasView';
import { WORLD_CENTRE, groundDotOffset } from './canvas/canvasLayout';
import { MORPH_CSS } from './morph';
import GridView from './grid/GridView';
import ViewToggle, { type PlaygroundView } from './chrome/ViewToggle';
import PortfolioButton from './chrome/PortfolioButton';
import ShareMenu from './chrome/ShareMenu';
import { MOBILE_QUERY } from './mobileQuery';
import PhotoboothModal from './modals/PhotoboothModal';
import SipStudioModal from './modals/SipStudioModal';
import ExtrasModal from './modals/ExtrasModal';
import MotionDemoModal from './modals/MotionDemoModal';
import WorktapeModal from './modals/WorktapeModal';
import { play } from '../../lib/sound/sound';
import './sounds';
import styles from './Playground.module.css';

// Half of the ~250ms crossfade each way.
const FADE = { duration: 0.125, ease: 'easeOut' } as const;
const canMorphViews = () => typeof document !== 'undefined' && 'startViewTransition' in document;

/* The playground shell: the themed ground, the canvas or grid view (canvas
   on desktop and tablet, the grid on phones; nothing is remembered),
   the fixed UI and the project modals. Theme colours apply only here.
   Switching views morphs every item between its two places (morph.ts);
   without View Transitions, or with reduced motion, the views crossfade. */
export default function Playground() {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [view, setView] = useState<PlaygroundView>(() =>
    window.matchMedia(MOBILE_QUERY).matches ? 'grid' : 'canvas',
  );
  const [openModal, setOpenModal] = useState<PlaygroundModalId | null>(null);
  const canvasRef = useRef<CanvasHandle>(null);
  // Where the canvas was left on this visit, so coming back resumes there.
  const [canvasFocus, setCanvasFocus] = useState(WORLD_CENTRE);
  const morph = canMorphViews() && !reducedMotion;

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
    play('swoosh');
    const swap = () => {
      if (canvasRef.current) setCanvasFocus(canvasRef.current.readFocus());
      window.scrollTo(0, 0);
      setView(next);
    };
    if (!morph || !canMorphViews()) {
      swap();
      return;
    }
    // The old view is captured first, then the new one renders synchronously.
    // An interrupted morph (a resize, a quick second switch) still swaps the
    // view; only its animation is dropped, so that rejection is expected.
    document.startViewTransition(() => flushSync(swap)).ready.catch(() => {});
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
  // The grid's fixed dots line up with where the canvas's were (or will be).
  const dots = groundDotOffset(canvasFocus);
  const content =
    view === 'canvas' ? (
      <CanvasView ref={canvasRef} onOpenModal={openItem} initialFocus={canvasFocus} />
    ) : (
      <GridView onOpenModal={openItem} />
    );

  return (
    // The playground's own sounds replace the site's click tick in here.
    <div className={styles.playground} style={groundStyle} data-view={view} data-sound-own>
      <div className={styles.backdrop} aria-hidden="true">
        <ThemeCurtain theme={theme} />
        {view === 'grid' && (
          <div className={styles.dots} style={{ backgroundPosition: `${dots.x}px ${dots.y}px` }} />
        )}
      </div>

      {morph ? (
        <>
          <style>{MORPH_CSS}</style>
          {content}
        </>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
            {content}
          </motion.div>
        </AnimatePresence>
      )}

      <ViewToggle view={view} onChange={changeView} />
      <PortfolioButton />
      <ShareMenu />

      <PhotoboothModal {...modalProps('photobooth')} />
      <MotionDemoModal {...modalProps('motionDemo')} />
      <SipStudioModal {...modalProps('sipStudio')} />
      <ExtrasModal {...modalProps('extras')} />
      <WorktapeModal {...modalProps('worktape')} />
    </div>
  );
}
