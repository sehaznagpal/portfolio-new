import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { useMediaQuery } from '../../lib/useMediaQuery';
import SweepButton from '../chrome/SweepButton';
import photo from '../../assets/images/footer/me.webp';
import { PUNCH_SHAPES, PUNCH_SIZE, shapeCursor, shapeScale, shapeViewBox, type PunchShape } from './punchShapes';
import styles from './PunchArea.module.css';

const PHOTO_WIDTH = 843;
const PHOTO_HEIGHT = 1124;

// Gravity: fall time grows with the square root of the drop distance,
// clamped so short drops still read as a fall.
const FALL_MS_PER_REFERENCE = 1050;
const FALL_REFERENCE_PX = 500;
const MIN_FALL_MS = 550;
// Accelerates off the sheet, then eases into its resting place. No bounce.
const FALL_EASE = 'cubic-bezier(0.42, 0, 0.72, 1)';
const MAX_DRIFT_PX = 40;
const MAX_TILT_DEG = 65;
// Chips pile up from the bottom: the area is split into columns this wide,
// and each landed chip raises the pile under it by PILE_STEP (less than a
// full chip, so neighbours nestle into each other rather than stack flat).
const PILE_COLUMN_PX = PUNCH_SIZE / 2;
const PILE_STEP = PUNCH_SIZE * 0.7;
// How far a chip can roll sideways off the pile to find a lower spot.
const ROLL_RANGE_PX = PUNCH_SIZE * 2;
// Reduced motion: chips just fade in where they land.
const CHIP_FADE_MS = 200;
// Keeps a fully-in-view check from flickering at the edge of the footer.
const IN_VIEW_THRESHOLD = 0.5;
// The sheet is painted in the same colour token as the footer around it.
const SHEET_COLOR_TOKEN = '--case-study-black';

const HOVER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const SHAPE_PATHS = new Map(PUNCH_SHAPES.map((shape) => [shape.id, new Path2D(shape.d)]));

/* Positions are stored as fractions of the sheet / area size, so holes and
   chips keep their relative place when the footer is resized. */
interface Punch {
  shape: PunchShape;
  fx: number;
  fy: number;
}

interface Chip {
  id: number;
  shape: PunchShape;
  // Landing point as a fraction of the punch area.
  fx: number;
  fy: number;
  // Where it fell from, in px relative to the landing point (animation only).
  fromX: number;
  fromY: number;
  rotate: number;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function cutHole(ctx: CanvasRenderingContext2D, { shape, fx, fy }: Punch, width: number, height: number) {
  const path = SHAPE_PATHS.get(shape.id);
  if (!path) return;
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.translate(fx * width, fy * height);
  ctx.scale(shapeScale(shape), shapeScale(shape));
  ctx.translate(-shape.cx, -shape.cy);
  ctx.fill(path);
  ctx.restore();
}

function ChipView({ chip, reducedMotion }: { chip: Chip; reducedMotion: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const landed = `translate(0, 0) rotate(${chip.rotate}deg)`;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fallDistance = Math.max(-chip.fromY, 0);
    const animation = reducedMotion
      ? el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: CHIP_FADE_MS })
      : el.animate(
          [{ transform: `translate(${chip.fromX}px, ${chip.fromY}px) rotate(0deg)` }, { transform: landed }],
          {
            duration: Math.max(MIN_FALL_MS, FALL_MS_PER_REFERENCE * Math.sqrt(fallDistance / FALL_REFERENCE_PX)),
            easing: FALL_EASE,
          },
        );
    return () => animation.cancel();
    // Runs once per chip: it falls on mount and then stays put.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg
      ref={ref}
      className={styles.chip}
      viewBox={shapeViewBox(chip.shape)}
      width={PUNCH_SIZE}
      height={PUNCH_SIZE}
      style={{
        left: `calc(${chip.fx * 100}% - ${PUNCH_SIZE / 2}px)`,
        top: `calc(${chip.fy * 100}% - ${PUNCH_SIZE / 2}px)`,
        transform: landed,
      }}
    >
      <path d={chip.shape.d} />
    </svg>
  );
}

/* Right half of the footer: a black sheet over the photo that visitors
   punch holes in. Each punch drops a green chip of the same shape onto the
   photo. `keysActive` (when given) decides when ← / → change the shape;
   otherwise that follows whether the footer is on screen. */
