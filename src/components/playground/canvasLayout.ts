/* The playground canvas in Figma design units (frame 1387:2938).

   This is the one place in the project where everything is driven by a
   single canvas unit (--cu, px per design unit): every item's position,
   size and font size is `n * var(--cu)`, so the whole canvas scales with
   the viewport while text and images still render natively crisp (no
   transform: scale() in the resting view). */
export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1248;

/* The canvas is ~1.5x the viewport on its tighter axis and larger on the
   other, so it always overflows the viewport in both dimensions and there
   is room to pan on every aspect ratio. */
const CANVAS_TO_VIEWPORT = 1.5;

export function canvasUnit(viewportWidth: number, viewportHeight: number) {
  return CANVAS_TO_VIEWPORT * Math.max(viewportWidth / CANVAS_WIDTH, viewportHeight / CANVAS_HEIGHT);
}

export interface CanvasBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/* Bounding boxes from Figma (top-left, width, height). */
export const CANVAS_ITEMS = {
  photobooth: { x: 137.68, y: 186.82, w: 390.31, h: 291.51 },
  motionDemo: { x: 637.29, y: 100, w: 264.96, h: 248.19 },
  website: { x: 1053.07, y: 120.58, w: 260.48, h: 260.48 },
  extras: { x: 1408.54, y: 192.55, w: 290.19, h: 345.56 },
  sipStudio: { x: 173.96, y: 456.96, w: 433.38, h: 429.86 },
  drafts: { x: 678, y: 454, w: 564, h: 342 },
  letter: { x: 1306.4, y: 592.51, w: 517.61, h: 562.13 },
  amora: { x: 170.9, y: 879.8, w: 191, h: 248.3 },
  me: { x: 506.5, y: 851.66, w: 329.1, h: 329.1 },
  sayHello: { x: 739.47, y: 811.57, w: 344.6, h: 238.73 },
} satisfies Record<string, CanvasBox>;

/* The view opens centred on the "More from my Drafts" card. */
export const INITIAL_FOCUS = {
  x: CANVAS_ITEMS.drafts.x + CANVAS_ITEMS.drafts.w / 2,
  y: CANVAS_ITEMS.drafts.y + CANVAS_ITEMS.drafts.h / 2,
};
