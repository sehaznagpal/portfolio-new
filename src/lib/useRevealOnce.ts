import { useEffect, useRef, useState } from 'react';

// Reveal once the element is this far into the viewport from the bottom.
const REVEAL_ROOT_MARGIN = '0px 0px -15% 0px';

/* True from the first time the element scrolls into view, then stays true. */
export function useRevealOnce<T extends Element>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { rootMargin: REVEAL_ROOT_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, revealed] as const;
}
