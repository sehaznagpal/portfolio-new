import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavigationType, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { useMediaQuery } from './useMediaQuery';

export const SECTIONS = ['hero', 'work', 'footer'] as const;
export type SectionId = (typeof SECTIONS)[number];

const WORK_HASH = '#work';

// Gesture-driven sections only on a laptop/desktop with a real mouse or
// trackpad. Touch devices and narrower screens keep native scroll + snap.
const GESTURE_MODE_QUERY = '(min-width: 1025px) and (hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Vertical scroll a gesture has to add up to before it moves a section: one
// mouse-wheel notch or a light trackpad swipe clears it, stray jitter doesn't.
const WHEEL_TRIGGER_PX = 40;
// A pause this long ends a gesture (and any trackpad momentum after a move).
const WHEEL_GESTURE_GAP_MS = 120;
// During the momentum tail deltas only shrink. One this much bigger than the
// last means the fingers are back: a new swipe, so the lock lets go early.
const NEW_SWIPE_RISE = 1.6;
const NEW_SWIPE_MIN_PX = 6;
// Wheel deltaMode line/page units, converted to pixels.
const LINE_HEIGHT_PX = 16;
const TOUCH_SWIPE_PX = 50;
// Native (touch) mode: a section counts as current once this much of it is on screen.
const NATIVE_VISIBLE_THRESHOLD = 0.6;

const KEY_DIRECTIONS: Record<string, 1 | -1> = {
  ArrowDown: 1,
  PageDown: 1,
  ArrowUp: -1,
  PageUp: -1,
};

type Phase = 'idle' | 'animating' | 'settling';

function sectionForHash(hash: string): SectionId {
  return hash === WORK_HASH ? 'work' : 'hero';
}

// Same unit as the sections' own height (--section-h in tokens.css), so the
// track always moves exactly one section with no sub-pixel gap or overlap.
const SECTION_UNIT = typeof CSS !== 'undefined' && CSS.supports('height', '100svh') ? 'svh' : 'vh';

function trackOffset(section: SectionId) {
  return `translate3d(0, ${-SECTIONS.indexOf(section) * 100}${SECTION_UNIT}, 0)`;
}

function readToken(token: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

function readDurationMs(token: string) {
  const value = readToken(token);
  const amount = parseFloat(value) || 0;
  return value.endsWith('ms') ? amount : amount * 1000;
}

function wheelPixels(event: WheelEvent, delta: number) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return delta * LINE_HEIGHT_PX;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return delta * window.innerHeight;
  return delta;
}

// Space on a focused button/link must still activate it, and nothing here
// should ever hijack typing.
function shouldIgnoreKey(target: EventTarget | null, key: string) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return true;
  return key === ' ' && target.closest('button, a, [role="button"]') !== null;
}

/* The single section controller for Home. On desktop it owns every wheel,
   touch and key gesture on the page and moves one track (hero + index) with a
   transform; the footer sits still behind the track and is uncovered when the
   track moves past the index. On touch it stays out of the way: native
   scroll-snap does the moving and this only tracks which section is current. */
