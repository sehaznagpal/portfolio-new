import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import Stage from '../components/viewport/Stage';
import HomeChrome from '../components/viewport/HomeChrome';
import Loader from '../components/loader/Loader';
import Hero from '../components/hero/Hero';
import AboutPanel from '../components/chrome/AboutPanel';
import CaseStudiesIndexPage from './CaseStudiesIndexPage';
import { ViewStateProvider, useViewState } from '../state/ViewStateContext';
import styles from './HomePage.module.css';

/* Brief hold between the loader clearing and the hero starting, so the two
   don't read as one abrupt cut. Only applies right after the loader plays;
   on a normal refresh (loader already seen this session) the hero mounts
   immediately. Unchanged from the pre-auto-layout build. */
const REVEAL_PAUSE_MS = 400;

// Explore Work -> case studies index: a calm scale+crossfade, not a circular
// reveal or any kind of flip/morph. CaseStudiesIndexPage is already mounted
// underneath at all times once past the loader (previewMode, exactly one
// viewport tall — see that component), sitting at opacity 0 so it's
// invisible but fully laid out — no layout shift when it fades in. Hero
// handles its own scale-up+fade-out independently (see Hero.tsx); this file
// only owns the index's fade-in, started on a slight delay after Hero's own
// exit begins so the two don't read as one hard simultaneous swap.
const REVEAL_STAGGER_MS = 80;
const REVEAL_FADE_DURATION = 0.55;
const REVEAL_FADE_EASE = 'sine.inOut';
// Small gap after the crossfade finishes before the nav/heading polish
// plays, and again before we hand off to the real (unwrapped, scrollable)
// index page — see CaseStudiesIndexPage's own revealPolishAt prop.
const POLISH_DELAY_MS = 60;
const POLISH_DURATION_MS = 200;

function HomeContent() {
  const { view, finishLoading, explore, finishExpand, goHome } = useViewState();
  const [cameFromLoader] = useState(view === 'loading');
  const [backgroundVisible, setBackgroundVisible] = useState(!cameFromLoader);
  const [heroReady, setHeroReady] = useState(!cameFromLoader);
  const [aboutOpen, setAboutOpen] = useState(false);
  const revealElRef = useRef<HTMLDivElement>(null);
  const [revealPolishAt, setRevealPolishAt] = useState<number | null>(null);

  function handleLoaderExitComplete() {
    setBackgroundVisible(true);
    setTimeout(() => setHeroReady(true), REVEAL_PAUSE_MS);
  }

  function handleExplore() {
    explore();
    const el = revealElRef.current;
    if (!el) {
      finishExpand();
      return;
    }

    gsap.to(el, {
      opacity: 1,
      duration: REVEAL_FADE_DURATION,
      ease: REVEAL_FADE_EASE,
      delay: REVEAL_STAGGER_MS / 1000,
      onComplete: () => {
        setRevealPolishAt(Date.now());
        setTimeout(() => finishExpand(), POLISH_DELAY_MS + POLISH_DURATION_MS);
      },
    });
  }

  // The fixed/no-scroll single-viewport treatment only applies to the
  // loader/hero/expanding stages — the case studies index page is a normal
  // scrollable page (its footer relies on real document scroll to reveal).
  useEffect(() => {
    if (view === 'index') {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  }, [view]);

  if (view === 'index') {
    return <CaseStudiesIndexPage onGoHome={goHome} />;
  }

  return (
    <Stage dark={!backgroundVisible}>
      <AnimatePresence onExitComplete={handleLoaderExitComplete}>
        {view === 'loading' && (
          <motion.div
            key="loader"
            style={{ position: 'absolute', inset: 0, zIndex: 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Loader onDone={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always mounted (once past the loader) so it's fully laid out and
          ready well before any click could happen — sits at opacity 0 (not
          display/visibility, so no layout shift once it fades in) until
          Explore Work crossfades it in (see handleExplore). pointerEvents
          stays off since this preview instance is never meant to be
          interacted with directly. */}
      {view !== 'loading' && (
        <div
          ref={revealElRef}
          className={styles.revealWrapper}
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          <CaseStudiesIndexPage onGoHome={goHome} revealPolishAt={revealPolishAt} previewMode />
        </div>
      )}

      {(view === 'hero' || view === 'expanding') && heroReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0, zIndex: 65 }}
        >
          <HomeChrome onOpenAbout={() => setAboutOpen(true)}>
            <div className={styles.cardCenter}>
              <Hero onOpenAbout={() => setAboutOpen(true)} onExplore={handleExplore} />
            </div>
          </HomeChrome>
        </motion.div>
      )}

      <AboutPanel open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </Stage>
  );
}

export default function HomePage() {
  return (
    <ViewStateProvider>
      <HomeContent />
    </ViewStateProvider>
  );
}
