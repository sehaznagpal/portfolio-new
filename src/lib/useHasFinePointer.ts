import { useEffect, useState } from 'react';

// A touch tablet/phone in landscape can be just as wide as a laptop, so a
// viewport-width breakpoint alone can't tell them apart — this checks the
// actual input capability instead.
export function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );

  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)');
    const update = () => setHasFinePointer(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return hasFinePointer;
}
