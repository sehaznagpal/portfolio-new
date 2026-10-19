import type { PlaygroundItem } from '../../data/playgroundItems';

/* The canvas world, in CSS px: about 3x a 1440x900 screen. Items keep their
   real size on every screen; a bigger screen just shows more of the world. */
export const WORLD_WIDTH = 4320;
export const WORLD_HEIGHT = 2700;

/* Card geometry, mirrored in PlaygroundCard.module.css. */
export const CARD_WIDTH = 280;
export const CARD_PADDING = 10;
export const CAPTION_HEIGHT = 30;
const NOTE_SIZES = {
  intro: { w: 520, h: 300 },
  letter: { w: 360, h: 430 },
  contact: { w: 300, h: 190 },
};

/* Auto-placement: a loose grid of cells filled outward from the world
   centre in data order, each item nudged by a small seeded jitter (stable
   between visits). Cells that would touch a pinned item are skipped. */
const CELL_WIDTH = 460;
const CELL_HEIGHT = 500;
const JITTER = 36;
const PINNED_CLEARANCE = 40;

export interface PlacedItem {
  item: PlaygroundItem;
  // Top-left of the card (frame + caption) and its size, in world px.
  x: number;
  y: number;
  w: number;
  h: number;
}

export function itemSize(item: PlaygroundItem) {
  if (item.note) {
    const note = NOTE_SIZES[item.note];
    return { w: note.w, h: note.h + CAPTION_HEIGHT };
  }
  const art = CARD_WIDTH - CARD_PADDING * 2;
  const artHeight = item.thumbnail ? (art * item.thumbnail.height) / item.thumbnail.width : art;
  return { w: CARD_WIDTH, h: artHeight + CARD_PADDING * 2 + CAPTION_HEIGHT };
}

// Small deterministic PRNG, seeded per item id.
function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const overlaps = (a: { x: number; y: number; w: number; h: number }, b: typeof a) =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

export function placeItems(items: PlaygroundItem[]): PlacedItem[] {
  const centreX = WORLD_WIDTH / 2;
  const centreY = WORLD_HEIGHT / 2;
  const placed: PlacedItem[] = [];

  const pinnedZones = items
    .filter((item) => item.pinned)
    .map((item) => {
      const { w, h } = itemSize(item);
      const box = { item, x: item.pinned!.x - w / 2, y: item.pinned!.y - h / 2, w, h };
      placed.push(box);
      return { x: box.x - PINNED_CLEARANCE, y: box.y - PINNED_CLEARANCE, w: w + PINNED_CLEARANCE * 2, h: h + PINNED_CLEARANCE * 2 };
    });

  const cols = Math.floor(WORLD_WIDTH / CELL_WIDTH);
  const rows = Math.floor(WORLD_HEIGHT / CELL_HEIGHT);
  const originX = (WORLD_WIDTH - cols * CELL_WIDTH) / 2;
  const originY = (WORLD_HEIGHT - rows * CELL_HEIGHT) / 2;
  const cells: { x: number; y: number; w: number; h: number; distance: number; angle: number }[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = originX + c * CELL_WIDTH;
      const y = originY + r * CELL_HEIGHT;
      const dx = x + CELL_WIDTH / 2 - centreX;
      const dy = y + CELL_HEIGHT / 2 - centreY;
      cells.push({ x, y, w: CELL_WIDTH, h: CELL_HEIGHT, distance: Math.hypot(dx, dy), angle: Math.atan2(dy, dx) });
    }
  }
  const free = cells
    .filter((cell) => !pinnedZones.some((zone) => overlaps(cell, zone)))
    .sort((a, b) => a.distance - b.distance || a.angle - b.angle);

  items
    .filter((item) => !item.pinned)
    .forEach((item, i) => {
      const cell = free[i];
      if (!cell) return;
      const { w, h } = itemSize(item);
      const random = seededRandom(item.id);
      const jitterX = (random() * 2 - 1) * JITTER;
      const jitterY = (random() * 2 - 1) * JITTER;
      placed.push({ item, x: cell.x + (cell.w - w) / 2 + jitterX, y: cell.y + (cell.h - h) / 2 + jitterY, w, h });
    });

  return placed;
}

export const INTRO_ID = 'intro';
