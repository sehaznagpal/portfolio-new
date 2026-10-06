/* The three punch shapes (Figma 1390:791; star from 1398:792), stored once and shared by the CSS
   cursor, the canvas hole, the falling chips and the touch switcher icons.
   Paths are in their original Figma coordinates; (cx, cy) is each shape's
   centre and `size` a square that fully contains it. */
export interface PunchShape {
  id: string;
  label: string;
  d: string;
  cx: number;
  cy: number;
  size: number;
}

export const PUNCH_SHAPES: PunchShape[] = [
  {
    id: 'flower',
    label: 'Flower',
    d: 'M21.5693 10.8271C23.6171 6.79025 29.3829 6.79025 31.4307 10.8271C32.601 13.1347 35.0239 14.5338 37.6074 14.3936C42.1276 14.1482 45.0105 19.1417 42.5381 22.9336C41.1249 25.1009 41.1249 27.8991 42.5381 30.0664C45.0105 33.8583 42.1276 38.8518 37.6074 38.6064C35.0239 38.4662 32.601 39.8653 31.4307 42.1729C29.3829 46.2097 23.6171 46.2097 21.5693 42.1729C20.399 39.8653 17.9761 38.4662 15.3926 38.6064C10.8724 38.8518 7.98954 33.8583 10.4619 30.0664C11.8751 27.8991 11.8751 25.1009 10.4619 22.9336C7.98954 19.1417 10.8724 14.1482 15.3926 14.3936C17.9761 14.5338 20.399 13.1347 21.5693 10.8271Z',
    cx: 26.5,
    cy: 26.5,
    size: 38,
  },
  {
    id: 'star',
    label: 'Star',
    d: 'M40.4814 25.8643L40.6533 26.4727L41.2061 26.1641L53.9424 19.0566L46.8359 31.7939L46.5273 32.3467L47.1357 32.5186L61.166 36.5L47.1357 40.4814L46.5273 40.6533L46.8359 41.2061L53.9424 53.9424L41.2061 46.8359L40.6533 46.5273L40.4814 47.1357L36.5 61.166L32.5186 47.1357L32.3467 46.5273L31.7939 46.8359L19.0566 53.9424L26.1641 41.2061L26.4727 40.6533L25.8643 40.4814L11.833 36.5L25.8643 32.5186L26.4727 32.3467L26.1641 31.7939L19.0566 19.0566L31.7939 26.1641L32.3467 26.4727L32.5186 25.8643L36.5 11.833L40.4814 25.8643Z',
    cx: 36.5,
    cy: 36.5,
    size: 51,
  },
  {
    id: 'rounded-x',
    label: 'Rounded X',
    d: 'M130 0.5H134.698C137.776 0.500177 140.271 2.99551 140.271 6.07324C140.271 9.70321 143.214 12.6455 146.844 12.6455H151.812C155.443 12.6455 158.386 9.70321 158.386 6.07324C158.386 2.99551 160.88 0.500176 163.958 0.5H167C171.142 0.5 174.5 3.85786 174.5 8V12.9736C174.5 16.2038 171.882 18.8231 168.651 18.8232C164.869 18.8232 161.802 21.8893 161.802 25.6719C161.802 29.4544 164.869 32.5205 168.651 32.5205C171.882 32.5207 174.5 35.1399 174.5 38.3701V45C174.5 49.1421 171.142 52.5 167 52.5H165.896C162.002 52.4999 158.805 49.4196 158.661 45.5283C158.497 41.0995 154.859 37.5938 150.427 37.5938H149.328C144.936 37.5938 141.375 41.1545 141.375 45.5469C141.375 49.387 138.262 52.5 134.422 52.5H130C125.858 52.5 122.5 49.1421 122.5 45V39.5645C122.5 35.5934 125.595 32.3103 129.56 32.0771L135.184 31.7461C138.602 31.5449 141.271 28.7142 141.271 25.29C141.27 21.7184 138.375 18.8233 134.804 18.8232H130C125.858 18.8232 122.5 15.4652 122.5 11.3232V8C122.5 3.85786 125.858 0.5 130 0.5Z',
    cx: 148.5,
    cy: 26.5,
    size: 53,
  },
];

/* Every shape is drawn at the size of the smallest one (the flower), so the
   cursor, hole and chip are the same size whichever shape is selected. */
export const PUNCH_SIZE = Math.min(...PUNCH_SHAPES.map((shape) => shape.size));

export function shapeScale(shape: PunchShape) {
  return PUNCH_SIZE / shape.size;
}

export function shapeViewBox({ cx, cy, size }: PunchShape) {
  return `${cx - size / 2} ${cy - size / 2} ${size} ${size}`;
}

const CURSOR_STROKE = '#fefefe';
const CURSOR_STROKE_PX = 1.5;
const CURSOR_FALLBACK = 'crosshair';

/* White outline of the shape as a CSS cursor value, hotspot at its centre. */
export function shapeCursor(shape: PunchShape) {
  // Stroke is in the shape's own units, so undo the scale-down to keep it 1.5px on screen.
  const strokeWidth = CURSOR_STROKE_PX / shapeScale(shape);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PUNCH_SIZE}" height="${PUNCH_SIZE}" viewBox="${shapeViewBox(shape)}"><path d="${shape.d}" fill="none" stroke="${CURSOR_STROKE}" stroke-width="${strokeWidth}"/></svg>`;
  const hotspot = Math.round(PUNCH_SIZE / 2);
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotspot} ${hotspot}, ${CURSOR_FALLBACK}`;
}
