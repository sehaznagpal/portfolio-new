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

function Figure({ image, style }: { image: SetImage; style?: CSSProperties }) {
  const classes = [styles.figure, image.small && styles.small, image.framed && styles.framed]
    .filter(Boolean)
    .join(' ');
  return (
    <figure className={classes} style={style}>
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
   natural aspect ratio. 'pair' sets two side by side at equal height (each
   one's share of the row follows its aspect ratio) and stacks them on
   mobile; 'small' images sit centred on their own row below. */
export default function ImageSet({ layout, images }: ImageSetData) {
  const main = images.filter((image) => !image.small);
  const small = images.filter((image) => image.small);

  return (
    <div className={styles.set} data-layout={layout}>
      {layout === 'pair' ? (
        <div className={styles.pair}>
          {main.map((image) => (
            <Figure key={image.src} image={image} style={{ '--ratio': image.width / image.height } as CSSProperties} />
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
