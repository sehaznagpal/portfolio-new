import { ArrowUpRight } from 'lucide-react';
import CursorTooltip from '../chrome/CursorTooltip';
import SweepButton from '../chrome/SweepButton';
import styles from './SiteNav.module.css';

export type NavSurface = 'light' | 'dark';

/* The one top nav shared by the hero (light surface, dark text) and the
   work index (dark surface, light text). Playground is intentionally not
   wired to anything yet. */
export default function SiteNav({
  surface,
  onHome,
  onAbout,
  onWork,
}: {
  surface: NavSurface;
  onHome: () => void;
  onAbout: () => void;
  onWork: () => void;
}) {
  // Tooltip pill contrasts with the surface it sits on.
  const tooltipVariant = surface === 'light' ? 'dark' : 'light';

  return (
    <nav className={`${styles.nav} ${styles[surface]}`} aria-label="Main">
      <button type="button" className={styles.brand} onClick={onHome}>
        <span className={styles.brandItalic}>sehaz</span> nagpal
      </button>

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
