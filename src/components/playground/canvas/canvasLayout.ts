import type { PlaygroundItem } from '../../../data/playgroundItems';

/* The canvas world, in CSS px: wide, not tall (3x the width and 1.7x the
   height of a 1440x900 screen), so panning is mostly sideways.
   Items keep their real size; a bigger screen shows more of the world, and
   one taller than the world shows all of it, centred. */
export const WORLD_WIDTH = 4320;
export const WORLD_HEIGHT = 1530;
export const CAPTION_HEIGHT = 30;

/* Each item's original artwork box (Figma units) and the scale it's drawn at
   on the canvas, which sets its --cu. */
export const ARTWORK_BOXES: Record<string, { w: number; h: number; scale: number }> = {
  intro: { w: 520, h: 300, scale: 1 },
  rewired: { w: 260.48, h: 260.48, scale: 1 },
  amora: { w: 222.91, h: 280.19, scale: 1.15 },
  photobooth: { w: 390.31, h: 291.51, scale: 0.72 },
  worktape: { w: 446, h: 271, scale: 0.7 },
  motion: { w: 264.96, h: 248.19, scale: 0.98 },
  sip: { w: 329.15, h: 299.96, scale: 0.79 },
  extras: { w: 290.19, h: 345.56, scale: 0.9 },
  me: { w: 308, h: 352, scale: 0.79 },
  hello: { w: 344.6, h: 238.73, scale: 0.87 },
  letter: { w: 517.61, h: 562.13, scale: 0.72 },
};

export interface PlacedItem {
  item: PlaygroundItem;
  scale: number;
  // Top-left of the artwork and its size, in world px (caption below it).
  x: number;
  y: number;
  w: number;
  h: number;
}

/* Every item at its pinned spot, relative to the world centre. */
export function placeItems(items: PlaygroundItem[]): PlacedItem[] {
  return items.map((item) => {
    const box = ARTWORK_BOXES[item.id];
    const w = box.w * box.scale;
    const h = box.h * box.scale;
    return {
      item,
      scale: box.scale,
      x: WORLD_WIDTH / 2 + item.pinned.x - w / 2,
      y: WORLD_HEIGHT / 2 + item.pinned.y - h / 2,
      w,
      h,
    };
  });
}
