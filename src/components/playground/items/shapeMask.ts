import type { CSSProperties } from 'react';

/* Inline style that hands an image to grain.module.css's .shaped mask. */
export function shapeMask(src: string) {
  return { '--shape': `url("${src}")` } as CSSProperties;
}
