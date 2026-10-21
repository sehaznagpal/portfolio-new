import extrasHeart from '../../../assets/images/playground/extras-heart.svg';
import aLetter from '../../../assets/images/playground/extras-a-letter.svg';
import cornerHeart from '../../../assets/images/playground/extras-corner-tl.svg';
import lettersNone from '../../../assets/images/playground/extras-letters-default.svg';
import lettersTl from '../../../assets/images/playground/extras-letters-tl.svg';
import lettersTr from '../../../assets/images/playground/extras-letters-tr.svg';
import lettersBl from '../../../assets/images/playground/extras-letters-bl.svg';
import lettersBr from '../../../assets/images/playground/extras-letters-br.svg';
import grain from './grain.module.css';
import styles from './ExtrasCardFace.module.css';

export type ExtrasLean = 'none' | 'tl' | 'tr' | 'bl' | 'br';

/* Each corner lean keeps its own exact Figma inset (see the CSS). */
const LETTERS: Record<ExtrasLean, { src: string; className: string }> = {
  none: { src: lettersNone, className: styles.lettersNone },
  tl: { src: lettersTl, className: styles.lettersTl },
  tr: { src: lettersTr, className: styles.lettersTr },
  bl: { src: lettersBl, className: styles.lettersBl },
  br: { src: lettersBr, className: styles.lettersBr },
};

function CornerIndex({ end = false }: { end?: boolean }) {
  return (
    <span className={`${styles.corner} ${end ? styles.cornerEnd : ''}`}>
      <img src={aLetter} alt="" className={styles.cornerLetter} draggable={false} />
      <img src={cornerHeart} alt="" className={styles.cornerHeart} draggable={false} />
    </span>
  );
}

/* The Extras playing card, drawn the same everywhere it appears (canvas,
   grid and the Extras modal). It fills its box, which should keep the card's
   290:346 shape. The bottom-right index is the top-left one turned 180deg,
   so the two corners always mirror exactly. */
export default function ExtrasCardFace({ lean = 'none', className = '' }: { lean?: ExtrasLean; className?: string }) {
  const letters = LETTERS[lean];
  return (
    <span className={`${styles.card} ${className}`}>
      <span className={`${styles.face} ${grain.grain}`}>
        <CornerIndex />
        <CornerIndex end />
        <img src={extrasHeart} alt="" className={styles.heart} draggable={false} />
        <img src={letters.src} alt="" className={letters.className} draggable={false} />
      </span>
    </span>
  );
}
