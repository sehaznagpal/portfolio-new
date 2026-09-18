import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsDesktopCarousel } from '../lib/useIsDesktopCarousel';
import { CASE_STUDIES, DEFAULT_ACTIVE_INDEX } from '../data/caseStudies';
import DesktopCarousel from '../components/caseStudiesIndex/DesktopCarousel';
import MobileCarousel from '../components/caseStudiesIndex/MobileCarousel';
import Footer from '../components/footer/Footer';
import styles from './CaseStudiesIndexPage.module.css';

export default function CaseStudiesIndexPage({ onGoHome }: { onGoHome: () => void }) {
  const navigate = useNavigate();
  const isDesktopCarousel = useIsDesktopCarousel();
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const activeStudy = CASE_STUDIES[activeIndex];

  return (
    <div className={styles.page}>
      <div className={styles.stickySpacer}>
        <div className={styles.mainContent}>
          <nav className={styles.nav}>
            <button type="button" className={styles.brand} onClick={onGoHome}>
              <span className={styles.brandItalic}>Sehaz</span> Nagpal
            </button>
            <a className={styles.playground} href="/experiment-zone">
              playground
              <ArrowUpRight className={styles.playgroundArrow} size={14} strokeWidth={2} />
            </a>
          </nav>

          <div className={styles.hero} id="featured-work">
            <p className={styles.heading}>
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
      </div>
      <Footer />
    </div>
  );
}
