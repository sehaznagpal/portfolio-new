import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { LINKS } from '../../../data/links';
import { useHasFinePointer } from '../../../lib/useHasFinePointer';
import amoraShape from '../../../assets/images/playground/amora-shape.svg';
import { shapeMask } from './shapeMask';
import focus from './focus.module.css';
import grain from './grain.module.css';
import styles from './AmoraItem.module.css';

// Matches the amoraShake keyframes.
const SHAKE_MS = 480;

/* A gradient stamp that shakes on hover. On touch there's no hover to
   preview it, so a tap plays the full shake first, then opens the site. */
export default function AmoraItem({ autoHover }: { autoHover: boolean }) {
  const hasFinePointer = useHasFinePointer();
  const [tapped, setTapped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (hasFinePointer) return;
    event.preventDefault();
    if (tapped) return;
    setTapped(true);
    timerRef.current = setTimeout(() => {
      setTapped(false);
      window.open(LINKS.amora, '_blank', 'noopener,noreferrer');
    }, SHAKE_MS);
  }

  return (
    <a
      className={`${styles.root} ${focus.focusable}`}
      href={LINKS.amora}
      target="_blank"
      rel="noopener noreferrer"
      data-auto-hover={autoHover || undefined}
      data-tapped={tapped || undefined}
      aria-label="Amora, a website for virtual try-on"
      onClick={handleClick}
    >
      <span className={`${styles.stamp} ${grain.grain} ${grain.shaped}`} style={shapeMask(amoraShape)}>
        <span className={styles.label} aria-hidden="true">
          Website
          <br />
          for
          <br />
          Virtual
          <br />
          Try-on
        </span>
      </span>
    </a>
  );
}
