import type { CSSProperties, ReactNode } from 'react';
import type { CanvasBox } from './canvasLayout';
import styles from './CanvasItem.module.css';

/* Places one item at its Figma box, in canvas units. The item itself is
   centred inside the box. */
export default function CanvasItem({ box, children }: { box: CanvasBox; children: ReactNode }) {
  const style = { '--x': box.x, '--y': box.y, '--w': box.w, '--h': box.h } as CSSProperties;
  return (
    <div className={styles.item} style={style}>
      {children}
    </div>
  );
}
