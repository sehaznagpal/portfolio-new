import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import CursorTooltip from '../chrome/CursorTooltip';
import { useMediaQuery } from '../../lib/useMediaQuery';
import type { CaseTheme } from '../../lib/caseTheme';
import styles from './LampSwitch.module.css';

/* Cord physics, in the lamp's own units (Figma px), radians and seconds.
   The handle hangs from a fixed point under the bulb: its sideways motion
   is a damped pendulum (angle), its stretch a stiffer damped spring. */
const PIVOT_X = 24;
const PIVOT_Y = 8;
// Pivot to the top of the handle at rest (the handle's top sits at y 32).
const CORD_LENGTH = 24;

// Pendulum: about a 0.8s swing, settling over a few gentle swings.
const SWING_STIFFNESS = 60;
const SWING_DAMPING = 4;
const MAX_SWING = (10 * Math.PI) / 180;

// Stretch: stiff and well damped (ratio about 0.6), so a release
// overshoots once, by under a tenth of the pull.
const STRETCH_STIFFNESS = 900;
const STRETCH_DAMPING = 36;
const MAX_STRETCH = 24;
// Drag resistance: the stretch eases towards MAX_STRETCH as the pull grows.
const RUBBER_BAND = 20;
// How much of the pointer's sideways offset the handle follows while held.
const DRAG_FOLLOW = 0.5;

// A release past SWITCH_STRETCH switches; a press that moves less than
// CLICK_SLOP is a click, which plays an automatic CLICK_PULL.
const SWITCH_STRETCH = 12;
const CLICK_SLOP = 3;
const CLICK_PULL = 14;
const CLICK_PULL_MS = 110;

// Hover sway: the pendulum's rest angle drifts on smooth noise (three
// slow, unrelated waves with fresh phases each hover), up to SWAY_ANGLE.
const SWAY_ANGLE = (3.5 * Math.PI) / 180;
const SWAY_WAVES = [
  { hz: 0.37, weight: 0.5 },
  { hz: 0.61, weight: 0.3 },
  { hz: 1.13, weight: 0.2 },
];

// A pointer moving across the cord pulls its swing towards the pointer's
// sideways speed: rad/s per px/s, how strongly each move couples, and how
// far either side of the cord (lamp units) it reaches, fading with distance.
const FLICK_GAIN = 0.0007;
const FLICK_COUPLING = 0.5;
const FLICK_RANGE = 16;

// The shade's tiny wobble as the cord snaps back.
const SHADE_STIFFNESS = 400;
const SHADE_DAMPING = 16;
const SHADE_KICK = 0.6;
const MAX_SHADE = (1 * Math.PI) / 180;

// Below these the cord counts as settled and the loop stops.
const REST_ANGLE = 0.0005;
const REST_STRETCH = 0.02;
const REST_VELOCITY = 0.01;
// The simulation advances in fixed steps, so it feels the same at 30, 60
// or 120 fps; a frame's elapsed time is capped so a stalled tab can't
// make it jump.
const FIXED_STEP = 1 / 240;
const MAX_DT = 1 / 20;

const toDegrees = (radians: number) => (radians * 180) / Math.PI;
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

interface Sim {
  angle: number;
  angularVelocity: number;
  stretch: number;
  stretchVelocity: number;
  restStretch: number;
  shade: number;
  shadeVelocity: number;
  hovered: boolean;
  swayPhases: number[];
  drag: null | {
    pointerId: number;
    startX: number;
    startY: number;
    moved: boolean;
    targetAngle: number;
    targetStretch: number;
  };
}

/* The pull-cord lamp (Figma 1462:1274) that switches the case study
   reading mode: lit in dark mode, off in light mode. The cord sways a
   little under the cursor, swings when brushed, and stretches when pulled:
   a release past SWITCH_STRETCH switches, as it springs back. A click, tap,
   Enter or Space plays an automatic pull. The simulation runs in one rAF
   loop only while the cord is moving or hovered, and stops once settled.
   `onSwitch` gets the bulb's centre, where the new mode is revealed from. */
