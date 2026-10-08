import { useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteNav from '../nav/SiteNav';
import ReadingProgress from '../article/ReadingProgress';
import AboutPanel from '../about/AboutPanel';
import Footer from '../footer/Footer';
import type { FooterPhoto } from '../../data/footerPhotos';
import { LINKS } from '../../data/links';
import type { LinkSection } from '../../data/siteLinks';
import styles from './CaseStudyLayout.module.css';

/* Shell shared by every case study page: the site nav with a reading
   progress bar, the page content, and the footer (with the case study's
   own photo) revealed underneath it. Progress tracks `children` only;
   `after` (e.g. a closing link) sits below it, outside the measured content. */
export default function CaseStudyLayout({
  children,
  after,
  footerPhoto,
}: {
  children: ReactNode;
  after?: ReactNode;
  footerPhoto: FooterPhoto;
}) {
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const goToSection = (section: LinkSection) => navigate(section === 'work' ? LINKS.work : LINKS.home);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <SiteNav
            theme="dark"
            onHome={() => goToSection('hero')}
            onAbout={() => setAboutOpen(true)}
            onWork={() => goToSection('work')}
          />
          <ReadingProgress targetRef={contentRef} />
        </div>
        <main ref={contentRef} lang="en">
          {children}
        </main>
        {after}
      </div>
      <Footer photo={footerPhoto} />
      <AboutPanel
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onSection={(section) => {
          setAboutOpen(false);
          goToSection(section);
        }}
      />
    </>
  );
}
