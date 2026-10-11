import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import ReadingProgress from '../article/ReadingProgress';
import Footer from '../footer/Footer';
import type { FooterPhoto } from '../../data/footerPhotos';
import { readCaseTheme, switchCaseTheme, type CaseTheme } from '../../lib/caseTheme';
import BackLink from './BackLink';
import CaseStudyRail, { type RailItem } from './CaseStudyRail';
import LampSwitch from './LampSwitch';
import styles from './CaseStudyLayout.module.css';

/* Shell shared by every case study page (no site nav): a sticky strip with
   the reading progress bar (and the back pill on tablet/mobile), the back
   button and section index in the left gutter on desktop, the page content,
   and the footer (with the case study's own photo) revealed underneath it.
   Progress tracks `children` only; `after` (e.g. the end links) sits below
   it, outside the measured content. The lamp at the top-right switches the
   reading mode, set as data-theme on the page (not the footer), with the
   case's lamp and light-mode tag colours. */
export default function CaseStudyLayout({
  children,
  after,
  footerPhoto,
  index,
  lampColor,
  tagColor,
}: {
  children: ReactNode;
  after?: ReactNode;
  footerPhoto: FooterPhoto;
  index: RailItem[];
  lampColor: string;
  tagColor: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<CaseTheme>(readCaseTheme);

  return (
    <>
      <div
        ref={pageRef}
        className={styles.page}
        data-theme={theme}
        style={{ '--case-lamp': lampColor, '--case-tag-light': tagColor } as CSSProperties}
      >
        <div className={styles.header}>
          <BackLink className={styles.headerBack} />
          <LampSwitch
            theme={theme}
            onSwitch={(origin) =>
              switchCaseTheme(theme === 'dark' ? 'light' : 'dark', setTheme, origin, pageRef.current)
            }
          />
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
