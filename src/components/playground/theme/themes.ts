export type ThemeName = 'default' | 'pina-colada' | 'seaglass' | 'blush' | 'wakanda';
export type PickableTheme = Exclude<ThemeName, 'default'>;

/* Each theme is a soft, muted ground plus its dot colour. `dark` flips the
   text that sits directly on the ground (captions) to light. */
export interface ThemeGround {
  ground: string;
  dot: string;
  dark: boolean;
}

export const DEFAULT_GROUND: ThemeGround = { ground: '#ECE8DE', dot: 'rgba(18, 18, 18, 0.18)', dark: false };

/* The switcher's swatches show each theme's own ground. */
export const THEME_OPTIONS: ({ id: PickableTheme; label: string; swatchStroke: string } & ThemeGround)[] = [
  { id: 'pina-colada', label: 'Piña Colada', swatchStroke: '#CFE6DC', ground: '#F5F7E4', dot: 'rgba(18, 18, 18, 0.16)', dark: false },
  { id: 'seaglass', label: 'Seaglass', swatchStroke: '#C3DCD2', ground: '#E6EEF0', dot: 'rgba(18, 18, 18, 0.16)', dark: false },
  { id: 'blush', label: 'Blush', swatchStroke: '#DDB6BF', ground: '#EEDDE0', dot: 'rgba(18, 18, 18, 0.16)', dark: false },
  { id: 'wakanda', label: 'Wakanda', swatchStroke: '#2C2C2C', ground: '#1B1B1B', dot: 'rgba(254, 254, 254, 0.12)', dark: true },
];

/* Order the dot-cluster button steps through, and the order its four dots sit
   in clockwise from top-left. Separate from the dropdown's list order. */
export const THEME_CYCLE: PickableTheme[] = ['wakanda', 'pina-colada', 'seaglass', 'blush'];

export function themeOption(theme: ThemeName) {
  return THEME_OPTIONS.find((option) => option.id === theme);
}

export function themeGround(theme: ThemeName): ThemeGround {
  return themeOption(theme) ?? DEFAULT_GROUND;
}
