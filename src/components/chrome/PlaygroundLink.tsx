import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PLAYGROUND_PATH } from '../../data/playground';
import { usePlaygroundTransition } from '../../lib/usePlaygroundTransition';
import { PageSweepIn } from './PageSweep';

/* A link into the playground that plays the grid-sweep transition.
   Modified clicks (new tab etc.) behave like a normal link. */
export default function PlaygroundLink({ className, children }: { className?: string; children: ReactNode }) {
  const { transitioning, enterPlayground, preload } = usePlaygroundTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    enterPlayground();
  }

  return (
    <>
      <Link className={className} to={PLAYGROUND_PATH} onClick={handleClick} onMouseEnter={preload} onFocus={preload}>
        {children}
      </Link>
      {transitioning && <PageSweepIn />}
    </>
  );
}
