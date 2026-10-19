import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import SweepButton from '../chrome/SweepButton';
import { useMediaQuery } from '../../lib/useMediaQuery';
import styles from './HeroSection.module.css';

const LABEL = 'scroll down to explore work';
// Once a visitor has scrolled (or clicked the cue) the loop has done its job:
// it stays off for the rest of the visit, including later returns to home.
const DONE_KEY = 'portfolio:cue-done';
let doneThisVisit = false;

function isDone(): boolean {
  if (doneThisVisit) return true;
  try {
    return sessionStorage.getItem(DONE_KEY) === '1';
  } catch {
    return false;
  }
}

function markDone(): void {
  doneThisVisit = true;
  try {
    sessionStorage.setItem(DONE_KEY, '1');
  } catch {
    // sessionStorage unavailable: the module flag still covers this visit
  }
}

function readTokens(el: Element) {
  const style = getComputedStyle(el);
  const ms = (name: string) => parseFloat(style.getPropertyValue(name)) || 0;
  return {
    startDelay: ms('--cue-start-delay'),
    fillIn: ms('--cue-fill-in'),
    hold: ms('--cue-hold'),
    fillOut: ms('--cue-fill-out'),
    pause: ms('--cue-pause'),
    nudge: ms('--cue-nudge'),
    nudgeDistance: style.getPropertyValue('--cue-nudge-distance').trim() || '4px',
    fadeOut: ms('--cue-fade-out'),
    ease: style.getPropertyValue('--cue-ease').trim() || 'ease-in-out',
    hoverFade: ms('--sweep-duration'),
  };
}

/* The hero's "scroll down to explore work" button, with an ambient loop that
   points first-time visitors at the next step: a brand fill sweeps in from
   the left, holds, then leaves to the right, and the arrow nudges down as
   the fill completes. The fill is a band carrying a dark copy of the label,
   counter-shifted so the copy never moves: the text darkens exactly where
   the fill's edge passes, with transforms only. Hovering pauses the loop
   and hands over to the button's own hover; the first scroll, swipe, key
   press or click on the cue fades it out for good. */
