import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { CASE_STUDIES, DEFAULT_ACTIVE_INDEX } from '../../data/caseStudies';
import CursorTooltip from '../chrome/CursorTooltip';
import FeaturedCard from './cards/FeaturedCard';
import styles from './DesktopCarousel.module.css';

/* Coverflow, driven by index rather than a continuously-rotating ring: with
   only 3 cards, a real circular rotation always has to pass through a lot of
   visually "in-between" angles that never look deliberate. Here there are
   only ever 3 known-good layouts (left/center/right) and every interaction
   just steps the active index by exactly one — GSAP tweens the 3 cards from
   their current layout to their new one, so every frame in between is an
   interpolation between two good states instead of a simulated rotation. */
const BASE_CARD_WIDTH = 402; // Figma reference width (active card, 1280)
const SIDE_SCALE_RATIO = 0.629; // 253.101/402, measured off the Figma frames
const X_OFFSET_RATIO = 0.861; // places the side card exactly 24px (Figma) from the center card, at the reference width — empirically tuned to net out the perspective/tilt projection's own small residual effect on position
const TILT_ANGLE = 28; // degrees the side cards angle away, coverflow-style
const PERSPECTIVE = 1400;
const DEPTH = 80; // how far back the side cards sit, at the reference width

const ANIMATION_DURATION = 0.6;

// A deliberate gesture — trackpad swipe, edge click, or arrow key — is what
// advances the carousel, one card per gesture. Hovering does nothing, and
// there's no click-and-drag: a swipe is a plain two-finger trackpad gesture,
// not a press-and-hold.
// Low on purpose: a trackpad swipe ramps up from near-zero deltaX over its
// first few wheel events, so a high threshold meant the gesture had to
// build up momentum before anything happened — reading as a laggy delay
// before the carousel "caught up". This reacts to the first real movement
// instead, while still filtering out stray 1-2px jitter.
const WHEEL_THRESHOLD = 6;
const WHEEL_COOLDOWN_MS = 450;

// Auto-advance, reset on every step (manual or automatic) so it never fires
// right on the heels of something the user just did.
const AUTO_ADVANCE_MS = 8000;

// The cursor pill's "which zone" boundaries, as a fraction of .perspective's
// own width — roughly matches the visual edges between the center card and
// the two side ones (measured off the actual rendered layout at 1280: the
// center card's edges sit at ~31%/~69%). Deliberately NOT hit-tested off the
// individual (rotated, receded) card elements themselves: a rotateY + negative
// translateZ card sits in its own 3D-projected quad that doesn't line up with
// its own 2D getBoundingClientRect the way a flat element's does, and this
// environment's hit-testing for that quad was seen to disagree with where it
// actually paints — so instead this tracks mouse position on the flat,
// never-transformed .perspective container and derives the zone from plain
// horizontal position, which is exactly as reliable as .edgeZone's own
// click-to-step buttons (flat siblings of the 3D ring, for the same reason).
const HOVER_ZONE_LEFT = 0.35;
const HOVER_ZONE_RIGHT = 0.65;

type Slot = 'left' | 'center' | 'right';

function getSlot(index: number, activeIndex: number): Slot {
  const delta = ((index - activeIndex) % 3 + 3) % 3;
  if (delta === 0) return 'center';
  return delta === 1 ? 'right' : 'left';
}

