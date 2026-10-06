import { useIsDesktopCarousel } from '../../lib/useIsDesktopCarousel';
import DesktopCarousel from '../caseStudiesIndex/DesktopCarousel';
import MobileCarousel from '../caseStudiesIndex/MobileCarousel';
import styles from './WorkSection.module.css';

export default function WorkSection() {
  const isDesktopCarousel = useIsDesktopCarousel();

  return (
    <div className={styles.section}>
      {/* Holds the fixed nav's place (see HomePage). */}
      <div className={styles.navSpace} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.heading}>
          <span className={styles.headingItalic}>Featured</span> Work
        </p>
        {isDesktopCarousel ? <DesktopCarousel /> : <MobileCarousel />}
      </div>
    </div>
  );
}
