import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CASE_STUDIES, DEFAULT_ACTIVE_INDEX } from '../../data/caseStudies';
import FeaturedCard from './cards/FeaturedCard';
import styles from './MobileCarousel.module.css';

/* Mobile behaviour per the brief: a vertical, native scroll-snap stack (not
   the old horizontal strip) — the browser's own momentum/snap handles the
   feel, this only tracks which card has snapped nearest to the track's
   vertical center so it can be marked active (sharp) and drive the
   tagline/button rendered by the parent page. None of the desktop
   carousel's ring/perspective/blur-scale logic applies here.

   DEFAULT_ACTIVE_INDEX (card 0, Dr Cuterus) also happens to be a vertical
   list's natural top-of-scroll position, so no scroll-into-view on mount is
   needed here the way the old horizontal strip needed one — the list just
   opens already showing the default card centered/active. */
export default function MobileCarousel({
  onActiveChange,
}: {
  onActiveChange: (index: number) => void;
}) {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);

  // Fires on mount and on every subsequent snap — onActiveChange (the
  // parent's setState) used to be called from *inside* the setActiveIndex
  // updater in handleScroll below, but an updater must stay pure: React can
  // invoke it more than once, and each extra call fired the parent update
  // again as a side effect ("Cannot update a component while rendering a
  // different component"). An effect keyed on activeIndex is the correct
  // place for this.
  useEffect(() => {
    onActiveChange(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;

    // At either scroll extreme, go straight to the boundary card rather
    // than falling through to the distance check below: a card shorter
    // than the track's own viewport (Moolroop's, notably) can never have
    // its center coincide with the track's center — the center-to-center
    // distance check alone would leave it permanently unreachable even at
    // max scroll, since the track's own achievable center range falls
    // short of that short card's center. A 1px tolerance absorbs sub-pixel
    // scrollTop values that never land on an exact 0 or max.
    const maxScrollTop = track.scrollHeight - track.clientHeight;
    if (track.scrollTop <= 1) {
      setActiveIndex(0);
      return;
    }
    if (track.scrollTop >= maxScrollTop - 1) {
      setActiveIndex(CASE_STUDIES.length - 1);
      return;
    }

    const trackCenter = track.scrollTop + track.clientHeight / 2;
    let closest = 0;
    let closestDelta = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const cardCenter = el.offsetTop + el.clientHeight / 2;
      const delta = Math.abs(cardCenter - trackCenter);
      if (delta < closestDelta) {
        closestDelta = delta;
        closest = i;
      }
    });
    setActiveIndex((prev) => (prev === closest ? prev : closest));
  }

  function handleCardClick(index: number) {
    if (index === activeIndex) {
      navigate(CASE_STUDIES[index].href);
      return;
    }
    cardRefs.current[index]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  return (
    <div ref={trackRef} className={styles.track} onScroll={handleScroll}>
      {CASE_STUDIES.map((study, i) => (
        <div
          key={study.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={styles.slide}
          onClick={() => handleCardClick(i)}
        >
          <FeaturedCard study={study} active={i === activeIndex} />
        </div>
      ))}
    </div>
  );
}
