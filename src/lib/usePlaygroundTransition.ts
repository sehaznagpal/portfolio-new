import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '../data/links';

/* Route swap point of the sweep: by now the ease-out curtain (see
   PageSweepIn) covers the screen, so the swap itself is never seen. */
const SWEEP_COVER_MS = 240;

export const loadPlaygroundPage = () => import('../pages/PlaygroundPage');

/* Entering the playground from anywhere: play PageSweepIn, then navigate
   once it covers the screen and the route's chunk has loaded, so the new
   page never flashes empty. `preload` warms the chunk on hover or focus. */
export function usePlaygroundTransition() {
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  function enterPlayground() {
    if (transitioning) return;
    setTransitioning(true);
    const covered = new Promise((resolve) => setTimeout(resolve, SWEEP_COVER_MS));
    Promise.all([covered, loadPlaygroundPage()]).then(() => {
      if (!cancelledRef.current) navigate(LINKS.playground);
    });
  }

  return { transitioning, enterPlayground, preload: loadPlaygroundPage };
}
