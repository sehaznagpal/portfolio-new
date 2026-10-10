import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useMediaQuery } from '../../lib/useMediaQuery';
import BackLink from './BackLink';
import styles from './CaseStudyRail.module.css';

export interface RailItem {
  /* Id of the element to scroll to (a section heading or the TL;DR). */
  id: string;
  label: string;
}

// The current section is the last one whose top has passed this line, a
// little below the sticky header.
const SPY_LINE = '-25% 0px -74% 0px';

/* Desktop left gutter: the back button and an index of the article's
   sections. The current section is tracked with IntersectionObserver; the
   index fades out while a full-bleed visual band passes behind it (the back
   button never does). */
export default function CaseStudyRail({ items }: { items: RailItem[] }) {
  const [current, setCurrent] = useState<string | undefined>(items[0]?.id);
  const [overBand, setOverBand] = useState(false);
  const indexRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Scroll-spy: each item's section (or the TL;DR box itself) crossing the line.
  useEffect(() => {
    const targets = items.flatMap(({ id }) => {
      const anchor = document.getElementById(id);
      return anchor ? [{ id, element: anchor.closest('section') ?? anchor }] : [];
    });
    const idFor = new Map<Element, string>(targets.map(({ id, element }) => [element, id]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = idFor.get(entry.target);
          if (entry.isIntersecting && id) setCurrent(id);
        });
      },
      { rootMargin: SPY_LINE },
    );
    targets.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  // Fade the index while any visual band overlaps its strip of the screen.
  // The strip is measured once per resize; the index itself never moves.
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const visible = new Set<Element>();

    function observe() {
      observer?.disconnect();
      visible.clear();
      const index = indexRef.current;
      if (!index) return;
      const { top, bottom } = index.getBoundingClientRect();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
          });
          setOverBand(visible.size > 0);
        },
        { rootMargin: `${-Math.round(top)}px 0px ${-Math.round(window.innerHeight - bottom)}px 0px` },
      );
      document.querySelectorAll('main [data-visual-band]').forEach((band) => observer!.observe(band));
    }

    observe();
    window.addEventListener('resize', observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', observe);
    };
  }, [items]);

  function jumpTo(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  return (
    <nav className={styles.rail} aria-label="On this page">
      <BackLink />
      <ol ref={indexRef} className={styles.index} data-faded={overBand}>
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              className={styles.item}
              href={`#${id}`}
              aria-current={current === id ? 'location' : undefined}
              onClick={(event) => jumpTo(event, id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
