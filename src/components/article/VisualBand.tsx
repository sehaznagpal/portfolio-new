import type { ReactNode } from 'react';
import { useRevealOnce } from '../../lib/useRevealOnce';
import type { VisualTone } from './types';
import VisualCaption from './VisualCaption';
import styles from './VisualBand.module.css';

/* Full-bleed band on the Home grid: a very large serif heading with the
   visual's box overlapping its lower part, and the band's caption centred
   below the box. Fades and rises in once on entering the viewport. */
export default function VisualBand({
  heading,
  tone,
  caption,
  children,
}: {
  heading: string;
  tone: VisualTone;
  caption?: string;
  children: ReactNode;
}) {
  const [ref, revealed] = useRevealOnce<HTMLDivElement>();

  return (
    <div className={styles.band} data-visual-band>
      <div ref={ref} className={styles.inner} data-revealed={revealed}>
        <h3 className={styles.heading}>{heading}</h3>
        <div className={styles.box} data-tone={tone}>
          {children}
        </div>
        {caption && (
          <VisualCaption as="p" className={styles.caption}>
            {caption}
          </VisualCaption>
        )}
      </div>
    </div>
  );
}