export default function PunchArea({ keysActive }: { keysActive?: boolean }) {
  const canHover = useMediaQuery(HOVER_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const punchesRef = useRef<Punch[]>([]);
  const nextChipIdRef = useRef(0);
  const [shapeIndex, setShapeIndex] = useState(0);
  const [chips, setChips] = useState<Chip[]>([]);
  const [clearing, setClearing] = useState(false);
  const [inView, setInView] = useState(false);
  const shape = PUNCH_SHAPES[shapeIndex];

  // Redraws the sheet at the canvas's current size, re-cutting every hole.
  const paintSheet = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    // Whole device pixels, rounded up, so the fill never stops short of the
    // canvas's own (often fractional) edge.
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = getComputedStyle(canvas).getPropertyValue(SHEET_COLOR_TOKEN).trim();
    ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    punchesRef.current.forEach((punch) => cutHole(ctx, punch, width, height));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(paintSheet);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [paintSheet]);

  useEffect(() => {
    if (keysActive !== undefined || !rootRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: IN_VIEW_THRESHOLD,
    });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [keysActive]);

  const arrowKeysOn = keysActive ?? inView;

  useEffect(() => {
    if (!arrowKeysOn) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName ?? '')) return;
      event.preventDefault();
      setShapeIndex((i) => (i + step + PUNCH_SHAPES.length) % PUNCH_SHAPES.length);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [arrowKeysOn]);

  function handlePunch(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const area = rootRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !area || !ctx || clearing) return;

    // The hole is placed on the sheet; the chip lives in the area (the sheet
    // bleeds slightly past the area's edges, so the two differ by a pixel).
    const sheetRect = canvas.getBoundingClientRect();
    const areaRect = area.getBoundingClientRect();
    // A click can land before the ResizeObserver has re-measured after a
    // resize; re-measure first so the hole goes exactly under the cursor.
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.ceil(sheetRect.width * dpr) || canvas.height !== Math.ceil(sheetRect.height * dpr)) {
      paintSheet();
    }
    const punch: Punch = {
      shape,
      fx: (event.clientX - sheetRect.left) / sheetRect.width,
      fy: (event.clientY - sheetRect.top) / sheetRect.height,
    };
    punchesRef.current.push(punch);
    cutHole(ctx, punch, sheetRect.width, sheetRect.height);
    const punchX = event.clientX - areaRect.left;
    const punchY = event.clientY - areaRect.top;
    const sheetBottom = sheetRect.bottom - areaRect.top;

    // Drifts a little to either side, then lands on whatever has already
    // piled up: bottom first, filling upward. Like sand, it rolls off a mound
    // to the lowest spot nearby, so the pile spreads before it climbs. Once
    // the pile reaches the sheet, chips settle just under it.
    const half = PUNCH_SIZE / 2;
    const areaWidth = area.clientWidth;
    const areaHeight = area.clientHeight;
    const clampX = (x: number) => Math.min(Math.max(x, half), areaWidth - half);
    const columnsUnder = (x: number) => {
      const columns: number[] = [];
      for (let c = Math.floor((x - half) / PILE_COLUMN_PX); c <= Math.floor((x + half) / PILE_COLUMN_PX); c++) {
        columns.push(c);
      }
      return columns;
    };
    // Pile height (px up from the bottom) per column, worked out from the
    // chips already landed at the area's current size.
    const pile: number[] = [];
    chips.forEach((landed) => {
      const height = areaHeight - landed.fy * areaHeight - half + PILE_STEP;
      columnsUnder(landed.fx * areaWidth).forEach((c) => {
        pile[c] = Math.max(pile[c] ?? 0, height);
      });
    });
    const pileTopAt = (x: number) => Math.max(0, ...columnsUnder(x).map((c) => pile[c] ?? 0));

    const dropX = clampX(punchX + randomBetween(-MAX_DRIFT_PX, MAX_DRIFT_PX));
    let landX = dropX;
    let pileTop = pileTopAt(dropX);
    for (let offset = PILE_COLUMN_PX; offset <= ROLL_RANGE_PX; offset += PILE_COLUMN_PX) {
      for (const x of [clampX(dropX - offset), clampX(dropX + offset)]) {
        const top = pileTopAt(x);
        if (top < pileTop) {
          pileTop = top;
          landX = x;
        }
      }
    }
    const landY = Math.max(areaHeight - pileTop - half, sheetBottom + half);
    const chip: Chip = {
      id: nextChipIdRef.current++,
      shape,
      fx: landX / areaWidth,
      fy: landY / areaHeight,
      fromX: punchX - landX,
      fromY: punchY - landY,
      rotate: randomBetween(-MAX_TILT_DEG, MAX_TILT_DEG),
    };
    setChips((current) => [...current, chip]);
  }

  function resetSheet() {
    punchesRef.current = [];
    paintSheet();
    if (chips.length > 0) setClearing(true);
  }

  return (
    <div ref={rootRef} className={styles.area}>
      <img
        className={styles.photo}
        src={photo}
        alt="Sehaz Nagpal"
        width={PHOTO_WIDTH}
        height={PHOTO_HEIGHT}
        loading="lazy"
        decoding="async"
      />

      <canvas
        ref={canvasRef}
        className={styles.sheet}
        style={{ '--punch-cursor': shapeCursor(shape) } as CSSProperties}
        onClick={handlePunch}
        aria-hidden="true"
      />

      <div
        className={`${styles.chips} ${clearing ? styles.clearing : ''}`}
        onTransitionEnd={() => {
          if (!clearing) return;
          setChips([]);
          setClearing(false);
        }}
        aria-hidden="true"
      >
        {chips.map((chip) => (
          <ChipView key={chip.id} chip={chip} reducedMotion={reducedMotion} />
        ))}
      </div>

      <div className={styles.labels} aria-hidden="true">
        <span>(click to punch)</span>
        {canHover && <span>(←→ to change shape)</span>}
      </div>

      <div className={styles.controls}>
        {!canHover && (
          <div className={styles.switcher} role="group" aria-label="Punch shape">
            {PUNCH_SHAPES.map((option, i) => (
              <button
                key={option.id}
                type="button"
                className={styles.shapeButton}
                aria-label={option.label}
                aria-pressed={i === shapeIndex}
                onClick={() => setShapeIndex(i)}
              >
                <svg viewBox={shapeViewBox(option)} aria-hidden="true">
                  <path d={option.d} />
                </svg>
              </button>
            ))}
          </div>
        )}
        <SweepButton className={styles.newSheet} onClick={resetSheet}>
          get new sheet
        </SweepButton>
      </div>
    </div>
  );
}
