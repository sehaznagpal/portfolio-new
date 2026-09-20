import { useEffect, useRef, useState } from 'react';
import heroStyles from './Hero.module.css';
import styles from './HeroName.module.css';

/* Per-letter hover font-swap for the hero title ("Sehaz Nagpal"). Every
   tunable lives here — nothing about timing, easing, or the font pool is
   hardcoded anywhere else.

   Scale values are metrics-derived (fontTools cap-height/x-height readout
   against each original: Gambetta Italic cap 0.680/x 0.460, Bricolage Bold
   cap 0.660/x 0.528, all at unitsPerEm 1000), then averaged across cap- and
   x-height per (alt, word) pair — Pixelify and Boska each sit at a
   meaningfully different size relative to "Sehaz" (Gambetta) vs "Nagpal"
   (Bricolage), so this is keyed per word rather than one flat number.
   Nudge by eye if a specific letter ever looks off. */
const CONFIG = {
  fontPool: [
    {
      id: 'pixelify',
      familyName: 'Pixelify Sans',
      fallback: 'sans-serif',
      weight: 500,
      style: 'normal' as const,
      scale: { sehaz: 0.99, nagpal: 1.05 },
    },
    {
      id: 'boska',
      familyName: 'Boska',
      fallback: 'serif',
      weight: 300,
      style: 'italic' as const,
      scale: { sehaz: 0.95, nagpal: 1.01 },
    },
  ],
  // Both directions fast and near-symmetric on purpose — an earlier version
  // used a slow 700ms + 150ms-hold fade-out, which read as the letter
  // lagging behind the cursor rather than responding to it. Short, snappy
  // opacity+scale crossfades in both directions instead, so the swap reads
  // as an instant morph rather than a fade.
  swapInMs: 60,
  swapInEasing: 'ease-out',
  altScaleFrom: 0.97,
  altScaleTo: 1,
  holdMs: 0,
  fadeOutMs: 80,
  fadeOutEasing: 'ease-out',
  // While held on one letter: cycle through actual -> pixelify -> boska on
  // a fixed interval, independent of the enter/leave crossfade speeds above.
  cycleIntervalMs: 4000,
};

type FontEntry = (typeof CONFIG.fontPool)[number];
type FontId = FontEntry['id'];
type ActiveState = 'original' | FontId;
type WordKey = 'sehaz' | 'nagpal';

const CYCLE_ORDER: ActiveState[] = ['original', ...CONFIG.fontPool.map((f) => f.id)];

function cssFontFamily(font: FontEntry) {
  return `"${font.familyName}", ${font.fallback}`;
}

// (hover: hover) catches touch devices that only *simulate* :hover on tap
// (which would otherwise leave a letter stuck mid-swap); (pointer: fine)
// separately rules out a touch display that happens to report hover: hover.
// Re-evaluated live since either can change (an external mouse plugged into
// a tablet, a reduced-motion toggle) without a reload.
function useCanAnimate() {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const hoverMql = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    function update() {
      setCanAnimate(hoverMql.matches && !motionMql.matches);
    }
    update();
    hoverMql.addEventListener('change', update);
    motionMql.addEventListener('change', update);
    return () => {
      hoverMql.removeEventListener('change', update);
      motionMql.removeEventListener('change', update);
    };
  }, []);

  return canAnimate;
}

// Gates the whole effect until both alternates have actually loaded, so the
// very first hover never shows a fallback-font flash while the real one is
// still in flight — index.html's <link rel="preload"> gets the bytes moving
// immediately, this just waits for them to be usable.
function useAltFontsReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const specs = CONFIG.fontPool.map(
      (f) => `${f.style === 'italic' ? 'italic ' : ''}${f.weight} 16px ${cssFontFamily(f)}`,
    );
    Promise.all(specs.map((spec) => document.fonts.load(spec)))
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}

