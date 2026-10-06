import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../components/loader/Loader';
import AboutPanel from '../components/chrome/AboutPanel';
import SiteNav, { type NavSurface } from '../components/nav/SiteNav';
import HeroSection from '../components/home/HeroSection';
import WorkSection from '../components/home/WorkSection';
import Footer from '../components/footer/Footer';
import { useSectionNav, type SectionId } from '../lib/useSectionNav';
import styles from './HomePage.module.css';

const LOADER_SEEN_KEY = 'portfolio:loader-seen';

function hasSeenLoader(): boolean {
  try {
    return sessionStorage.getItem(LOADER_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markLoaderSeen(): void {
  try {
    sessionStorage.setItem(LOADER_SEEN_KEY, '1');
  } catch {
    // sessionStorage unavailable (e.g. private browsing): the loader just replays next visit
  }
}

/* Brief hold between the loader clearing and the hero starting, so the two
   don't read as one abrupt cut. */
const REVEAL_PAUSE_MS = 400;
const LOADER_EXIT = { duration: 0.55, ease: [0.16, 1, 0.3, 1] } as const;

/* "/" is three full-screen sections: hero, work index, footer. On desktop
   they're stacked layers moved one gesture at a time (see useSectionNav and
   HomePage.module.css); on touch they're plain native scroll-snap. */
export default function HomePage() {
  const [loading, setLoading] = useState(() => !hasSeenLoader());
  const [backgroundVisible, setBackgroundVisible] = useState(!loading);
  const [heroReady, setHeroReady] = useState(!loading);
  const [aboutOpen, setAboutOpen] = useState(false);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { section, jumped, goTo, gestureMode, layerRefs } = useSectionNav({ enabled: !loading && !aboutOpen });

  useEffect(
    () => () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    },
    [],
  );

  function finishLoading() {
    markLoaderSeen();
    setLoading(false);
  }

  function handleLoaderExitComplete() {
    setBackgroundVisible(true);
    revealTimerRef.current = setTimeout(() => setHeroReady(true), REVEAL_PAUSE_MS);
  }

  const openAbout = () => setAboutOpen(true);

  function renderNav(surface: NavSurface) {
    return (
      <SiteNav
        surface={surface}
        onHome={() => goTo('hero')}
        onAbout={openAbout}
        onWork={() => goTo('work')}
      />
    );
  }

  function layerProps(id: SectionId) {
    return {
      ref: layerRefs[id],
      className: `${styles.layer} ${styles[`${id}Layer`]}`,
      inert: gestureMode && section !== id,
    };
  }

  return (
    <>
      <div
        className={`${gestureMode ? styles.stack : styles.scroller} ${loading ? styles.locked : ''}`}
        data-section={section}
        data-jumped={jumped || undefined}
      >
        <div {...layerProps('hero')}>
          <HeroSection
            nav={renderNav('light')}
            backgroundVisible={backgroundVisible}
            ready={heroReady}
            onOpenAbout={openAbout}
            onExplore={() => goTo('work')}
          />
        </div>
        <div {...layerProps('work')}>
          <WorkSection nav={renderNav('dark')} />
        </div>
        <div {...layerProps('footer')}>
          <Footer
            onHome={() => goTo('hero')}
            onWork={() => goTo('work')}
            shapeKeysActive={section === 'footer'}
          />
        </div>
      </div>

      <AnimatePresence onExitComplete={handleLoaderExitComplete}>
        {loading && (
          <motion.div key="loader" className={styles.loaderLayer} exit={{ opacity: 0 }} transition={LOADER_EXIT}>
            <Loader onDone={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      <AboutPanel open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
