import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../../../data/links';
import { useHomeTransition } from '../../../lib/usePlaygroundTransition';
import { PageSweepIn } from '../../chrome/PageSweep';
import { play } from '../../../lib/sound/sound';
import styles from './PortfolioButton.module.css';

/* Fixed top-left wordmark: back to Home's hero behind the same grid sweep
   that brought you in. Modified clicks (new tab etc.) behave like a normal
   link. */
export default function PortfolioButton() {
  const { transitioning, leavePlayground } = useHomeTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    leavePlayground();
  }

  return (
    <>
      <Link to={LINKS.home} className={styles.pill} aria-label="Sehaz Nagpal, back to home"
        onClick={handleClick}
        // A soft tick on hover, as on the site's own wordmark
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') play('tick');
        }}
      >
        Sehaz Nagpal
      </Link>
      {transitioning && <PageSweepIn />}
    </>
  );
}