export function useSectionNav({ enabled }: { enabled: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const gestureMode = useMediaQuery(GESTURE_MODE_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const [section, setSection] = useState<SectionId>(() => sectionForHash(location.hash));
  // The section being left while a move is in progress, null otherwise.
  const [from, setFrom] = useState<SectionId | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const layerRefs = {
    hero: useRef<HTMLDivElement>(null),
    work: useRef<HTMLDivElement>(null),
    footer: useRef<HTMLDivElement>(null),
  };

  const sectionRef = useRef(section);
  sectionRef.current = section;
  const phaseRef = useRef<Phase>('idle');
  const animationRef = useRef<Animation | null>(null);
  const wheelRef = useRef({ lastAt: 0, lastAbs: 0, accX: 0, accY: 0 });

  const syncHash = useCallback(
    (next: SectionId) => {
      const hash = next === 'hero' ? '' : WORK_HASH;
      if (hash !== window.location.hash) navigate({ pathname: '/', hash }, { replace: true });
    },
    [navigate],
  );

  const goTo = useCallback(
    (next: SectionId) => {
      const current = sectionRef.current;
      if (next === current) return;
      if (!gestureMode) {
        // Section + hash follow from the IntersectionObserver once it lands.
        layerRefs[next].current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        return;
      }

      const track = trackRef.current;
      if (!track) return;
      // A nav click mid-move starts from wherever the track is right now.
      if (animationRef.current) {
        animationRef.current.commitStyles();
        animationRef.current.cancel();
      }
      const fromTransform = getComputedStyle(track).transform;
      const toTransform = trackOffset(next);

      // Footer -> hero would sweep the index across the whole screen, and
      // reduced motion asks for no movement: both dip the track's opacity and
      // swap position while it's invisible instead of sliding.
      const isJump = Math.abs(SECTIONS.indexOf(next) - SECTIONS.indexOf(current)) > 1;
      const dip = isJump || reducedMotion;
      const keyframes: Keyframe[] = dip
        ? [
            { opacity: 1, transform: fromTransform },
            { opacity: 0, transform: fromTransform, offset: 0.5 },
            { opacity: 0, transform: toTransform, offset: 0.5 },
            { opacity: 1, transform: toTransform },
          ]
        : [{ transform: fromTransform }, { transform: toTransform }];

      track.style.transform = toTransform;
      track.style.willChange = dip ? 'transform, opacity' : 'transform';
      const animation = track.animate(keyframes, {
        duration: readDurationMs(dip ? '--section-dip-duration' : '--section-duration'),
        easing: dip ? 'ease-in-out' : readToken('--section-ease'),
      });
      animationRef.current = animation;
      phaseRef.current = 'animating';

      // State (current section, inert layers, hash) switches as the move starts.
      setFrom(current);
      setSection(next);
      syncHash(next);

      animation.finished
        .then(() => {
          if (animationRef.current !== animation) return;
          animationRef.current = null;
          track.style.willChange = '';
          phaseRef.current = 'settling';
          setFrom(null);
        })
        // Cancelled by a newer move, which takes over from here.
        .catch(() => undefined);
    },
    // layerRefs' individual refs are stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gestureMode, reducedMotion, syncHash],
  );

  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  // Moves one section up or down; false at either end (nothing to do there).
  function step(direction: 1 | -1) {
    const index = SECTIONS.indexOf(sectionRef.current) + direction;
    if (index < 0 || index >= SECTIONS.length) return false;
    goToRef.current(SECTIONS[index]);
    return true;
  }
  const stepRef = useRef(step);
  stepRef.current = step;

  // External hash changes (browser back/forward, a "/#work" link) move to
  // the matching section. Our own syncHash calls are REPLACE navigations and
  // are skipped: the router commits them in a transition, so one can land
  // after a newer section change and would otherwise bounce it back.
  useEffect(() => {
    if (navigationType === NavigationType.Replace) return;
    const fromHash = sectionForHash(location.hash);
    const current = sectionRef.current;
    if (fromHash === 'hero' ? current !== 'hero' : current === 'hero') goToRef.current(fromHash);
  }, [location.hash, navigationType]);

  // Puts the track where the current section is (no animation) on mount and
  // whenever desktop mode turns on; native mode doesn't transform it at all.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    animationRef.current?.cancel();
    animationRef.current = null;
    phaseRef.current = 'idle';
    track.style.transform = gestureMode ? trackOffset(sectionRef.current) : '';
    track.style.willChange = '';
    setFrom(null);
  }, [gestureMode]);

  useEffect(() => {
    if (!gestureMode || !enabled) return;
    const wheel = wheelRef.current;
    let touchStart: { x: number; y: number } | null = null;

    function handleWheel(event: WheelEvent) {
      // Pinch-zoom, and Shift+wheel, which the index cards treat as horizontal.
      if (event.ctrlKey || event.shiftKey) return;
      const dx = wheelPixels(event, event.deltaX);
      const dy = wheelPixels(event, event.deltaY);
      const now = performance.now();
      const gap = now - wheel.lastAt;
      const abs = Math.abs(dy);
      wheel.lastAt = now;

      if (phaseRef.current === 'animating') {
        wheel.lastAbs = abs;
        return;
      }
      if (phaseRef.current === 'settling') {
        const newSwipe = abs > wheel.lastAbs * NEW_SWIPE_RISE && abs > NEW_SWIPE_MIN_PX;
        wheel.lastAbs = abs;
        if (gap < WHEEL_GESTURE_GAP_MS && !newSwipe) return;
        phaseRef.current = 'idle';
        wheel.accX = 0;
        wheel.accY = 0;
      }

      if (gap > WHEEL_GESTURE_GAP_MS) {
        wheel.accX = 0;
        wheel.accY = 0;
      }
      wheel.accX += dx;
      wheel.accY += dy;
      wheel.lastAbs = abs;

      // Horizontal-dominant gestures belong to the index cards.
      if (Math.abs(wheel.accY) < WHEEL_TRIGGER_PX || Math.abs(wheel.accY) <= Math.abs(wheel.accX)) return;
      stepRef.current(wheel.accY > 0 ? 1 : -1);
      wheel.accX = 0;
      wheel.accY = 0;
    }

    function handleTouchStart(event: TouchEvent) {
      const touch = event.touches[0];
      touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
    }

    function handleTouchEnd(event: TouchEvent) {
      const touch = event.changedTouches[0];
      if (!touchStart || !touch || phaseRef.current === 'animating') return;
      const dx = touchStart.x - touch.clientX;
      const dy = touchStart.y - touch.clientY;
      touchStart = null;
      if (Math.abs(dy) < TOUCH_SWIPE_PX || Math.abs(dy) <= Math.abs(dx)) return;
      stepRef.current(dy > 0 ? 1 : -1);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const direction = event.key === ' ' ? (event.shiftKey ? -1 : 1) : KEY_DIRECTIONS[event.key];
      if (!direction || shouldIgnoreKey(event.target, event.key)) return;
      event.preventDefault();
      if (phaseRef.current !== 'animating') stepRef.current(direction);
    }

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gestureMode, enabled]);

  useEffect(() => () => animationRef.current?.cancel(), []);

  // Entering native mode (first load or a resize across the breakpoint):
  // jump straight to the current section before the observer starts.
  useLayoutEffect(() => {
    if (!gestureMode) layerRefs[sectionRef.current].current?.scrollIntoView({ behavior: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gestureMode]);

  useEffect(() => {
    if (gestureMode) return;
    const idByElement = new Map<Element, SectionId>();
    SECTIONS.forEach((id) => {
      const el = layerRefs[id].current;
      if (el) idByElement.set(el, id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = idByElement.get(entry.target);
          if (!entry.isIntersecting || !id) return;
          setSection(id);
          syncHash(id);
        });
      },
      { threshold: NATIVE_VISIBLE_THRESHOLD },
    );
    idByElement.forEach((_, el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gestureMode, syncHash]);

  return { section, from, goTo, gestureMode, layerRefs, trackRef };
}
