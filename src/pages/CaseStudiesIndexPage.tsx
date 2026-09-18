import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useIsDesktopCarousel } from '../lib/useIsDesktopCarousel';
import { CASE_STUDIES, DEFAULT_ACTIVE_INDEX } from '../data/caseStudies';
import DesktopCarousel from '../components/caseStudiesIndex/DesktopCarousel';
import MobileCarousel from '../components/caseStudiesIndex/MobileCarousel';
import Footer from '../components/footer/Footer';
import styles from './CaseStudiesIndexPage.module.css';

export default function CaseStudiesIndexPage({
  onGoHome,
  revealPolishAt,
  previewMode,
}: {
  onGoHome: () => void;
  /* Set by HomePage's scale+crossfade transition (see its own comments) the
     instant the Featured Work fade-in finishes — plays a small, purely
     decorative fade/slide flourish on the nav + heading as a final "arrived"
     beat. Everything else on this page (the carousel, the button) stays
     completely static throughout — the crossfade itself does all the
     "unveiling" work, nothing here animates in separately. Left unset for
     any other way of reaching this page (direct nav, browser back, etc.),
     which skips the effect — nav/heading just render normally, already
     fully visible. */
  revealPolishAt?: number | null;
  /* True only for the always-mounted, opacity-0 instance HomePage keeps
     ready underneath the hero (see HomePage.tsx). Skips stickySpacer +
     Footer — which exist purely to make room for scrolling past this section
     later — so the whole page renders at exactly one viewport height with
     nothing overflowing it. */
  previewMode?: boolean;
}) {
  const navigate = useNavigate();
  const isDesktopCarousel = useIsDesktopCarousel();
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const activeStudy = CASE_STUDIES[activeIndex];
  const navRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!revealPolishAt) return;
    const targets = [navRef.current, headingRef.current].filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;
    gsap.fromTo(
      targets,
      { opacity: 0.85, y: 12 },
      { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
    );
  }, [revealPolishAt]);

  const mainContent = (
    <div className={styles.mainContent}>
      <nav ref={navRef} className={styles.nav}>
        <button type="button" className={styles.brand} onClick={onGoHome}>
          <span className={styles.brandItalic}>Sehaz</span> Nagpal
        </button>
        <a className={styles.playground} href="/experiment-zone">
          playground
          <ArrowUpRight className={styles.playgroundArrow} size={14} strokeWidth={2} />
        </a>
      </nav>

      <div className={styles.hero} id="featured-work">
        <p ref={headingRef} className={styles.heading}>
          <span className={styles.headingItalic}>Featured</span> Work
        </p>

        {isDesktopCarousel ? (
          <DesktopCarousel onActiveChange={setActiveIndex} />
        ) : (
          <MobileCarousel onActiveChange={setActiveIndex} />
        )}

        <button type="button" className={styles.exploreButton} onClick={() => navigate(activeStudy.href)}>
          Explore Case Study
        </button>
      </div>
    </div>
  );

  if (previewMode) {
    return <div className={styles.page}>{mainContent}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.stickySpacer}>{mainContent}</div>
      <Footer />
    </div>
  );
}
