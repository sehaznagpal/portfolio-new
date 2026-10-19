import type { CSSProperties, ReactNode } from 'react';
import type { PlaygroundItem } from '../../../data/playgroundItems';
import IntroNote from './IntroNote';
import LetterNote from './LetterNote';
import ContactNote from './ContactNote';
import styles from './PlaygroundCard.module.css';

const NOTES = { intro: IntroNote, letter: LetterNote, contact: ContactNote };

/* One frame for every item, on the canvas and in the grid: the item's
   artwork (or note) on a paper card, with a "title · type" caption below.
   A modal item is a button, a link item opens in a new tab. On the canvas
   `width` fixes the card's size; in the grid it fills its column. */
export default function PlaygroundCard({
  item,
  onOpenModal,
  width,
  style,
}: {
  item: PlaygroundItem;
  onOpenModal: (item: PlaygroundItem) => void;
  width?: number;
  style?: CSSProperties;
}) {
  const Note = item.note ? NOTES[item.note] : null;
  const frame = (
    <span className={`${styles.frame} ${Note ? styles.noteFrame : ''}`}>
      {Note ? (
        <Note />
      ) : (
        item.thumbnail && (
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
  const cardStyle = { ...style, ...(width && { width }) };
  const { action } = item;

  if (action && 'href' in action) {
    return (
      <a className={`${styles.card} ${styles.interactive}`} style={cardStyle} href={action.href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }
  if (action) {
    return (
      <button
        type="button"
        className={`${styles.card} ${styles.interactive}`}
        style={cardStyle}
        aria-haspopup="dialog"
        onClick={() => onOpenModal(item)}
      >
        {body}
      </button>
    );
  }
  return (
    <div className={styles.card} style={cardStyle}>
      {body}
    </div>
  );
}
