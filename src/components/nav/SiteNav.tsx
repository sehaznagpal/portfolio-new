import { ArrowUpRight } from 'lucide-react';
import CursorTooltip from '../chrome/CursorTooltip';
import SweepButton from '../chrome/SweepButton';
import mePhoto from '../../assets/images/nav/me-polaroid.webp';
import styles from './SiteNav.module.css';

/* light: dark text on the cream hero. dark: light text on the index.
   hidden: faded out (over the footer), and not clickable. */
export type NavTheme = 'light' | 'dark' | 'hidden';

const ME_PHOTO = { src: mePhoto, width: 89, height: 83 };

/* The one top nav on Home, fixed above the sections. Its colours follow the
   current section through `theme` and change in step with the section move.
   Playground is intentionally not wired to anything yet. */
export default function SiteNav({
  theme,
  onHome,
  onAbout,
  onWork,
}: {
  theme: NavTheme;
  onHome: () => void;
  onAbout: () => void;
  onWork: () => void;
}) {
  // Tooltip pill contrasts with the surface the nav sits on.
  const tooltipVariant = theme === 'light' ? 'dark' : 'light';

  return (
    <nav className={styles.nav} data-nav-theme={theme} aria-label="Main" inert={theme === 'hidden'}>
      <CursorTooltip image={ME_PHOTO}>
        <button type="button" className={styles.brand} onClick={onHome}>
          <span className={styles.brandItalic}>sehaz</span> nagpal
        </button>
      </CursorTooltip>

      <div className={styles.links}>
        <CursorTooltip text="Who am I?" variant={tooltipVariant}>
          <SweepButton className={styles.link} onClick={onAbout}>
            about
          </SweepButton>
        </CursorTooltip>
        <CursorTooltip text="featured work" variant={tooltipVariant}>
          <SweepButton className={styles.link} onClick={onWork}>
            work
          </SweepButton>
        </CursorTooltip>
        <CursorTooltip text="more designs and projects" variant={tooltipVariant}>
          <SweepButton className={styles.link}>
            playground
            <ArrowUpRight className={styles.arrow} size={14} strokeWidth={1.75} aria-hidden="true" />
          </SweepButton>
        </CursorTooltip>
      </div>
    </nav>
  );
}
