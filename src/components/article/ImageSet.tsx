import type { CSSProperties } from 'react';
import VisualCaption from './VisualCaption';
import styles from './ImageSet.module.css';

export interface SetImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /* Shown at its natural pixel width on its own row (e.g. a UI detail). */
  small?: boolean;
  /* A subtle bordered frame, for phone screenshots. */
  framed?: boolean;
}

export type ImageSetLayout = 'single' | 'pair' | 'stack';

export interface ImageSetData {
  layout: ImageSetLayout;
  images: SetImage[];
}

function Figure({ image }: { image: SetImage }) {
  const classes = [styles.figure, image.small && styles.small, image.framed && styles.framed]
    .filter(Boolean)
    .join(' ');
  return (
    <figure className={classes} style={{ '--ratio': image.width / image.height } as CSSProperties}>
      <img
        className={styles.image}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
      {image.caption && <VisualCaption>{image.caption}</VisualCaption>}
    </figure>
  );
}

/* One to three captioned images inside a visual band, uncropped at their
   natural aspect ratio and capped in width and height (tokens.css). 'pair'
   sets two side by side at equal height (each one's share of the row
   follows its aspect ratio) and stacks them on mobile; 'small' images sit
   centred on their own row below. */
export default function ImageSet({ layout, images }: ImageSetData) {
  const main = images.filter((image) => !image.small);
  const small = images.filter((image) => image.small);

  return (
    <div className={styles.set} data-layout={layout}>
      {layout === 'pair' ? (
        <div
          className={styles.pair}
          data-framed={main.some((image) => image.framed)}
          style={{ '--ratio-sum': main.reduce((sum, image) => sum + image.width / image.height, 0) } as CSSProperties}
        >
          {main.map((image) => (
            <Figure key={image.src} image={image} />
          ))}
        </div>
      ) : (
        main.map((image) => <Figure key={image.src} image={image} />)
      )}
      {small.map((image) => (
        <Figure key={image.src} image={image} />
      ))}
    </div>
  );
}
