import type { CSSProperties } from 'react';
import type { PlaygroundItem } from '../../../data/playgroundItems';
import WorkArtwork from '../items/WorkArtwork';
import styles from './WorkCard.module.css';

const noop = () => {};

/* One work item in the grid: its canvas artwork on a white card, scaled to
   the card's width. The artwork is inert (no hover animation, no inner
   buttons); the whole card is one link or button laid over it. Until the
   grid has measured itself, `layout` is null and the card takes one row. */
export default function WorkCard({
  item,
  layout,
  onOpenModal,
}: {
  item: PlaygroundItem;
  layout: { rows: number; cu: number } | null;
  onOpenModal: (item: PlaygroundItem) => void;
}) {
  const style = layout && ({ gridRowEnd: `span ${layout.rows}`, '--cu': `${layout.cu}px` } as CSSProperties);
  const { action } = item;

  return (
    <div
      className={`${styles.card} ${item.gridSize === 'wide' ? styles.wide : ''}`}
      style={style ?? undefined}
      data-id={item.id}
    >
      <div className={styles.art} inert>
        <WorkArtwork id={item.id} autoHover={false} onOpen={noop} />
      </div>
      {action && 'href' in action ? (
        <a className={styles.hit} href={action.href} target="_blank" rel="noopener noreferrer" aria-label={item.title} />
      ) : (
        <button
          type="button"
          className={styles.hit}
          aria-haspopup="dialog"
          aria-label={item.title}
          onClick={() => onOpenModal(item)}
        />
      )}
    </div>
  );
}
