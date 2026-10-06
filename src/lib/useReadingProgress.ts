import { useEffect, type RefObject } from 'react';

/* Scales `bar` along x from 0 (target's top at the viewport top) to 1 (its
   bottom at the viewport bottom). The target's position is measured only
   when it resizes; each scroll just reads scrollY in one rAF per frame and
   writes a transform, so scrolling does no layout work. */
export function useReadingProgress(
  targetRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const target = targetRef.current;
    const bar = barRef.current;
    if (!target || !bar) return;

    let start = 0;
    let distance = 1;
    let frame = 0;

    function update() {
      frame = 0;
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      bar!.style.transform = `scaleX(${progress})`;
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function measure() {
      const rect = target!.getBoundingClientRect();
      start = rect.top + window.scrollY;
      distance = Math.max(1, rect.height - window.innerHeight);
      schedule();
    }

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(target);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(frame);
    };
  }, [targetRef, barRef]);
}
