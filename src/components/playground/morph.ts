import { PLAYGROUND_ITEMS } from '../../data/playgroundItems';

/* Shared-element morph between the canvas and the grid (View Transitions).
   Each item's artwork carries the same name in both views, so the browser
   animates it from one place and size to the other. Grid tile frames (and
   blank tiles) have their own names: they fade in after the artwork lands,
   and fade out first on the way back. Timing comes from the --pg-morph-*
   tokens. */
export const morphName = (id: string) => `pg-item-${id}`;
export const tileName = (id: string) => `pg-tile-${id}`;
export const blankName = (index: number) => `pg-blank-${index}`;
export const MINIMAP_NAME = 'pg-minimap';
export const COLUMNS_NAME = 'pg-columns';
// Blank tiles fill at most two slots (three columns, one item short).
const MAX_BLANKS = 2;

const stagger = (index: number) => `calc(${index} * var(--pg-morph-stagger))`;

function itemRules(id: string, index: number) {
  const name = morphName(id);
  return `::view-transition-group(${name}), ::view-transition-old(${name}), ::view-transition-new(${name}) { animation-delay: ${stagger(index)}; }`;
}

function frameRules(name: string, index: number) {
  return [
    `::view-transition-new(${name}) { animation: pg-frame-in var(--pg-morph-duration) var(--pg-morph-ease) calc(${stagger(index)} + var(--pg-morph-frame-delay)) both; }`,
    `::view-transition-old(${name}) { animation: pg-frame-out calc(var(--pg-morph-duration) / 2) var(--pg-morph-ease) both; }`,
  ].join('\n');
}

/* Global while the playground is mounted (rendered as a <style>), since the
   ::view-transition pseudo-elements live on the document root. Per-name
   rules rather than view-transition-class, which Safari 18.0 lacks. */
export const MORPH_CSS = [
  `::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) {
  animation-duration: var(--pg-morph-duration);
  animation-timing-function: var(--pg-morph-ease);
}`,
  `@keyframes pg-frame-in { from { opacity: 0; transform: scale(0.96); } }`,
  `@keyframes pg-frame-out { to { opacity: 0; } }`,
  ...PLAYGROUND_ITEMS.map((item, index) => itemRules(item.id, index)),
  ...PLAYGROUND_ITEMS.map((item, index) => frameRules(tileName(item.id), index)),
  ...Array.from({ length: MAX_BLANKS }, (_, i) => frameRules(blankName(i), PLAYGROUND_ITEMS.length + i)),
].join('\n');
