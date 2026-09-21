import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useIsDesktopCarousel } from '../lib/useIsDesktopCarousel';
import { DEFAULT_ACTIVE_INDEX } from '../data/caseStudies';
import DesktopCarousel from '../components/caseStudiesIndex/DesktopCarousel';
import MobileCarousel from '../components/caseStudiesIndex/MobileCarousel';
import Footer from '../components/footer/Footer';
import CursorTooltip from '../components/chrome/CursorTooltip';
import styles from './CaseStudiesIndexPage.module.css';

export default function CaseStudiesIndexPage({
  onGoHome,
  revealPolishAt,
  previewMode,
}: {
  onGoHome: () => void;
  /* Set by HomePage's scale+crossfade transition (see its own comments) the
     instant the Featured Work fade-in finishes — plays a small, purely
     decorative opacity settle on the nav + heading as a final "arrived"
     beat. Opacity only, deliberately no y/position movement — an earlier
     version slid these up from y: 12, which read as a bounce/landing jump
     right as the page took over; a plain fade keeps this feeling seamless.
     Everything else on this page (the carousel, the button) stays
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
  const isDesktopCarousel = useIsDesktopCarousel();
  const [, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const navRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!revealPolishAt) return;
    const targets = [navRef.current, headingRef.current].filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;
    gsap.fromTo(targets, { opacity: 0.85 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
  }, [revealPolishAt]);

  const mainContent = (
    <div className={styles.mainContent}>
      <nav ref={navRef} className={styles.nav}>
        <button type="button" className={styles.brand} onClick={onGoHome}>
          <span className={styles.brandItalic}>Sehaz</span> Nagpal
        </button>
        <CursorTooltip text="more designs and projects">
          <a className={styles.playground} href="/experiment-zone">
            <span className={styles.playgroundFill} aria-hidden="true" />
            <span className={styles.playgroundLabel}>
              playground
              <ArrowUpRight className={styles.playgroundArrow} size={14} strokeWidth={2} />
            </span>
          </a>
        </CursorTooltip>
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
