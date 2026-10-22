import { useState, type MouseEvent } from 'react';
import ExtrasCardFace, { type ExtrasLean } from './ExtrasCardFace';
import focus from './focus.module.css';
import { play } from '../../../lib/sound/sound';
import styles from './ExtrasItem.module.css';

/* Extras playing card: the EXTRAS lettering leans toward whichever corner
   the cursor is over. The touch auto-hover shows the top-right lean. */
export default function ExtrasItem({ autoHover, onOpen }: { autoHover: boolean; onOpen: () => void }) {
  const [lean, setLean] = useState<ExtrasLean>('none');

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const left = event.clientX - rect.left < rect.width / 2;
    const top = event.clientY - rect.top < rect.height / 2;
    setLean(top ? (left ? 'tl' : 'tr') : left ? 'bl' : 'br');
  }

  return (
    <button
      type="button"
      className={`${styles.root} ${focus.focusable}`}
      aria-haspopup="dialog"
      aria-label="Extras, a few small illustrations"
      onClick={onOpen}
      onMouseEnter={() => play('flick')}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setLean('none')}
    >
      <ExtrasCardFace lean={autoHover ? 'tr' : lean} />
    </button>
  );
}