// Split in two deliberately: `transform` props go on .slot (the element
// actually positioned in 3D space — rotateY/z/scale), `visual` props go on a
// separate, never-transformed inner wrapper (see .slotVisual in the JSX
// below). Safari is known to flatten a preserve-3d context wherever a
// `filter` sits on the same element as a 3D transform (or on an element
// inside that 3D hierarchy) — it forces that element into its own flattened
// compositing layer, which reads as the whole ring going flat. Keeping
// `opacity` off .slot entirely and on a plain 2D child instead avoids ever
// creating that conflict in the first place — moot for opacity alone, but
// kept this way since the inactive card's dimming still lives here even
// after dropping the blur (see FeaturedCard.module.css's noise texture,
// which took blur's place as the inactive-card treatment instead).
function computeSlotProps(slot: Slot, cardWidth: number) {
  // .slot is anchored via left:50%/top:50%, so every card also needs this
  // -50%/-50% self-offset to actually center on that point rather than
  // start its top-left corner there.
  const centering = { xPercent: -50, yPercent: -50 };

  if (slot === 'center') {
    return {
      transform: { ...centering, x: 0, z: 0, rotationY: 0, scale: 1, zIndex: 3 },
      visual: { opacity: 1 },
    };
  }

  // Everything below is expressed relative to the card's own current width,
  // so the layout stays proportionally identical whether the card is 402px
  // (1280) or 446.492px (1440) — the same fluid-scaling convention used
  // throughout this component's siblings.
  const scaleFactor = cardWidth / BASE_CARD_WIDTH;
  const perspective = PERSPECTIVE * scaleFactor;
  const depth = DEPTH * scaleFactor;
  const sign = slot === 'left' ? -1 : 1;

  // A card pushed back in Z is also magnified back down in X by the exact
  // same perspective divide that shrinks its size — so the raw `x` handed to
  // GSAP has to be the on-screen target *divided* by that magnification, the
  // same compensation pattern as the scale below, or the card renders closer
  // to center than intended.
  const magnification = perspective / (perspective + depth);
  const targetXOffset = X_OFFSET_RATIO * cardWidth;
  const rawXOffset = targetXOffset / magnification;

  // A rotateY tilt projects to a trapezoid, not a uniformly-shrunk rectangle
  // — perspective magnifies the near edge even as it shrinks the far one —
  // so the *combined* effect of this tilt + this depth/perspective on the
  // rendered bounding-box width doesn't match a hand-derived cos(angle) x
  // magnification estimate (verified: that formula was off by ~12%).
  // Measured directly instead, at this exact TILT_ANGLE/DEPTH/PERSPECTIVE
  // combination: scale(1) here renders a bounding box 0.9413x the card's own
  // width; dividing that out below lands the resting width exactly on the
  // Figma ratio. Re-measure this constant if TILT_ANGLE/DEPTH/PERSPECTIVE
  // above ever change.
  const measuredCombinedShrink = 0.9413;
  const appliedScale = SIDE_SCALE_RATIO / measuredCombinedShrink;

  return {
    transform: {
      ...centering,
      x: sign * rawXOffset,
      z: -depth,
      rotationY: -sign * TILT_ANGLE,
      scale: appliedScale,
      zIndex: 1,
    },
    // Lighter + grainy, not blurred (see FeaturedCard.module.css's own
    // .inactive.plain::after) — 0.3 matches the Figma desktop reference.
    visual: { opacity: 0.3 },
  };
}

