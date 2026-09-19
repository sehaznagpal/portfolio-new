import { ArrowUpRight } from 'lucide-react';
import CursorTooltip from './CursorTooltip';
import styles from './PlaygroundLink.module.css';

/* Bottom-right corner link to the (not-yet-built) experiment zone. Per the
   new Figma reference the visible label and the cursor tooltip swap roles
   from the pre-auto-layout build: the label now reads "Playground" and the
   trailing tooltip pill now reads "more designs and projects" (previously
   the reverse — label "More designs & smaller projects", tooltip
   "Playground"). Real navigation isn't wired yet since the Experiment Zone
   section hasn't been built out in this codebase. */
export default function PlaygroundLink() {
  return (
    <CursorTooltip text="more designs and projects" variant="dark">
      <button type="button" className={styles.link}>
        <span className={styles.fill} aria-hidden="true" />
        <span className={styles.label}>
          playground
          <ArrowUpRight
            className={styles.arrow}
            size={18}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </span>
      </button>
    </CursorTooltip>
  );
}
