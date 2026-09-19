import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CASE_STUDIES, DEFAULT_ACTIVE_INDEX } from '../../data/caseStudies';
import FeaturedCard from './cards/FeaturedCard';
import styles from './MobileCarousel.module.css';

/* Mobile behaviour per the brief: no 3D rotation, just a native horizontal
   scroll-snap strip — the browser's own momentum/snap handles the feel,
   this only tracks which card has snapped nearest to center so it can be
   marked active (sharp) and drive the tagline/button rendered by the parent
   page. None of the desktop carousel's ring/perspective/blur-scale logic
   applies here. */
export default function MobileCarousel({
  onActiveChange,
}: {
  onActiveChange: (index: number) => void;
}) {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);

  useEffect(() => {
    const el = cardRefs.current[DEFAULT_ACTIVE_INDEX];
    el?.scrollIntoView({ inline: 'center', block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDelta = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const cardCenter = el.offsetLeft + el.clientWidth / 2;
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
    cardRefs.current[index]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
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
