import type { CSSProperties } from 'react';
import laptop from '../../assets/images/hero/items/laptop.webp';
import metro from '../../assets/images/hero/items/metro.webp';
import sticker from '../../assets/images/hero/items/sticker.webp';
import pizza from '../../assets/images/hero/items/pizza.webp';
import headphones from '../../assets/images/hero/items/headphones.webp';
import coffee from '../../assets/images/hero/items/coffee.webp';
import lily from '../../assets/images/hero/items/lily.webp';
import styles from './HeroItems.module.css';

type Corner = 'topLeft' | 'bottomRight';

interface Item {
  src: string;
  corner: Corner;
  /* Final (hovered) box in px at the 840px Figma card: offset from the
     anchored corner's two edges (left/top or right/bottom), size, rotation. */
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  /* Emerge order, 0 = first out. */
  order: number;
}

/* At rest each cluster sits this far back toward the card's center (Figma
   frames 1321:196 rest vs 1296:1797 hovered), tucked behind it. */
const REST_OFFSET: Record<Corner, { x: number; y: number }> = {
  topLeft: { x: 120, y: 110 },
  bottomRight: { x: -170, y: -100 },
};

/* DOM order = Figma layer order (later items sit on top). */
const ITEMS: Item[] = [
  { src: laptop, corner: 'bottomRight', x: 74, y: -93.4, w: 159, h: 163.4, rotate: 0, order: 5 },
  { src: metro, corner: 'topLeft', x: 46, y: -118, w: 192, h: 134, rotate: 0, order: 1 },
  { src: sticker, corner: 'bottomRight', x: -134.76, y: 44.5, w: 155.6, h: 155.35, rotate: 10.78, order: 2 },
  { src: pizza, corner: 'bottomRight', x: -88, y: -93, w: 188, h: 190, rotate: 0, order: 0 },
  { src: headphones, corner: 'topLeft', x: 131.45, y: -131.55, w: 178, h: 178, rotate: -21.55, order: 3 },
  { src: coffee, corner: 'topLeft', x: -80.95, y: 31.3, w: 139.1, h: 205.2, rotate: -32.32, order: 4 },
  { src: lily, corner: 'topLeft', x: -98, y: -64, w: 175, h: 124, rotate: 0, order: 6 },
];

/* Decorative "glimpse of who I am" items behind the hero card. Only mounted
   on hover-capable devices (see Hero.tsx), so touch never loads them. */
export default function HeroItems({ out }: { out: boolean }) {
  return (
    <div
      className={`${styles.items} ${out ? styles.out : ''}`}
      style={{ '--count': ITEMS.length } as CSSProperties}
      aria-hidden="true"
    >
      {ITEMS.map((item) => (
        <div
          key={item.src}
          className={`${styles.item} ${styles[item.corner]}`}
          style={
            {
              '--x': item.x,
              '--y': item.y,
              '--w': item.w,
              '--h': item.h,
              '--rest-x': REST_OFFSET[item.corner].x,
              '--rest-y': REST_OFFSET[item.corner].y,
              '--rotate': `${item.rotate}deg`,
              '--order': item.order,
            } as CSSProperties
          }
        >
          <img src={item.src} alt="" width={Math.round(item.w)} height={Math.round(item.h)} decoding="async" />
        </div>
      ))}
    </div>
  );
}
