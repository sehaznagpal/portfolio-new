import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import CursorTooltip from '../chrome/CursorTooltip';
import { useMediaQuery } from '../../lib/useMediaQuery';
import type { CaseTheme } from '../../lib/caseTheme';
import styles from './LampSwitch.module.css';

// Cord travel, in the lamp's own units (Figma px). A drag past
// PULL_THRESHOLD switches; one shorter than that but past CLICK_SLOP just
// springs back; anything under CLICK_SLOP counts as a click.
const PULL = 12;
const PULL_THRESHOLD = 8;
const CLICK_SLOP = 3;
// Past full travel the cord gives a little, with resistance.
const OVERPULL_GIVE = 0.2;
const OVERPULL_MAX = 4;

function cssMs(element: HTMLElement, name: string) {
  return parseFloat(getComputedStyle(element).getPropertyValue(name)) || 0;
}

/* The pull-cord lamp (Figma 1462:1274) that switches the case study
   reading mode: lit in dark mode, off in light mode. Click, tap, Enter or
   Space give a full pull; dragging the cord down past a small threshold
   does too. The theme switches on release, as the cord springs back.
   `onSwitch` gets the bulb's centre, where the new mode is revealed from. */
export default function LampSwitch({
  theme,
  onSwitch,
}: {
  theme: CaseTheme;
  onSwitch: (origin: { x: number; y: number }) => void;
}) {
  const on = theme === 'dark';
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bulbRef = useRef<SVGCircleElement>(null);
  const drag = useRef<{ startY: number; pointerId: number; distance: number; moved: boolean } | null>(null);
  const timer = useRef<number | null>(null);
  // The glow flickers only when switched on here, not on page load.
  const [flicker, setFlicker] = useState(false);

  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);

  function setCord(distance: number, state: 'drag' | 'press' | 'spring') {
    const button = buttonRef.current;
    if (!button) return;
    button.dataset.cord = state;
    button.style.setProperty('--cord', String(distance));
  }

  function switchNow() {
    const rect = bulbRef.current?.getBoundingClientRect();
    if (!rect) return;
    setFlicker(!on);
    onSwitch({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }

  // A full pull: down quickly, then the switch and spring back on release.
  function pull() {
    if (reducedMotion || !buttonRef.current) {
      switchNow();
      return;
    }
    if (timer.current !== null) clearTimeout(timer.current);
    setCord(PULL, 'press');
    timer.current = window.setTimeout(() => {
      timer.current = null;
      setCord(0, 'spring');
      switchNow();
    }, cssMs(buttonRef.current, '--lamp-press-duration'));
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { startY: event.clientY, pointerId: event.pointerId, distance: 0, moved: false };
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    // Screen px to lamp units, so the cord tracks the pointer at any size.
    const scale = cssMs(event.currentTarget, '--lamp-scale') || 1;
    const distance = Math.max(0, (event.clientY - current.startY) / scale);
    current.distance = distance;
    if (distance > CLICK_SLOP) current.moved = true;
    if (!current.moved || reducedMotion) return;
    const shown = distance <= PULL ? distance : PULL + Math.min((distance - PULL) * OVERPULL_GIVE, OVERPULL_MAX);
    setCord(shown, 'drag');
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    drag.current = null;
    if (!current.moved) {
      pull();
      return;
    }
    setCord(0, 'spring');
    if (current.distance >= PULL_THRESHOLD) switchNow();
  }

  function handlePointerCancel() {
    drag.current = null;
    setCord(0, 'spring');
  }

  // Pointer clicks are handled on pointerup; this is keyboard activation.
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (event.detail === 0) pull();
  }

  return (
    <CursorTooltip text="pull to switch" variant={on ? 'light' : 'dark'} className={styles.anchor}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.lamp}
        data-on={on}
        data-flicker={flicker && on}
        aria-label={on ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={on}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={handleClick}
      >
        <svg className={styles.svg} viewBox="0 0 49 35" aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id="lamp-glow">
              <stop offset="0.45" className={styles.glowStop} />
              <stop offset="0.64" className={styles.glowStop} />
              <stop offset="1" className={styles.glowEnd} />
            </radialGradient>
          </defs>
          {/* Figma's glow: 40% #f5e65c, 2px spread and 4px blur around the bulb */}
          <circle className={styles.glow} cx="25" cy="8" r="11" fill="url(#lamp-glow)" />
          <line className={styles.cord} x1="24" y1="2" x2="24" y2="32" vectorEffect="non-scaling-stroke" />
          <path className={styles.handle} d="M23 32 L25 32 L26 35 L22 35 Z" />
          <circle ref={bulbRef} className={styles.bulb} cx="25" cy="8" r="5" />
          <path className={styles.shade} d="M11.094 0 L38.599 0 L49 8 L0 8 Z" />
        </svg>
      </button>
    </CursorTooltip>
  );
}
