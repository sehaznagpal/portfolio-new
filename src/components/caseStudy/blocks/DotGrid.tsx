import Reveal from './Reveal';
import styles from './DotGrid.module.css';

const COLUMNS = 12;
const STEP = 12;
const RADIUS = 4;

/* Groups of dots, one per person (or item), each group a different tint of
   the case accent, with its label and count. */
export default function DotGrid({ groups }: { groups: { label: string; count: number }[] }) {
  return (
    <Reveal>
      <div className={styles.grid}>
        {groups.map((group, g) => {
          const rows = Math.ceil(group.count / COLUMNS);
          return (
            <figure key={group.label} className={styles.group} data-tint={g % 3}>
              <svg
                className={styles.dots}
                viewBox={`0 0 ${COLUMNS * STEP} ${rows * STEP}`}
                role="img"
                aria-label={`${group.label}: ${group.count}`}
              >
                {Array.from({ length: group.count }, (_, i) => (
                  <circle
                    key={i}
                    cx={(i % COLUMNS) * STEP + STEP / 2}
                    cy={Math.floor(i / COLUMNS) * STEP + STEP / 2}
                    r={RADIUS}
                  />
                ))}
              </svg>
              <figcaption className={styles.label}>
                {group.label} <span className={styles.count}>{group.count}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Reveal>
  );
}
