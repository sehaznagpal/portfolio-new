import type { CSSProperties } from 'react';
import { useRevealOnce } from '../../../lib/useRevealOnce';
import VisualCaption from '../../article/VisualCaption';
import styles from './StepFlow.module.css';

interface Flow {
  label: string;
  steps: string[];
}

export interface StepFlowData {
  /* The long way round, muted. */
  before: Flow;
  /* The shortened flow, highlighted. */
  after: Flow;
  caption: string;
}

function Column({ flow, variant }: { flow: Flow; variant: 'before' | 'after' }) {
  return (
    <div className={styles.column} data-variant={variant}>
      <p className={styles.label}>{flow.label}</p>
      <ol className={styles.steps}>
        {flow.steps.map((step, i) => (
          <li key={step} className={styles.step} style={{ '--i': i } as CSSProperties}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Two step flows side by side, so the shorter one reads as shorter at a
   glance. Steps appear one by one, both columns in step, the first time
   the flow scrolls into view. */
export default function StepFlow({ before, after, caption }: StepFlowData) {
  const [ref, revealed] = useRevealOnce<HTMLDivElement>();

  return (
    <figure className={styles.figure}>
      <div ref={ref} className={styles.columns} data-revealed={revealed}>
        <Column flow={before} variant="before" />
        <Column flow={after} variant="after" />
      </div>
      <VisualCaption>{caption}</VisualCaption>
    </figure>
  );
}
