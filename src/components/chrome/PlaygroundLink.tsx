import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../../data/links';
import { usePlaygroundTransition } from '../../lib/usePlaygroundTransition';
import { PageSweepIn } from './PageSweep';

/* A link into the playground that plays the grid-sweep transition.
   `onNavigate` runs first (e.g. About closing itself). Modified clicks (new
   tab etc.) behave like a normal link. */
export default function PlaygroundLink({
  className,
  children,
  onNavigate,
}: {
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const { transitioning, enterPlayground, preload } = usePlaygroundTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate?.();
    enterPlayground();
  }

  return (
    <>
      <Link className={className} to={LINKS.playground} onClick={handleClick} onMouseEnter={preload} onFocus={preload}>
        {children}
      </Link>
      {transitioning && <PageSweepIn />}
    </>
  );
}
