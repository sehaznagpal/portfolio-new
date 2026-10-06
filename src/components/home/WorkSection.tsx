import type { ReactNode } from 'react';
import { useIsDesktopCarousel } from '../../lib/useIsDesktopCarousel';
import DesktopCarousel from '../caseStudiesIndex/DesktopCarousel';
import MobileCarousel from '../caseStudiesIndex/MobileCarousel';
import styles from './WorkSection.module.css';

export default function WorkSection({ nav }: { nav: ReactNode }) {
  const isDesktopCarousel = useIsDesktopCarousel();

  return (
    <div className={styles.section}>
      {nav}
      <div className={styles.content}>
        <p className={styles.heading}>
          <span className={styles.headingItalic}>Featured</span> Work
        </p>
        {isDesktopCarousel ? <DesktopCarousel /> : <MobileCarousel />}
      </div>
    </div>
  );
}