export default function LampSwitch({
  theme,
  onSwitch,
}: {
  theme: CaseTheme;
  onSwitch: (origin: { x: number; y: number }) => void;
}) {
  const on = theme === 'dark';
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const svgRef = useRef<SVGSVGElement>(null);
  const bulbRef = useRef<SVGCircleElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const handleRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const frame = useRef<number | null>(null);
  const lastTime = useRef(0);
  const leftover = useRef(0);
  const pullTimer = useRef<number | null>(null);
  const lastPointer = useRef<{ x: number; time: number } | null>(null);
  const sim = useRef<Sim>({
    angle: 0,
    angularVelocity: 0,
    stretch: 0,
    stretchVelocity: 0,
    restStretch: 0,
    shade: 0,
    shadeVelocity: 0,
    hovered: false,
    swayPhases: [0, 0, 0],
    drag: null,
  });
  // Re-rendered only to hide the tooltip and switch the cursor while held.
  const [dragging, setDragging] = useState(false);
  // The glow flickers only when switched on here, not on page load.
  const [flicker, setFlicker] = useState(false);
  // Read inside the loop without restarting it.
  const reducedRef = useRef(reducedMotion);
  reducedRef.current = reducedMotion;

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      if (pullTimer.current !== null) clearTimeout(pullTimer.current);
    },
    [],
  );

  function render() {
    const s = sim.current;
    const length = CORD_LENGTH + s.stretch;
    const x = PIVOT_X + length * Math.sin(s.angle);
    const y = PIVOT_Y + length * Math.cos(s.angle);
    // The control point trails at half the angle, so the cord bends into a
    // gentle curve as it swings instead of turning as a stiff line.
    const bend = s.angle / 2;
    const cx = PIVOT_X + (length / 2) * Math.sin(bend);
    const cy = PIVOT_Y + (length / 2) * Math.cos(bend);
    cordRef.current?.setAttribute('d', `M${PIVOT_X} ${PIVOT_Y} Q${cx} ${cy} ${x} ${y}`);
    handleRef.current?.setAttribute(
      'transform',
      `translate(${x - PIVOT_X} ${y - PIVOT_Y - CORD_LENGTH}) rotate(${-toDegrees(s.angle)} ${PIVOT_X} ${PIVOT_Y + CORD_LENGTH})`,
    );
    headRef.current?.setAttribute('transform', `rotate(${toDegrees(s.shade)} 24.5 0)`);
  }

  function settled(s: Sim) {
    return (
      !s.hovered &&
      !s.drag &&
      s.restStretch === 0 &&
      Math.abs(s.angle) < REST_ANGLE &&
      Math.abs(s.angularVelocity) < REST_VELOCITY &&
      Math.abs(s.stretch) < REST_STRETCH &&
      Math.abs(s.stretchVelocity) < REST_VELOCITY &&
      Math.abs(s.shade) < REST_ANGLE &&
      Math.abs(s.shadeVelocity) < REST_VELOCITY
    );
  }

  // Semi-implicit Euler: each velocity first, then its position from it.
  function integrate(s: Sim, sway: number, h: number) {
    s.angularVelocity += (-SWING_STIFFNESS * (s.angle - sway) - SWING_DAMPING * s.angularVelocity) * h;
    s.angle += s.angularVelocity * h;
    if (Math.abs(s.angle) > MAX_SWING) {
      s.angle = clamp(s.angle, MAX_SWING);
      if (Math.sign(s.angularVelocity) === Math.sign(s.angle)) s.angularVelocity = 0;
    }

    s.stretchVelocity += (-STRETCH_STIFFNESS * (s.stretch - s.restStretch) - STRETCH_DAMPING * s.stretchVelocity) * h;
    s.stretch += s.stretchVelocity * h;

    s.shadeVelocity += (-SHADE_STIFFNESS * s.shade - SHADE_DAMPING * s.shadeVelocity) * h;
    s.shade = clamp(s.shade + s.shadeVelocity * h, MAX_SHADE);
  }

  function step(now: number) {
    const s = sim.current;
    const dt = Math.min((now - lastTime.current) / 1000, MAX_DT);
    lastTime.current = now;

    if (s.drag) {
      // Held: the handle follows the pointer; velocities carry into the release.
      if (dt > 0) {
        s.angularVelocity = (s.drag.targetAngle - s.angle) / dt;
        s.stretchVelocity = (s.drag.targetStretch - s.stretch) / dt;
      }
      s.angle = s.drag.targetAngle;
      s.stretch = s.drag.targetStretch;
    } else if (reducedRef.current) {
      Object.assign(s, { angle: 0, angularVelocity: 0, stretch: 0, stretchVelocity: 0, shade: 0, shadeVelocity: 0 });
    } else {
      let sway = 0;
      if (s.hovered) {
        const t = now / 1000;
        sway = SWAY_ANGLE * SWAY_WAVES.reduce((sum, wave, i) => sum + wave.weight * Math.sin(2 * Math.PI * wave.hz * t + s.swayPhases[i]), 0);
      }
      leftover.current += dt;
      while (leftover.current >= FIXED_STEP) {
        leftover.current -= FIXED_STEP;
        integrate(s, sway, FIXED_STEP);
      }
    }

    if (settled(s)) {
      Object.assign(s, { angle: 0, angularVelocity: 0, stretch: 0, stretchVelocity: 0, shade: 0, shadeVelocity: 0 });
      render();
      frame.current = null;
      return;
    }
    render();
    frame.current = requestAnimationFrame(step);
  }

  // Starts the loop if it's asleep.
  function wake() {
    if (frame.current !== null) return;
    lastTime.current = performance.now();
    leftover.current = 0;
    frame.current = requestAnimationFrame(step);
  }

  // Screen px to lamp units, so the cord tracks the pointer at any size.
  function unitsPerPx() {
    const svg = svgRef.current;
    return svg ? 49 / svg.getBoundingClientRect().width : 1;
  }

  function switchNow() {
    const rect = bulbRef.current?.getBoundingClientRect();
    if (!rect) return;
    setFlicker(!on);
    onSwitch({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }

  // As the cord snaps back, the shade gives a little, in proportion.
  function release() {
    const s = sim.current;
    s.shadeVelocity -= SHADE_KICK * Math.min(s.stretch / MAX_STRETCH, 1);
    wake();
  }

  // Click, tap, Enter or Space: a quick pull to CLICK_PULL, then the
  // switch as it's let go.
  function autoPull() {
    if (reducedRef.current) {
      switchNow();
      return;
    }
    const s = sim.current;
    if (pullTimer.current !== null) clearTimeout(pullTimer.current);
    s.restStretch = CLICK_PULL;
    wake();
    pullTimer.current = window.setTimeout(() => {
      pullTimer.current = null;
      s.restStretch = 0;
      release();
      switchNow();
    }, CLICK_PULL_MS);
  }

  function handlePointerEnter(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === 'touch' || reducedRef.current) return;
    const s = sim.current;
    s.hovered = true;
    s.swayPhases = SWAY_WAVES.map(() => Math.random() * 2 * Math.PI);
    lastPointer.current = null;
    wake();
  }

  function handlePointerLeave() {
    sim.current.hovered = false;
    lastPointer.current = null;
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const s = sim.current;
    s.drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      targetAngle: s.angle,
      targetStretch: s.stretch,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const s = sim.current;
    const units = unitsPerPx();
    const drag = s.drag;

    if (drag && drag.pointerId === event.pointerId) {
      const dx = (event.clientX - drag.startX) * units;
      const dy = (event.clientY - drag.startY) * units;
      if (!drag.moved && Math.hypot(dx, dy) > CLICK_SLOP) {
        drag.moved = true;
        setDragging(true);
      }
      if (!drag.moved) return;
      const stretch = MAX_STRETCH * (1 - Math.exp(-Math.max(0, dy) / RUBBER_BAND));
      drag.targetStretch = stretch;
      drag.targetAngle = clamp(Math.atan2(dx * DRAG_FOLLOW, CORD_LENGTH + stretch), MAX_SWING);
      wake();
      return;
    }

    // Brushing past: nudge the swing towards the pointer's sideways speed,
    // more strongly the closer this move passed the cord (in full if it
    // crossed it between events, as a quick flick does).
    if (!s.hovered || reducedRef.current) return;
    const previous = lastPointer.current;
    lastPointer.current = { x: event.clientX, time: event.timeStamp };
    if (!previous || event.timeStamp <= previous.time) return;
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (!svgRect) return;
    const cordX = svgRect.left + (PIVOT_X + CORD_LENGTH * Math.sin(s.angle)) / units;
    const crossed = (previous.x - cordX) * (event.clientX - cordX) <= 0;
    const distance = crossed ? 0 : Math.min(Math.abs(previous.x - cordX), Math.abs(event.clientX - cordX));
    const proximity = 1 - (distance * units) / FLICK_RANGE;
    if (proximity <= 0) return;
    const speed = ((event.clientX - previous.x) / (event.timeStamp - previous.time)) * 1000;
    s.angularVelocity += (FLICK_GAIN * speed - s.angularVelocity) * FLICK_COUPLING * proximity;
    wake();
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    const s = sim.current;
    const drag = s.drag;
    if (!drag || drag.pointerId !== event.pointerId) return;
    s.drag = null;
    setDragging(false);
    if (!drag.moved) {
      autoPull();
      return;
    }
    const pulledFar = s.stretch >= SWITCH_STRETCH;
    release();
    if (pulledFar) switchNow();
  }

  // Also on a lost capture (e.g. released outside the window), so a hold
  // can never get stuck: the cord just springs back, without switching.
  function handlePointerCancel() {
    if (!sim.current.drag) return;
    sim.current.drag = null;
    setDragging(false);
    wake();
  }

  // Pointer clicks are handled on pointerup; this is keyboard activation.
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (event.detail === 0) autoPull();
  }

  return (
    <CursorTooltip
      text="pull to switch"
      variant={on ? 'light' : 'dark'}
      hidden={dragging}
      className={styles.anchor}
    >
      <button
        type="button"
        className={styles.lamp}
        data-on={on}
        data-flicker={flicker && on}
        data-dragging={dragging}
        aria-label={on ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={on}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={handlePointerCancel}
        onClick={handleClick}
      >
        <svg ref={svgRef} className={styles.svg} viewBox="0 0 49 35" aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id="lamp-glow">
              <stop offset="0.45" className={styles.glowStop} />
              <stop offset="0.64" className={styles.glowStop} />
              <stop offset="1" className={styles.glowEnd} />
            </radialGradient>
          </defs>
          {/* Figma's glow: 40% #f5e65c, 2px spread and 4px blur around the bulb */}
          <circle className={styles.glow} cx="25" cy="8" r="11" fill="url(#lamp-glow)" />
          <path
            ref={cordRef}
            className={styles.cord}
            d={`M${PIVOT_X} ${PIVOT_Y} L${PIVOT_X} ${PIVOT_Y + CORD_LENGTH}`}
            vectorEffect="non-scaling-stroke"
          />
          <path ref={handleRef} className={styles.handle} d="M23 32 L25 32 L26 35 L22 35 Z" />
          <g ref={headRef}>
            <circle ref={bulbRef} className={styles.bulb} cx="25" cy="8" r="5" />
            <path className={styles.shade} d="M11.094 0 L38.599 0 L49 8 L0 8 Z" />
          </g>
        </svg>
      </button>
    </CursorTooltip>
  );
}
