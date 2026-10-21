/* SVG path for a postage stamp of `width` x `height`: a rectangle whose
   edges are perforated with evenly spaced semicircle bites of `radius`,
   about `spacing` apart. Traced clockwise, so every bite (arc sweep 0)
   curves into the paper. */
export function stampPath(width: number, height: number, radius: number, spacing: number) {
  const corners = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ];
  let path = `M0 0`;
  corners.forEach(([x1, y1], i) => {
    const [x2, y2] = corners[(i + 1) % 4];
    const length = Math.hypot(x2 - x1, y2 - y1);
    const holes = Math.max(1, Math.round(length / spacing));
    const ux = (x2 - x1) / length;
    const uy = (y2 - y1) / length;
    for (let h = 0; h < holes; h += 1) {
      const centre = ((h + 0.5) / holes) * length;
      const start = centre - radius;
      const end = centre + radius;
      path += ` L${x1 + ux * start} ${y1 + uy * start}`;
      path += ` A${radius} ${radius} 0 0 0 ${x1 + ux * end} ${y1 + uy * end}`;
    }
    path += ` L${x2} ${y2}`;
  });
  return `${path} Z`;
}