function Letter({ char, word, canAnimate }: { char: string; word: WordKey; canAnimate: boolean }) {
  const [active, setActive] = useState<ActiveState>('original');
  // Drives which transition speed applies (see transitionFor below) — kept
  // separate from `active` itself since "hovered but cycle landed back on
  // original" must still use the fast speed, not the leave/hold/fade-out one.
  const [hovered, setHovered] = useState(false);
  // Persists across separate hovers of this same letter (not reset on
  // leave) so repeated hovers keep alternating pixelify/boska instead of
  // always restarting at pixelify.
  const hoverCountRef = useRef(0);
  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(
    () => () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    },
    [],
  );

  function startCycle() {
    if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    cycleTimerRef.current = setInterval(() => {
      setActive((prev) => CYCLE_ORDER[(CYCLE_ORDER.indexOf(prev) + 1) % CYCLE_ORDER.length]);
    }, CONFIG.cycleIntervalMs);
  }

  function handlePointerEnter() {
    hoverCountRef.current += 1;
    // 1st hover -> pool[0] (pixelify), 2nd -> pool[1] (boska), 3rd -> pool[0]
    // again, and so on.
    const font = CONFIG.fontPool[(hoverCountRef.current - 1) % CONFIG.fontPool.length];
    setHovered(true);
    setActive(font.id);
    startCycle();
  }

  function handlePointerLeave() {
    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
    setHovered(false);
    setActive('original');
  }

  // A CSS transition interrupted by a new target value animates smoothly
  // from wherever it currently sits — never jumps or restarts — as long as
  // it's a plain property transition rather than a keyframe animation
  // re-triggering from 0%. Swapping `hovered` mid-fade (re-entering while
  // the leave fade is still running) relies on exactly this: it just
  // changes the target and duration, the browser does the rest.
  function transitionFor(prop: string) {
    return hovered
      ? `${prop} ${CONFIG.swapInMs}ms ${CONFIG.swapInEasing}`
      : `${prop} ${CONFIG.fadeOutMs}ms ${CONFIG.fadeOutEasing} ${CONFIG.holdMs}ms`;
  }
  const transition = `${transitionFor('opacity')}, ${transitionFor('transform')}`;

  return (
    <span
      className={styles.letter}
      aria-hidden="true"
      onPointerEnter={canAnimate ? handlePointerEnter : undefined}
      onPointerLeave={canAnimate ? handlePointerLeave : undefined}
    >
      <span className={styles.layer} style={{ opacity: active === 'original' ? 1 : 0, transition }}>
        {char}
      </span>
      {CONFIG.fontPool.map((font) => {
        const isActive = active === font.id;
        return (
          <span
            key={font.id}
            className={`${styles.layer} ${styles.layerAlt}`}
            style={{
              opacity: isActive ? 1 : 0,
              transform: `scale(${isActive ? CONFIG.altScaleTo : CONFIG.altScaleFrom})`,
              transition,
              fontFamily: cssFontFamily(font),
              fontWeight: font.weight,
              fontStyle: font.style,
              fontSize: `${font.scale[word]}em`,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

function Word({ text, word, className, canAnimate }: { text: string; word: WordKey; className: string; canAnimate: boolean }) {
  return (
    <span className={className}>
      {Array.from(text).map((char, i) => (
        // Index is stable and unique within a five/six-letter literal — fine
        // as a key here, this list never reorders or changes length.
        // eslint-disable-next-line react/no-array-index-key
        <Letter key={i} char={char} word={word} canAnimate={canAnimate} />
      ))}
    </span>
  );
}

// Renders the same two <span> structure (.titleItalic "Sehaz" / .titleBold
// "Nagpal") the plain-text version used, just with each word's characters
// split into individually-hoverable letters — the parent .title flex +
// gap: 0.15em (see Hero.module.css) still owns the space between the two
// words, unchanged, so that spacing is preserved exactly as before rather
// than reproduced via a literal space character.
export default function HeroName() {
  const canHover = useCanAnimate();
  const fontsReady = useAltFontsReady();
  const canAnimate = canHover && fontsReady;

  return (
    <>
      <Word text="Sehaz" word="sehaz" className={heroStyles.titleItalic} canAnimate={canAnimate} />
      <Word text="Nagpal" word="nagpal" className={heroStyles.titleBold} canAnimate={canAnimate} />
    </>
  );
}
