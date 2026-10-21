import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '../data/links';

/* Route swap point of the sweep: by now the ease-out curtain (see
   PageSweepIn) covers the screen, so the swap itself is never seen. */
const SWEEP_COVER_MS = 240;
// Route state marking an arrival behind the sweep, so the page uncovers itself.
const SWEEP_STATE = { sweep: true };

export const loadPlaygroundPage = () => import('../pages/PlaygroundPage');

export function arrivedBySweep(state: unknown) {
  return typeof state === 'object' && state !== null && 'sweep' in state;
}

/* Plays PageSweepIn, then navigates once it covers the screen and the
   route's chunk (if any) has loaded, so the new page never flashes empty. */
function useSweepNavigate(to: string, load?: () => Promise<unknown>) {
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  function go() {
    if (transitioning) return;
    setTransitioning(true);
    const covered = new Promise((resolve) => setTimeout(resolve, SWEEP_COVER_MS));
    Promise.all([covered, load?.()]).then(() => {
      if (!cancelledRef.current) navigate(to, { state: SWEEP_STATE });
    });
  }

  return { transitioning, go };
}

/* Entering the playground from anywhere. `preload` warms the chunk on
   hover or focus. */
export function usePlaygroundTransition() {
  const { transitioning, go } = useSweepNavigate(LINKS.playground, loadPlaygroundPage);
  return { transitioning, enterPlayground: go, preload: loadPlaygroundPage };
}

/* Leaving the playground for Home's hero: the same sweep, and Home plays
   the uncovering half (PageSweepOut) when it sees the arrival state. */
export function useHomeTransition() {
  const { transitioning, go } = useSweepNavigate(LINKS.home);
  return { transitioning, leavePlayground: go };
}
