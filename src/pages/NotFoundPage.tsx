import SweepButton from '../components/chrome/SweepButton';
import { LINKS } from '../data/links';
import { usePageMeta } from '../lib/usePageMeta';
import styles from './NotFoundPage.module.css';

const NOTE = 'this portfolio was built in the spirit of exploration. but if you are lost:';

/* Any address the site doesn't have (Figma 1461:1141 desktop, 1461:1187
   mobile): a note and a link home over a giant decorative "404". */
export default function NotFoundPage() {
  usePageMeta({
    page: 'Page not found',
    description: 'This portfolio was built in the spirit of exploration.',
    noindex: true,
  });

  return (
    <main className={styles.page}>
      <h1 className={styles.visuallyHidden}>Page not found</h1>
      <p className={styles.digits} aria-hidden="true">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </p>
      <div className={styles.message}>
        {/* Highlights and text on separate layers that wrap identically, so
            no line's highlight paints over the descenders above it. */}
        <p className={styles.line}>
          <span className={styles.highlight} aria-hidden="true">
            {NOTE}
          </span>
          <span className={styles.text}>{NOTE}</span>
        </p>
        <SweepButton to={LINKS.home} className={styles.home}>
          <span className={styles.arrow} aria-hidden="true">
            ←
          </span>
          go to home
        </SweepButton>
      </div>
    </main>
  );
}
