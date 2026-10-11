import { flushSync } from 'react-dom';

/* The case study reading mode: 'dark' (lamp on, the default) or 'light'
   (lamp off), one preference for every case study. index.html applies the
   saved value to <html> before first paint, so pages start in the right
   mode; keep STORAGE_KEY and the attribute in step with its inline script. */
export type CaseTheme = 'dark' | 'light';

const STORAGE_KEY = 'case-theme';
const ROOT_ATTR = 'data-case-theme';
// While set, the view transition's default crossfade is off (global.css).
const REVEAL_ATTR = 'data-theme-reveal';

export function readCaseTheme(): CaseTheme {
  return document.documentElement.getAttribute(ROOT_ATTR) === 'light' ? 'light' : 'dark';
}

function saveCaseTheme(theme: CaseTheme) {
  document.documentElement.setAttribute(ROOT_ATTR, theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage unavailable: the choice lasts for this page view only.
  }
}

function cssMs(name: string) {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
}

/* Saves `next` and applies it via `apply` (a state setter): revealed in a
   circle growing from `origin` (the lamp's bulb) to the farthest corner,
   a short fade of `page` where View Transitions aren't supported, and
   instantly under reduced motion. Nothing moves, so scroll stays put. */
export function switchCaseTheme(
  next: CaseTheme,
  apply: (theme: CaseTheme) => void,
  origin: { x: number; y: number },
  page: HTMLElement | null,
) {
  saveCaseTheme(next);
  const update = () => flushSync(() => apply(next));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    update();
    return;
  }

  if (!document.startViewTransition) {
    if (!page) {
      update();
      return;
    }
    const duration = cssMs('--theme-fade-duration');
    page.animate([{ opacity: 1 }, { opacity: 0 }], { duration, easing: 'ease-out' }).finished.then(() => {
      update();
      page.animate([{ opacity: 0 }, { opacity: 1 }], { duration, easing: 'ease-out' });
    });
    return;
  }

  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );
  const root = document.documentElement;
  root.setAttribute(REVEAL_ATTR, '');
  const transition = document.startViewTransition(update);
  transition.ready.then(() => {
    root.animate(
      {
        clipPath: [
          `circle(0px at ${origin.x}px ${origin.y}px)`,
          `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
        ],
      },
      {
        duration: cssMs('--theme-reveal-duration'),
        easing: getComputedStyle(root).getPropertyValue('--ease-out-quint').trim(),
        pseudoElement: '::view-transition-new(root)',
      },
    );
  });
  transition.finished.finally(() => root.removeAttribute(REVEAL_ATTR));
}
