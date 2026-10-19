import { useState, type MouseEvent } from 'react';
import extrasHeart from '../../../assets/images/playground/extras-heart.svg';
import extrasALetter from '../../../assets/images/playground/extras-a-letter.svg';
import extrasCornerTl from '../../../assets/images/playground/extras-corner-tl.svg';
import extrasCornerBr from '../../../assets/images/playground/extras-corner-br.svg';
import lettersNone from '../../../assets/images/playground/extras-letters-default.svg';
import lettersTl from '../../../assets/images/playground/extras-letters-tl.svg';
import lettersTr from '../../../assets/images/playground/extras-letters-tr.svg';
import lettersBl from '../../../assets/images/playground/extras-letters-bl.svg';
import lettersBr from '../../../assets/images/playground/extras-letters-br.svg';
import focus from './focus.module.css';
import grain from './grain.module.css';
import styles from './ExtrasItem.module.css';

type Quadrant = 'none' | 'tl' | 'tr' | 'bl' | 'br';

/* Each corner lean keeps its own exact Figma inset (see the CSS). */
const LETTERS: Record<Quadrant, { src: string; className: string }> = {
  none: { src: lettersNone, className: styles.lettersNone },
  tl: { src: lettersTl, className: styles.lettersTl },
  tr: { src: lettersTr, className: styles.lettersTr },
  bl: { src: lettersBl, className: styles.lettersBl },
  br: { src: lettersBr, className: styles.lettersBr },
};

/* Extras playing card: the EXTRAS lettering leans toward whichever corner
   the cursor is over. The touch auto-hover shows the top-right lean. */
export default function ExtrasItem({ autoHover, onOpen }: { autoHover: boolean; onOpen: () => void }) {
  const [quadrant, setQuadrant] = useState<Quadrant>('none');
  const letters = LETTERS[autoHover ? 'tr' : quadrant];

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const left = event.clientX - rect.left < rect.width / 2;
    const top = event.clientY - rect.top < rect.height / 2;
    setQuadrant(top ? (left ? 'tl' : 'tr') : left ? 'bl' : 'br');
  }

  return (
    <button
      type="button"
      className={`${styles.root} ${focus.focusable}`}
      aria-haspopup="dialog"
      aria-label="Extras, a few small illustrations"
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setQuadrant('none')}
    >
      <span className={`${styles.card} ${grain.grain}`}>
        <img src={extrasALetter} alt="" className={styles.cornerTl} />
        <img src={extrasCornerTl} alt="" className={styles.iconTl} />
        <img src={extrasALetter} alt="" className={styles.cornerBr} />
        <img src={extrasCornerBr} alt="" className={styles.iconBr} />
        <img src={extrasHeart} alt="" className={styles.heart} />
        <img src={letters.src} alt="" className={letters.className} />
      </span>
    </button>
  );
}
