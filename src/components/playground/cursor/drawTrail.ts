export interface TrailPoint {
  x: number;
  y: number;
}

// Spacing of the samples taken along the smoothed path, in CSS px.
const SAMPLE_STEP = 3;
// Higher keeps the tail full for longer before it narrows.
const TAPER_POWER = 1.4;

/* Catmull-Rom point between p1 and p2 at t (0-1). */
function catmullRom(p0: TrailPoint, p1: TrailPoint, p2: TrailPoint, p3: TrailPoint, t: number): TrailPoint {
  const t2 = t * t;
  const t3 = t2 * t;
  const blend = (a: number, b: number, c: number, d: number) =>
    0.5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (3 * b - a - 3 * c + d) * t3);
  return { x: blend(p0.x, p1.x, p2.x, p3.x), y: blend(p0.y, p1.y, p2.y, p3.y) };
}

/* Resamples the path (head first) as a smooth curve at even-ish spacing. */
function smooth(path: TrailPoint[]) {
  const samples: TrailPoint[] = [path[0]];
  for (let i = 0; i < path.length - 1; i += 1) {
    const p0 = path[Math.max(0, i - 1)];
    const p1 = path[i];
    const p2 = path[i + 1];
    const p3 = path[Math.min(path.length - 1, i + 2)];
    const steps = Math.max(1, Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / SAMPLE_STEP));
    for (let s = 1; s <= steps; s += 1) samples.push(catmullRom(p0, p1, p2, p3, s / steps));
  }
  return samples;
}

/* Fills one tapered shape along `path` (head first): `headRadius` wide where
   it meets the dot, narrowing to a rounded `tipRadius` point. */
export function drawTrail(ctx: CanvasRenderingContext2D, path: TrailPoint[], headRadius: number, tipRadius: number) {
  if (path.length < 2) return;
  const samples = smooth(path);

  const lengths = [0];
  for (let i = 1; i < samples.length; i += 1) {
    lengths.push(lengths[i - 1] + Math.hypot(samples[i].x - samples[i - 1].x, samples[i].y - samples[i - 1].y));
  }
  const total = lengths[lengths.length - 1];
  if (total < 1) return;

  const left: TrailPoint[] = [];
  const right: TrailPoint[] = [];
  samples.forEach((point, i) => {
    const prev = samples[Math.max(0, i - 1)];
    const next = samples[Math.min(samples.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const norm = Math.hypot(dx, dy) || 1;
    const radius = tipRadius + (headRadius - tipRadius) * Math.pow(1 - lengths[i] / total, TAPER_POWER);
    const nx = (-dy / norm) * radius;
    const ny = (dx / norm) * radius;
    left.push({ x: point.x + nx, y: point.y + ny });
    right.push({ x: point.x - nx, y: point.y - ny });
  });

  const tip = samples[samples.length - 1];
  const beforeTip = samples[samples.length - 2];
  const tipAngle = Math.atan2(tip.y - beforeTip.y, tip.x - beforeTip.x);

  ctx.beginPath();
  ctx.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < left.length; i += 1) ctx.lineTo(left[i].x, left[i].y);
  // Round cap from the left edge around the tip to the right edge
  ctx.arc(tip.x, tip.y, tipRadius, tipAngle + Math.PI / 2, tipAngle - Math.PI / 2, true);
  for (let i = right.length - 1; i >= 0; i -= 1) ctx.lineTo(right[i].x, right[i].y);
  ctx.closePath();
  ctx.fill();
}
