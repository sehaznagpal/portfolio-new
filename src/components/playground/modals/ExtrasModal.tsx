import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PlaygroundModal from './PlaygroundModal';
import extrasCard from '../../../assets/images/playground/extras-modal/extras-card.webp';
import illustrationsTitle from '../../../assets/images/playground/extras-modal/illustrations-title.webp';
import mario from '../../../assets/images/playground/extras-modal/mario.webp';
import girlMs from '../../../assets/images/playground/extras-modal/girl-ms.webp';
import perry from '../../../assets/images/playground/extras-modal/perry.webp';
import monkeys from '../../../assets/images/playground/extras-modal/monkeys.webp';
import kids from '../../../assets/images/playground/extras-modal/kids.webp';
import cars from '../../../assets/images/playground/extras-modal/cars.webp';
import building from '../../../assets/images/playground/extras-modal/building.webp';
import reaper from '../../../assets/images/playground/extras-modal/reaper.webp';
import pixelHeart from '../../../assets/images/playground/extras-modal/pixel-heart.webp';
import wineGlass from '../../../assets/images/playground/extras-modal/wine-glass.webp';
import bedScene from '../../../assets/images/playground/extras-modal/bed-scene.webp';
import styles from './ExtrasModal.module.css';

const SCROLL_MS = 420;
// Each arrow press moves by this share of the visible track.
const SCROLL_STEP = 0.7;
const CARD_HEIGHT = 1589;

const CARDS = [
  { src: extrasCard, width: 1258, alt: 'Extras' },
  { src: illustrationsTitle, width: 1070, alt: 'Illustrations, made from scratch with nothing but tools and time' },
  { src: mario, width: 1071, alt: 'Mario-inspired platformer illustration' },
  { src: girlMs, width: 1070, alt: 'Girl drawing on a computer illustration' },
  { src: perry, width: 1071, alt: 'Perry the Platypus illustration' },
  { src: monkeys, width: 1070, alt: 'Four little monkey characters illustration' },
  { src: kids, width: 1071, alt: 'Family under one cloak illustration' },
  { src: cars, width: 1071, alt: 'Two cars illustration' },
  { src: building, width: 1071, alt: 'Building with a balcony illustration' },
  { src: reaper, width: 1070, alt: 'Grim reaper illustration' },
  { src: pixelHeart, width: 1070, alt: 'Pixel art heart and car illustration' },
  { src: wineGlass, width: 1070, alt: 'Wine glass illustration' },
  { src: bedScene, width: 1070, alt: 'Reading in bed illustration' },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* Illustration carousel. It remounts on every open, so it always starts on
   the first card. The track only moves with the arrows. Chromium
   ignores smooth scrollBy on an overflow-hidden element, so the scroll is
   animated by hand in rAF. */
export default function ExtrasModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    cancelAnimationFrame(frameRef.current);
    const from = track.scrollLeft;
    const distance = direction * track.clientWidth * SCROLL_STEP;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / SCROLL_MS);
      track.scrollLeft = from + distance * easeOutCubic(t);
      if (t < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  }

  return (
    <PlaygroundModal
      open={open}
      onClose={onClose}
      label="Extras, a few small illustrations"
      frameClassName={styles.frame}
      closeClassName={styles.close}
    >
      <button type="button" className={`${styles.nav} ${styles.navLeft}`} aria-label="Scroll left" onClick={() => scrollByCard(-1)}>
        <ChevronLeft size={20} strokeWidth={1.75} />
      </button>
      <button type="button" className={`${styles.nav} ${styles.navRight}`} aria-label="Scroll right" onClick={() => scrollByCard(1)}>
        <ChevronRight size={20} strokeWidth={1.75} />
      </button>
      <div className={styles.track} ref={trackRef}>
        {CARDS.map((card) => (
          <img
            key={card.alt}
            className={styles.card}
            src={card.src}
            alt={card.alt}
            width={card.width}
            height={CARD_HEIGHT}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </PlaygroundModal>
  );
}
