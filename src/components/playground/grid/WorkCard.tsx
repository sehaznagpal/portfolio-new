import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import type { PlaygroundItem } from '../../../data/playgroundItems';
import { ARTWORK_BOXES } from '../canvas/canvasLayout';
import WorkArtwork from '../items/WorkArtwork';
import styles from './WorkCard.module.css';

const noop = () => {};
const LIFT = { y: -4, transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] } } as const;

/* One work item as a grid tile: its canvas artwork, centred and sized to
   fit the tile (never stretched), with a "title · type" tag. The artwork is
   inert (no hover animation, no inner buttons); the whole tile is one link
   or button laid over it. The tile, artwork and tag all take part in the
   grid's layout animation, so nothing squashes while the columns change. */
export default function WorkCard({
  item,
  onOpenModal,
}: {
  item: PlaygroundItem;
  onOpenModal: (item: PlaygroundItem) => void;
}) {
  const box = ARTWORK_BOXES[item.id];
  const { action } = item;

  return (
    <motion.div layout className={styles.tile} whileHover={LIFT}>
      <motion.div
        layout
        className={styles.art}
        style={{ '--art-w': box.w, '--art-h': box.h } as CSSProperties}
        inert
      >
        <WorkArtwork id={item.id} autoHover={false} onOpen={noop} />
      </motion.div>
      <span className={styles.tagRow}>
        <motion.span layout="position" className={styles.tag}>
          {item.title} · {item.type}
        </motion.span>
      </span>
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
    </motion.div>
  );
}
