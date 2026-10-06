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

// Filters out stray 1-3px trackpad jitter before a gesture counts.
const WHEEL_THRESHOLD = 4;
// Trackpad momentum keeps firing wheel events for a while after the fingers
// lift, so the lock only releases once the slide has finished AND the event
// stream has been quiet this long. One swipe = one transition.
const WHEEL_IDLE_MS = 200;
// Native (touch) mode: a section counts as current once this much of it is on screen.
const NATIVE_VISIBLE_THRESHOLD = 0.6;

const KEY_DIRECTIONS: Record<string, 1 | -1> = {
  ArrowDown: 1,
  PageDown: 1,
  ArrowUp: -1,
  PageUp: -1,
};

function sectionForHash(hash: string): SectionId {
  return hash === WORK_HASH ? 'work' : 'hero';
}

function readDurationMs(token: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const amount = parseFloat(value) || 0;
  return value.endsWith('ms') ? amount : amount * 1000;
}

// Space on a focused button/link must still activate it, and nothing here
// should ever hijack typing.
function shouldIgnoreKey(target: EventTarget | null, key: string) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return true;
  return key === ' ' && target.closest('button, a, [role="button"]') !== null;
}

export function useSectionNav({ enabled }: { enabled: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const gestureMode = useMediaQuery(GESTURE_MODE_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const [section, setSection] = useState<SectionId>(() => sectionForHash(location.hash));
  // True when the last move skipped a section (footer -> hero).
  const [jumped, setJumped] = useState(false);

  const layerRefs = {
    hero: useRef<HTMLDivElement>(null),
    work: useRef<HTMLDivElement>(null),
    footer: useRef<HTMLDivElement>(null),
  };

  const sectionRef = useRef(section);
  sectionRef.current = section;
  const lockedRef = useRef(false);
  const lockEndsAtRef = useRef(0);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncHash = useCallback(
    (next: SectionId) => {
      const hash = next === 'hero' ? '' : WORK_HASH;
      if (hash !== window.location.hash) navigate({ pathname: '/', hash }, { replace: true });
    },
    [navigate],
  );

  const scheduleUnlock = useCallback(() => {
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    const remaining = Math.max(lockEndsAtRef.current - performance.now(), 0);
    unlockTimerRef.current = setTimeout(() => {
      lockedRef.current = false;
    }, Math.max(remaining, WHEEL_IDLE_MS));
  }, []);

  const goTo = useCallback(
    (next: SectionId) => {
      if (next === sectionRef.current) return;
      if (!gestureMode) {
        // Section + hash follow from the IntersectionObserver once it lands.
        layerRefs[next].current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        return;
      }
      const isJump = Math.abs(SECTIONS.indexOf(next) - SECTIONS.indexOf(sectionRef.current)) > 1;
      const durationToken = isJump
        ? '--section-jump-duration'
        : reducedMotion
          ? '--section-fade-duration'
          : '--section-duration';
      lockedRef.current = true;
      lockEndsAtRef.current = performance.now() + readDurationMs(durationToken);
      scheduleUnlock();
      setJumped(isJump);
      setSection(next);
      syncHash(next);
    },
    // layerRefs' individual refs are stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gestureMode, reducedMotion, scheduleUnlock, syncHash],
  );

  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  function step(direction: 1 | -1) {
    const index = SECTIONS.indexOf(sectionRef.current) + direction;
    if (index >= 0 && index < SECTIONS.length) goToRef.current(SECTIONS[index]);
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

  useEffect(() => {
    if (!gestureMode || !enabled) return;

    function handleWheel(event: WheelEvent) {
      if (lockedRef.current) {
        scheduleUnlock();
        return;
      }
      if (event.ctrlKey) return;
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      stepRef.current(event.deltaY > 0 ? 1 : -1);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const direction = event.key === ' ' ? (event.shiftKey ? -1 : 1) : KEY_DIRECTIONS[event.key];
      if (!direction || shouldIgnoreKey(event.target, event.key)) return;
      event.preventDefault();
      if (!lockedRef.current) stepRef.current(direction);
    }

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
      lockedRef.current = false;
    };
  }, [gestureMode, enabled, scheduleUnlock]);

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

  return { section, jumped, goTo, gestureMode, layerRefs };
}
