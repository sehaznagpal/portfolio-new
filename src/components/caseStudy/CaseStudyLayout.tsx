import { useRef, type ReactNode } from 'react';
import ReadingProgress from '../article/ReadingProgress';
import Footer from '../footer/Footer';
import type { FooterPhoto } from '../../data/footerPhotos';
import BackLink from './BackLink';
import CaseStudyRail, { type RailItem } from './CaseStudyRail';
import styles from './CaseStudyLayout.module.css';

/* Shell shared by every case study page (no site nav): a sticky strip with
   the reading progress bar (and the back pill on tablet/mobile), the back
   button and section index in the left gutter on desktop, the page content,
   and the footer (with the case study's own photo) revealed underneath it.
   Progress tracks `children` only; `after` (e.g. the end links) sits below
   it, outside the measured content. */
export default function CaseStudyLayout({
  children,
  after,
  footerPhoto,
  index,
}: {
  children: ReactNode;
  after?: ReactNode;
  footerPhoto: FooterPhoto;
  index: RailItem[];
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <BackLink className={styles.headerBack} />
          <ReadingProgress targetRef={contentRef} />
        </div>
        <div className={styles.railAnchor}>
          <CaseStudyRail items={index} />
        </div>
        <main ref={contentRef} lang="en">
          {children}
        </main>
        {after}
      </div>
      <Footer photo={footerPhoto} />
    </>
  );
}
