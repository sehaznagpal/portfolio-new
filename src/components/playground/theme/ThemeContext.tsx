import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { THEME_OPTIONS, type ThemeName } from './themes';

const THEME_KEY = 'portfolio:playground-theme';

function readStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return THEME_OPTIONS.some((option) => option.id === stored) ? (stored as ThemeName) : 'default';
  } catch {
    return 'default';
  }
}

function storeTheme(theme: ThemeName) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage unavailable (e.g. private browsing): the pick just won't persist.
  }
}

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* State only, no document-level side effects: the theme is applied solely
   through data-theme on the playground canvas, so it can't reach other routes. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(readStoredTheme);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (next) => {
        setThemeState(next);
        storeTheme(next);
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
