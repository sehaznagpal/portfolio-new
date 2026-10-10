import styles from './ComparisonTable.module.css';

type Mark = 'yes' | 'partial' | 'no';

export interface ComparisonData {
  columns: { name: string; note?: string; highlight?: boolean }[];
  rows: { label: string; marks: Mark[] }[];
}

const MARK_LABEL: Record<Mark, string> = { yes: 'Yes', partial: 'Partial', no: 'No' };

function Dot({ mark }: { mark: Mark }) {
  return <span className={styles.dot} data-mark={mark} aria-hidden="true" />;
}

/* Platforms against authenticity criteria, ported from the old site's
   ComparisonTable. Each mark is a dot plus a visually hidden word, so it
   never relies on the dot's fill alone. Scrolls sideways inside the band on
   narrow screens, with the criteria column pinned. */
export default function ComparisonTable({ columns, rows }: ComparisonData) {
  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td className={styles.corner} />
              {columns.map((column) => (
                <th key={column.name} scope="col" className={styles.colHead} data-highlight={column.highlight}>
                  <span className={styles.colName}>{column.name}</span>
                  {column.note && <span className={styles.colNote}>{column.note}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className={styles.rowLabel}>
                  {row.label}
                </th>
                {row.marks.map((mark, i) => (
                  <td key={columns[i].name} data-highlight={columns[i].highlight}>
                    <Dot mark={mark} />
                    <span className={styles.visuallyHidden}>{MARK_LABEL[mark]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className={styles.legend} aria-hidden="true">
        {(Object.keys(MARK_LABEL) as Mark[]).map((mark) => (
          <li key={mark}>
            <Dot mark={mark} /> {MARK_LABEL[mark]}
          </li>
        ))}
      </ul>
    </figure>
  );
}
