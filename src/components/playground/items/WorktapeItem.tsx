import { useEffect, useRef } from 'react';
import cassette from '../../../assets/images/playground/worktape/cassette.webp';
import cassetteFrosted from '../../../assets/images/playground/worktape/cassette-frosted.webp';
import title from '../../../assets/images/playground/worktape/title.webp';
import accessTag from '../../../assets/images/playground/worktape/access-tag.webp';
import vibeCoded from '../../../assets/images/playground/worktape/vibe-coded.webp';
import focus from './focus.module.css';
import styles from './WorktapeItem.module.css';

const POP_MS = 560;
/* In Figma units: the cassette pops up and a little to the right, drops
   back just past its seat, bounces up once and settles. */
const POP_FRAMES = [
  { dx: 0, dy: 0, rotate: 0, offset: 0, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' },
  { dx: 10, dy: -150, rotate: -3, offset: 0.34, easing: 'cubic-bezier(0.5, 0, 0.9, 0.5)' },
  { dx: 0, dy: 4, rotate: 0, offset: 0.64, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' },
  { dx: 0, dy: -14, rotate: 0, offset: 0.82, easing: 'cubic-bezier(0.5, 0, 0.9, 0.5)' },
  { dx: 0, dy: 0, rotate: 0, offset: 1 },
];

/* Worktape: a cassette behind a frosted cover. On hover the cassette pops
   out and springs back with one bounce. It plays once per hover, finishes
   even if the pointer leaves, and never restarts while it's running.
   The frosted look is a pre-blurred copy of the cassette inside the glass
   window that moves in step with the sharp one. */
export default function WorktapeItem({ autoHover, onOpen }: { autoHover: boolean; onOpen: () => void }) {
  const cassetteRef = useRef<HTMLSpanElement>(null);
  const frostedRef = useRef<HTMLSpanElement>(null);
  const runningRef = useRef<Animation[]>([]);

  function pop() {
    if (runningRef.current.some((animation) => animation.playState === 'running')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sharp = cassetteRef.current;
    const frosted = frostedRef.current;
    if (!sharp || !frosted) return;
    const unit = parseFloat(getComputedStyle(sharp).getPropertyValue('--cu')) || 1;
    const frames = POP_FRAMES.map(({ dx, dy, rotate, offset, easing }) => ({
      transform: `translate(${dx * unit}px, ${dy * unit}px) rotate(${rotate}deg)`,
      offset,
      ...(easing && { easing }),
    }));
    runningRef.current = [sharp, frosted].map((el) => el.animate(frames, { duration: POP_MS }));
  }

  useEffect(() => {
    if (autoHover) pop();
  }, [autoHover]);

  useEffect(() => () => runningRef.current.forEach((animation) => animation.cancel()), []);

  return (
    <button
      type="button"
      className={`${styles.root} ${focus.focusable}`}
      aria-haspopup="dialog"
      aria-label="Worktape, a widget for Mac"
      onClick={onOpen}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') pop();
      }}
      onFocus={pop}
    >
      <span className={styles.panel} />
      <span ref={cassetteRef} className={styles.cassette}>
        <img src={cassette} alt="" width={766} height={400} draggable={false} />
      </span>
      <span className={styles.glass}>
        <span ref={frostedRef} className={styles.frosted}>
          <img src={cassetteFrosted} alt="" width={766} height={400} draggable={false} />
        </span>
        <span className={styles.tint} />
      </span>
      <img className={styles.title} src={title} alt="" width={814} height={144} draggable={false} />
      <img className={styles.accessTag} src={accessTag} alt="" width={457} height={170} draggable={false} />
      <img className={styles.vibeCoded} src={vibeCoded} alt="" width={140} height={40} draggable={false} />
    </button>
  );
}
