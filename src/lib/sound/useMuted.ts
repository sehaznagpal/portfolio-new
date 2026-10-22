import { useSyncExternalStore } from 'react';
import { isMuted, subscribeMuted } from './sound';

export function useMuted() {
  return useSyncExternalStore(subscribeMuted, isMuted, isMuted);
}
