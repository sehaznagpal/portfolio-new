export type ThemeName = 'default' | 'pina-colada' | 'seaglass' | 'blush' | 'wakanda';
export type PickableTheme = Exclude<ThemeName, 'default'>;

/* Swatch colours double as each theme's canvas fill and grid line (see
   PlaygroundCanvas.module.css). */
export const THEME_OPTIONS: { id: PickableTheme; label: string; swatchFill: string; swatchStroke: string }[] = [
  { id: 'pina-colada', label: 'Piña Colada', swatchFill: '#F8FFD1', swatchStroke: '#C2F2E4' },
  { id: 'seaglass', label: 'Seaglass', swatchFill: '#DDECF1', swatchStroke: '#AED9C6' },
  { id: 'blush', label: 'Blush', swatchFill: '#C84F6B', swatchStroke: '#D1798E' },
  { id: 'wakanda', label: 'Wakanda', swatchFill: '#121212', swatchStroke: '#1E1E1E' },
];

/* Order the dot-cluster button steps through, and the order its four dots sit
   in clockwise from top-left. Separate from the dropdown's list order. */
export const THEME_CYCLE: PickableTheme[] = ['wakanda', 'pina-colada', 'seaglass', 'blush'];

export function themeOption(theme: ThemeName) {
  return THEME_OPTIONS.find((option) => option.id === theme);
}
