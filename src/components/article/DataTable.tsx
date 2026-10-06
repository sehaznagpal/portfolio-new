import styles from './DataTable.module.css';

/* Compact data table for the body column. The first column holds row
   headers; `label` names the table for assistive tech. */
export default function DataTable({
  label,
  columns,
  rows,
}: {
  label: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table} aria-label={label}>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([rowHeader, ...cells]) => (
            <tr key={rowHeader}>
              <th scope="row">{rowHeader}</th>
              {cells.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
