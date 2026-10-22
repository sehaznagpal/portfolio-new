import { useEffect } from 'react';
import { play, setMuted } from '../../lib/sound/sound';
import { useMuted } from '../../lib/sound/useMuted';
import '../../lib/sound/siteSounds';
import styles from './SoundToggle.module.css';

// Elements whose clicks make their own sound (or none) opt out of the tick.
const OWN_SOUND = '[data-sound-own]';
const CLICKABLE = 'a[href], button, [role="button"]';

/* Fixed bottom-left speaker on every page: sound on or off, remembered.
   It also gives the site's buttons, links and cards their soft tick (one
   delegated listener; no hover sounds). */
export default function SoundToggle() {
  const muted = useMuted();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      if (!target?.closest(CLICKABLE) || target.closest(OWN_SOUND)) return;
      play('tick');
    }
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  function toggle() {
    setMuted(!muted);
    if (muted) play('tick');
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      data-muted={muted || undefined}
      data-sound-own
      aria-label={muted ? 'Sound off' : 'Sound on'}
      aria-pressed={!muted}
      onClick={toggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
        <path className={styles.speaker} d="M4 9.5h3.2L11.5 6v12l-4.3-3.5H4z" />
        <path className={styles.waveNear} d="M14.5 9.5a3.5 3.5 0 0 1 0 5" />
        <path className={styles.waveFar} d="M17 7a7 7 0 0 1 0 10" />
        <path className={styles.cross} d="M15 10l4 4M19 10l-4 4" />
      </svg>
    </button>
  );
}
