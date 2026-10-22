import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { LINKS } from '../../../data/links';
import { useHasFinePointer } from '../../../lib/useHasFinePointer';
import amoraShape from '../../../assets/images/playground/amora-shape.svg';
import { shapeMask } from './shapeMask';
import { stampPath } from './stampPath';
import focus from './focus.module.css';
import grain from './grain.module.css';
import { play } from '../../../lib/sound/sound';
import styles from './AmoraItem.module.css';

// Matches the amoraShake keyframes.
const SHAKE_MS = 480;
/* The white postage stamp around the artwork, in Figma units: the art plus
   an even margin, its edges perforated (see stampPath). Mirrored in the CSS. */
const ART_W = 190.91;
const ART_H = 248.19;
const MARGIN = 16;
const STAMP_W = ART_W + MARGIN * 2;
const STAMP_H = ART_H + MARGIN * 2;
const STAMP_PATH = stampPath(STAMP_W, STAMP_H, 4.5, 13);

/* A postage stamp: the gradient artwork inside a white, perforated stamp.
   The whole stamp shakes on hover. On touch there's no hover to preview it,
   so a tap plays the full shake first, then opens the site. */
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
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') play('wiggle');
      }}
    >
      <span className={styles.postage}>
        <svg className={styles.paper} viewBox={`0 0 ${STAMP_W} ${STAMP_H}`} aria-hidden="true">
          <path d={STAMP_PATH} />
        </svg>
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
      </span>
    </a>
  );
}
