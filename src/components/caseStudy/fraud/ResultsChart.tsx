import { useId, useState } from 'react';
import styles from './ResultsChart.module.css';

export type BarTone = 'control' | 'warning' | 'cta';

export interface BarGroup {
  /* Omitted for a single, ungrouped set of bars. */
  label?: string;
  bars: { label: string; value: number; tone: BarTone }[];
}

const TICKS = [0, 25, 50, 75, 100];

/* Horizontal bar chart (0 to 100%) with every bar labelled by its group and
   value, so identity never rests on colour. The interpretation overlay
   shows on hover with a fine pointer, and toggles on tap or keyboard. */
export default function ResultsChart({
  title,
  groups,
  interpretation,
}: {
  title: string;
  groups: BarGroup[];
  interpretation: string;
}) {
  const [open, setOpen] = useState(false);
  const overlayId = useId();

  return (
    <figure className={styles.card} data-open={open}>
      <figcaption className={styles.title}>{title}</figcaption>

      <div className={styles.plot}>
        <div className={styles.axis} aria-hidden="true">
          {TICKS.map((tick) => (
            <span key={tick} className={styles.tick} style={{ left: `${tick}%` }}>
              {tick}%
            </span>
          ))}
        </div>

        {groups.map((group, i) => (
          <div key={group.label ?? i} className={styles.group}>
            {group.label && <p className={styles.groupLabel}>{group.label}</p>}
            {group.bars.map((bar) => (
              <div key={bar.label} className={styles.row}>
                <span className={styles.rowLabel}>{bar.label}</span>
                <span className={styles.track}>
                  {TICKS.map((tick) => (
                    <span key={tick} className={styles.gridLine} style={{ left: `${tick}%` }} />
                  ))}
                  <span className={styles.bar} data-tone={bar.tone} style={{ width: `${bar.value}%` }} />
                  <span className={styles.value} style={{ left: `${bar.value}%` }}>
                    {bar.value.toFixed(1)}%
                  </span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={overlayId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.toggleLabel}>{open ? 'Hide interpretation' : 'Interpretation'}</span>
      </button>

      <div id={overlayId} className={styles.overlay}>
        <p className={styles.overlayHeading}>Interpretation:</p>
        <p className={styles.overlayText}>{interpretation}</p>
      </div>
    </figure>
  );
}
