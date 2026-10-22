import { useEffect, useRef, useState } from 'react';
import { COLUMNS_NAME } from '../morph';
import styles from './ColumnSwitcher.module.css';

export type Columns = 1 | 2 | 3;

/* A small dark pill fixed at the middle of the right edge. At rest it shows
   one line per current column; hovering or focusing it (or tapping it on a
   touch screen) opens it to the numbers, the current one highlighted. */
export default function ColumnSwitcher({
  value,
  options,
  onChange,
}: {
  value: Columns;
  options: Columns[];
  onChange: (columns: Columns) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // A tap anywhere else closes it again.
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={{ viewTransitionName: COLUMNS_NAME }}
      data-open={open || undefined}
      data-count={options.length}
      role="group"
      aria-label="Columns"
    >
      <span className={styles.pill} aria-hidden="true">
        <span className={styles.capTop} />
        <span className={styles.middle} />
        <span className={styles.capBottom} />
      </span>
      <button
        type="button"
        className={styles.handle}
        aria-label={`${value} ${value === 1 ? 'column' : 'columns'}, change`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {Array.from({ length: value }, (_, i) => (
          <span key={i} className={styles.line} />
        ))}
      </button>
      <span className={styles.options}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={styles.option}
            aria-pressed={option === value}
            aria-label={`${option} ${option === 1 ? 'column' : 'columns'}`}
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
          >
            {option}
          </button>
        ))}
      </span>
    </div>
  );
}
