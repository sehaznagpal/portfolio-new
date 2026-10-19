import styles from './ViewToggle.module.css';

export type PlaygroundView = 'canvas' | 'grid';

const OPTIONS: { id: PlaygroundView; label: string }[] = [
  { id: 'canvas', label: 'Canvas' },
  { id: 'grid', label: 'Grid' },
];

/* "Canvas | Grid" segmented control, top centre. Plain buttons with
   aria-pressed, so Tab, Enter and Space all work. */
export default function ViewToggle({ view, onChange }: { view: PlaygroundView; onChange: (view: PlaygroundView) => void }) {
  return (
    <div className={styles.toggle} role="group" aria-label="Playground view">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={styles.option}
          aria-pressed={view === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