export default function ScrollCue({ active, onExplore }: { active: boolean; onExplore: () => void }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const loopRef = useRef<HTMLSpanElement>(null);
  const stopRef = useRef<() => void>(() => {});

  useEffect(() => {
    const loop = loopRef.current;
    const button = loop?.closest('button');
    if (!loop || !button || reducedMotion || isDone()) return;

    const t = readTokens(loop);
    const total = t.fillIn + t.hold + t.fillOut + t.pause;
    const filled = t.fillIn / total;
    const exitStart = (t.fillIn + t.hold) / total;
    const emptied = (t.fillIn + t.hold + t.fillOut) / total;
    const timing: KeyframeAnimationOptions = {
      duration: total,
      delay: t.startDelay,
      iterations: Infinity,
      fill: 'backwards',
    };

    // The band and its text move by equal and opposite amounts, on the same
    // timing, so the dark copy stays registered with the label underneath.
    const shift = (sign: 1 | -1) => [
      { offset: 0, transform: `translateX(${-100 * sign}%)`, easing: t.ease },
      { offset: filled, transform: 'translateX(0%)' },
      { offset: exitStart, transform: 'translateX(0%)', easing: t.ease },
      { offset: emptied, transform: `translateX(${100 * sign}%)` },
      { offset: 1, transform: `translateX(${100 * sign}%)` },
    ];
    const band = loop.querySelector<HTMLElement>(`.${styles.loopBand}`)!;
    const bandText = loop.querySelector<HTMLElement>(`.${styles.loopText}`)!;
    const arrows = [...button.querySelectorAll<SVGElement>('[data-cue-arrow]')];
    const nudgeEnd = Math.min(1, (t.fillIn + t.nudge) / total);
    const nudgeMid = (filled + nudgeEnd) / 2;
    const nudgeFrames = [
      { offset: 0, transform: 'translateY(0)' },
      { offset: filled, transform: 'translateY(0)', easing: t.ease },
      { offset: nudgeMid, transform: `translateY(${t.nudgeDistance})`, easing: t.ease },
      { offset: nudgeEnd, transform: 'translateY(0)' },
      { offset: 1, transform: 'translateY(0)' },
    ];

    const fills = [band.animate(shift(1), timing), bandText.animate(shift(-1), timing)];
    let nudges = arrows.map((arrow) => arrow.animate(nudgeFrames, timing));
    let visibility: Animation | null = null;
    let stopped = false;

    function fadeLoop(to: 0 | 1, duration: number) {
      const from = getComputedStyle(loop!).opacity;
      visibility?.cancel();
      visibility = loop!.animate([{ opacity: from }, { opacity: to }], { duration, easing: 'ease-out', fill: 'forwards' });
      return visibility;
    }

    // Eases the arrow home from wherever the nudge left it, rather than snapping.
    function settleArrows(duration: number) {
      arrows.forEach((arrow, i) => {
        const from = getComputedStyle(arrow).transform;
        nudges[i].cancel();
        arrow.animate([{ transform: from === 'none' ? 'translateY(0)' : from }, { transform: 'translateY(0)' }], {
          duration,
          easing: 'ease-out',
        });
      });
    }

    function stop() {
      if (stopped) return;
      stopped = true;
      markDone();
      removeListeners();
      settleArrows(t.fadeOut);
      fadeLoop(0, t.fadeOut).finished.then(
        () => fills.forEach((animation) => animation.cancel()),
        () => {},
      );
    }
    stopRef.current = stop;

    function pause() {
      if (stopped) return;
      fills.forEach((animation) => animation.pause());
      settleArrows(t.hoverFade);
      fadeLoop(0, t.hoverFade);
    }

    function resume() {
      if (stopped) return;
      fadeLoop(1, t.hoverFade);
      fills.forEach((animation) => animation.play());
      // Picks the nudge back up in step with the fill.
      nudges = arrows.map((arrow) => {
        const nudge = arrow.animate(nudgeFrames, timing);
        nudge.currentTime = fills[0].currentTime;
        return nudge;
      });
    }

    const windowEvents = ['wheel', 'touchmove', 'keydown'] as const;
    windowEvents.forEach((type) => window.addEventListener(type, stop, { passive: true }));
    // Scroll doesn't bubble, so it's caught on the way down from any scroller.
    document.addEventListener('scroll', stop, { capture: true, passive: true });
    button.addEventListener('mouseenter', pause);
    button.addEventListener('mouseleave', resume);

    function removeListeners() {
      windowEvents.forEach((type) => window.removeEventListener(type, stop));
      document.removeEventListener('scroll', stop, { capture: true });
      button!.removeEventListener('mouseenter', pause);
      button!.removeEventListener('mouseleave', resume);
    }

    return () => {
      removeListeners();
      [...fills, ...nudges].forEach((animation) => animation.cancel());
      visibility?.cancel();
      stopRef.current = () => {};
    };
  }, [reducedMotion]);

  // Leaving the hero any other way (the nav's "work", say) ends it too.
  useEffect(() => {
    if (!active) stopRef.current();
  }, [active]);

  return (
    <SweepButton
      className={styles.cue}
      onClick={() => {
        stopRef.current();
        onExplore();
      }}
    >
      <span className={styles.cueText}>{LABEL}</span>
      <ArrowDown className={styles.cueText} size={12} strokeWidth={1.75} aria-hidden="true" data-cue-arrow />
      {!reducedMotion && (
        <span ref={loopRef} className={styles.loop} aria-hidden="true">
          <span className={styles.loopBand}>
            <span className={styles.loopText}>
              <span>{LABEL}</span>
              <ArrowDown size={12} strokeWidth={1.75} data-cue-arrow />
            </span>
          </span>
        </span>
      )}
    </SweepButton>
  );
}
