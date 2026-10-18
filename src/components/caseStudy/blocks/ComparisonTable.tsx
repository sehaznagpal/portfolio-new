import { Check } from 'lucide-react';
import Reveal from './Reveal';
import type { ComparisonData, Mark } from './types';
import styles from './ComparisonTable.module.css';

const MARK_LABEL: Record<Mark, string> = { yes: 'Yes', partial: 'Partial', no: 'No' };

/* Yes / Partial / No as an icon chip (filled with a tick, half filled,
   empty), with the word for assistive tech, so meaning never rests on
   colour alone. */
function MarkChip({ mark }: { mark: Mark }) {
  return (
    <span className={styles.mark} data-mark={mark}>
      {mark === 'yes' && <Check size={12} strokeWidth={3} aria-hidden="true" />}
      <span className={styles.visuallyHidden}>{MARK_LABEL[mark]}</span>
    </span>
  );
}

/* Options as columns, criteria as rows, the proposal's column highlighted
   in the case accent. Scrolls sideways on narrow screens with the criteria
   column held in place. */
export default function ComparisonTable({ table, caption }: { table: ComparisonData; caption?: string }) {
  return (
    <Reveal>
      <figure className={styles.figure}>
        <ul className={styles.legend} aria-hidden="true">
          {(['yes', 'partial', 'no'] as Mark[]).map((mark) => (
            <li key={mark} className={styles.legendItem}>
              <MarkChip mark={mark} />
              {MARK_LABEL[mark]}
            </li>
          ))}
        </ul>
        <div className={styles.scroll} tabIndex={0} role="region" aria-label={caption ?? 'Comparison table'}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.corner}>
                  <span className={styles.visuallyHidden}>Criteria</span>
                </th>
                {table.columns.map((column) => (
                  <th key={column.name} scope="col" className={styles.column} data-highlight={column.highlight}>
                    {column.name}
                    {column.note && <span className={styles.note}>{column.note}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className={styles.criterion}>
                    {row.label}
                  </th>
                  {row.marks.map((mark, i) => (
                    <td key={table.columns[i].name} className={styles.cell} data-highlight={table.columns[i].highlight}>
                      <MarkChip mark={mark} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}
