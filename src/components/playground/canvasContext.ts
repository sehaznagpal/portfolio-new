import { createContext, useContext } from 'react';
import type { PanListener } from './useCanvasViewport';

type SubscribePan = (listener: PanListener) => () => void;

/* Lets canvas items react to pan gestures (the letter waits for a pan
   toward it) without adding their own wheel or touch listeners. */
export const PanContext = createContext<SubscribePan | null>(null);

export function useSubscribePan() {
  const subscribe = useContext(PanContext);
  if (!subscribe) throw new Error('useSubscribePan must be used inside the playground canvas');
  return subscribe;
}