export default function DesktopCarousel({
  onActiveChange,
}: {
  onActiveChange: (index: number) => void;
}) {
  const navigate = useNavigate();
  const perspectiveElRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const [hoverPillText, setHoverPillText] = useState<'scroll' | 'click'>('click');

  const isAnimatingRef = useRef(false);
  const isFirstLayoutRef = useRef(true);
  const wheelLockedRef = useRef(false);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function currentCardWidth() {
    return cardRefs.current[0]?.offsetWidth || BASE_CARD_WIDTH;
  }

  function applyLayout(animate: boolean) {
    const cardWidth = currentCardWidth();
    if (perspectiveElRef.current) {
      // Safari needs the -webkit- prefixed properties alongside the standard
      // ones for perspective/preserve-3d/backface-visibility to actually
      // take effect — without it, Safari silently flattens the whole ring to
      // 2D (cards just sit in a flat row, no tilt/depth at all) while
      // Chromium renders it correctly either way, which is why this only
      // ever showed up cross-browser, not in-editor.
      const perspectiveValue = `${PERSPECTIVE * (cardWidth / BASE_CARD_WIDTH)}px`;
      perspectiveElRef.current.style.perspective = perspectiveValue;
      perspectiveElRef.current.style.setProperty('-webkit-perspective', perspectiveValue);
    }

    let completed = 0;
    CASE_STUDIES.forEach((_, i) => {
      const el = cardRefs.current[i];
      const visualEl = visualRefs.current[i];
      if (!el || !visualEl) return;
      const { transform, visual } = computeSlotProps(getSlot(i, activeIndex), cardWidth);

      // force3D forces GSAP to always promote these to a hardware-accelerated
      // 3D transform layer — without it, Safari has been seen to fall back
      // to flattening the whole ring to 2D (cards sit in a flat row, no
      // tilt/depth) on some renders, while Chromium is unaffected either way.
      if (!animate) {
        gsap.set(el, { ...transform, force3D: true });
        gsap.set(visualEl, visual);
        return;
      }

      gsap.to(el, {
        ...transform,
        force3D: true,
        duration: ANIMATION_DURATION,
        ease: 'power3.out',
        onComplete: () => {
          completed += 1;
          if (completed === CASE_STUDIES.length) isAnimatingRef.current = false;
        },
      });
      gsap.to(visualEl, { ...visual, duration: ANIMATION_DURATION, ease: 'power3.out' });
    });
  }

  useEffect(() => {
    applyLayout(!isFirstLayoutRef.current);
    isFirstLayoutRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // Fires on mount (with DEFAULT_ACTIVE_INDEX) and on every subsequent step —
  // calling onActiveChange (the parent's setState) from *inside* the
  // setActiveIndex updater below used to do this instead, but an updater
  // function must stay pure: React can invoke it more than once (it does,
  // under StrictMode, to check exactly this), and each extra invocation was
  // firing the parent update again as a side effect, which surfaced as
  // "Cannot update a component while rendering a different component" and,
  // in practice, corrupted the render cycle enough to make the auto-advance
  // timer below fire erratically. An effect keyed on activeIndex is the
  // correct place for this side effect.
  useEffect(() => {
    onActiveChange(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // Re-subscribed on every activeIndex change so handleResize's closure
  // never goes stale — a resize firing right after a step must re-lay-out
  // against the *current* activeIndex, not whatever it was on mount, or it
  // would snap the carousel back to the original card mid-transition.
  useEffect(() => {
    function handleResize() {
      applyLayout(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // delta is the index change directly: +1 steps to the *next* card (array
  // order: 1 -> 2 -> 3 -> 1), -1 to the *previous*. Pure updater — see the
  // onActiveChange effect above for why the parent notification doesn't
  // live here.
  function stepCarousel(delta: 1 | -1) {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setActiveIndex((prev) => (prev + delta + CASE_STUDIES.length) % CASE_STUDIES.length);
    scheduleAutoAdvance();
  }

  // Recursive setTimeout rather than setInterval — every step (manual or
  // this timer firing itself) reschedules the next one from scratch, so a
  // burst of manual swipes can never leave a stale interval queued up to
  // fire moments later on top of one the user just triggered.
  function scheduleAutoAdvance() {
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    autoAdvanceTimerRef.current = setTimeout(() => stepCarousel(1), AUTO_ADVANCE_MS);
  }

  useEffect(() => {
    scheduleAutoAdvance();
    return () => {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Trackpad horizontal swipe (deltaX) or a shift-modified wheel. A single
  // gesture fires many wheel events, so a short cooldown turns it into one
  // step instead of several; a clearly-vertical wheel is left alone so page
  // scroll (which reveals the footer) still works normally. Attached as a
  // native, non-passive listener (React's onWheel is passive by default, so
  // event.preventDefault() inside it silently fails and the page would also
  // try to scroll during a horizontal swipe).
  useEffect(() => {
    const el = perspectiveElRef.current;
    if (!el) return;

    function handleWheel(event: WheelEvent) {
      const horizontal =
        Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      if (horizontal === 0) return;
      // Swallow every horizontal-dominant wheel event right away, not just
      // the ones big enough to step — otherwise the gesture's own first few
      // (sub-threshold) events fall through to the browser and can trigger
      // its swipe-to-navigate (back/forward) before this handler ever gets
      // a chance to preventDefault. This element owns left/right movement
      // outright while the pointer is over it.
      event.preventDefault();
      if (Math.abs(horizontal) < WHEEL_THRESHOLD) return;
      if (wheelLockedRef.current) return;
      wheelLockedRef.current = true;
      // A rightward swipe (positive delta) advances to the next card,
      // matching ArrowRight and the right edge zone.
      stepCarousel(horizontal > 0 ? 1 : -1);
      setTimeout(() => {
        wheelLockedRef.current = false;
      }, WHEEL_COOLDOWN_MS);
    }

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepCarousel(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepCarousel(-1);
    }
  }

  function handleCardClick(index: number) {
    if (index !== activeIndex) return;
    navigate(CASE_STUDIES[index].href);
  }

  // See HOVER_ZONE_LEFT/RIGHT's own comment for why this reads the flat
  // .perspective container's geometry rather than the individual cards'.
  function handleHoverMove(event: React.MouseEvent) {
    const rect = perspectiveElRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const fraction = (event.clientX - rect.left) / rect.width;
    setHoverPillText(fraction < HOVER_ZONE_LEFT || fraction > HOVER_ZONE_RIGHT ? 'scroll' : 'click');
  }

  return (
    <div
      ref={perspectiveElRef}
      className={styles.perspective}
      style={{ perspective: `${PERSPECTIVE}px`, WebkitPerspective: `${PERSPECTIVE}px` }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Sit behind the cards (earlier in DOM, same stacking level) so a
          click that actually lands on a visible card reaches the card, and
          only genuinely empty margin space falls through to these. */}
      <button
        type="button"
        className={`${styles.edgeZone} ${styles.edgeZoneLeft}`}
        aria-label="Previous case study"
        onClick={() => stepCarousel(-1)}
      />
      <button
        type="button"
        className={`${styles.edgeZone} ${styles.edgeZoneRight}`}
        aria-label="Next case study"
        onClick={() => stepCarousel(1)}
      />

      <CursorTooltip
        text={hoverPillText}
        onHoverMove={handleHoverMove}
        className={styles.tooltipWrapper}
      >
        <div className={styles.stage}>
          <div className={styles.ring}>
            {CASE_STUDIES.map((study, i) => (
              <div
                key={study.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={styles.slot}
                onClick={() => handleCardClick(i)}
              >
                {/* Opacity lives here, one level below the 3D-transformed
                    .slot itself — see computeSlotProps' own comment for why
                    this split exists. */}
                <div
                  ref={(el) => {
                    visualRefs.current[i] = el;
                  }}
                  className={styles.slotVisual}
                >
                  <FeaturedCard study={study} active={i === activeIndex} plain />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CursorTooltip>
    </div>
  );
}
