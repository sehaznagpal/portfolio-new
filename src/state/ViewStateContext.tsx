import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ViewState } from '../types';

const LOADER_SEEN_KEY = 'portfolio:loader-seen';

function hasSeenLoader(): boolean {
  try {
    return sessionStorage.getItem(LOADER_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markLoaderSeen(): void {
  try {
    sessionStorage.setItem(LOADER_SEEN_KEY, '1');
  } catch {
    // sessionStorage unavailable (e.g. private browsing) — loader will just replay next visit
  }
}

interface ViewStateContextValue {
  view: ViewState;
  finishLoading: () => void;
  /* hero -> expanding: the card-grow transition starts. */
  explore: () => void;
  /* expanding -> index: called once the grow transition has visually
     finished, so the fixed/no-scroll hero stage can be swapped out for the
     normal-flow, scrollable case studies index page underneath it. */
  finishExpand: () => void;
  /* index -> hero: instant (no reverse-morph) — the "flip and expand" is
     specifically the forward Explore Work transition the brief describes;
     going back via the index page's own logo link doesn't need to replay it
     in reverse. */
  goHome: () => void;
}

const ViewStateContext = createContext<ViewStateContextValue | null>(null);

export function ViewStateProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewState>(() => (hasSeenLoader() ? 'hero' : 'loading'));

  const value = useMemo<ViewStateContextValue>(
    () => ({
      view,
      finishLoading: () => {
        markLoaderSeen();
        setView('hero');
      },
      explore: () => setView('expanding'),
      finishExpand: () => setView('index'),
      goHome: () => setView('hero'),
    }),
    [view],
  );

  return <ViewStateContext.Provider value={value}>{children}</ViewStateContext.Provider>;
}

export function useViewState() {
  const ctx = useContext(ViewStateContext);
  if (!ctx) {
    throw new Error('useViewState must be used within a ViewStateProvider');
  }
  return ctx;
}
