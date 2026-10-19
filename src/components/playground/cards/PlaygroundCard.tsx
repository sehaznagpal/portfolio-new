import type { ReactNode } from 'react';
import type { PlaygroundItem } from '../../../data/playgroundItems';
import IntroNote from './IntroNote';
import LetterNote from './LetterNote';
import ContactNote from './ContactNote';
import styles from './PlaygroundCard.module.css';

const NOTES = { intro: IntroNote, letter: LetterNote, contact: ContactNote };

/* A grid card: the item's thumbnail (or note) in a paper frame with a
   "title · type" caption below. A modal item is a button, a link item opens
   in a new tab. `banner` is the full-width intro; `tile` is a small card
   whose thumbnail sits in a fixed 4:3 box so the grid stays tidy. */
export default function PlaygroundCard({
  item,
  onOpenModal,
  variant,
}: {
  item: PlaygroundItem;
  onOpenModal: (item: PlaygroundItem) => void;
  variant: 'banner' | 'tile';
}) {
  const Note = item.note ? NOTES[item.note] : null;
  const frame = (
    <span className={`${styles.frame} ${Note ? styles.noteFrame : ''}`}>
      {Note ? (
        <Note />
      ) : (
        item.thumbnail && (
          <span className={styles.artBox}>
            <img
              className={styles.art}
            src={item.thumbnail.src}
            alt=""
            width={item.thumbnail.width}
            height={item.thumbnail.height}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </span>
        )
      )}
    </span>
  );
  const caption = (
    <span className={styles.caption}>
      {item.title} · {item.type}
      {item.year ? ` · ${item.year}` : ''}
    </span>
  );
  const body: ReactNode = (
    <>
      {frame}
      {caption}
    </>
  );
  const cardClass = `${styles.card} ${styles[variant]}`;
  const { action } = item;

  if (action && 'href' in action) {
    return (
      <a className={`${cardClass} ${styles.interactive}`} href={action.href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }
  if (action) {
    return (
      <button
        type="button"
        className={`${cardClass} ${styles.interactive}`}
        aria-haspopup="dialog"
        onClick={() => onOpenModal(item)}
      >
        {body}
      </button>
    );
  }
  return (
    <div className={cardClass}>
      {body}
    </div>
  );
}
