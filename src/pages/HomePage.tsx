import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

function HomeContent() {
  const { view, finishLoading, finishExpand, goHome } = useViewState();
  const [cameFromLoader] = useState(view === 'loading');
  const [backgroundVisible, setBackgroundVisible] = useState(!cameFromLoader);
  const [heroReady, setHeroReady] = useState(!cameFromLoader);
  const [aboutOpen, setAboutOpen] = useState(false);

  function handleLoaderExitComplete() {
    setBackgroundVisible(true);
    setTimeout(() => setHeroReady(true), REVEAL_PAUSE_MS);
  }

  // Explore Work -> case studies index: an instant switch, no transition
  // animation. See Hero.tsx / DesktopCarousel.tsx for why: past attempts at a
  // flip/morph and a circular clip-path reveal both introduced more problems
  // (broken content, and — for the reveal — an opaque layer that hid Stage's
  // grid at rest and a Hero card that never actually faded) than they were
  // worth, and this is the version confirmed working, including the
  // coverflow's 3D rendering in Safari.
  function handleExplore() {
    finishExpand();
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

      {view === 'hero' && heroReady && (
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
