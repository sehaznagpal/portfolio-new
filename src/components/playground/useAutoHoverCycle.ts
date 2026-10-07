import { useEffect, useState } from 'react';

export type AutoHoverKey = 'photobooth' | 'amora' | 'sipStudio' | 'website' | 'motionDemo' | 'sayHello' | 'extras';

/* Touch screens can't hover, so there the items take turns playing their
   hover state on a timer instead. Desktop keeps pure :hover. */
const GROUPS: AutoHoverKey[][] = [
  ['photobooth', 'amora'],
  ['sipStudio', 'website'],
  ['motionDemo', 'sayHello'],
  ['extras'],
];
const INTERVAL_MS = 5000;
const NONE: AutoHoverKey[] = [];

export function useAutoHoverCycle(enabled: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => setIndex((current) => (current + 1) % GROUPS.length), INTERVAL_MS);
    return () => clearInterval(interval);
  }, [enabled]);

  const active = enabled ? GROUPS[index] : NONE;
  return (key: AutoHoverKey) => active.includes(key);
}
