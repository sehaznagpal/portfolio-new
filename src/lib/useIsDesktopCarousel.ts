import { useEffect, useState } from 'react';

const BREAKPOINT = 768;

/* The 3D carousel is a genuinely different implementation from the mobile
   scroll-snap strip (not the same effect scaled down, per the brief), so
   this is a hard breakpoint switch rather than a fluid one — consistent
   with the one other hard switch already used elsewhere on this site (the
   about-link alignment / About panel drawer-vs-sheet mode). */
export function useIsDesktopCarousel() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= BREAKPOINT,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return isDesktop;
}
