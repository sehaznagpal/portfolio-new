import { useEffect } from 'react';
import { ThemeProvider } from '../components/playground/theme/ThemeContext';
import PlaygroundCanvas from '../components/playground/PlaygroundCanvas';
import { PageSweepOut } from '../components/chrome/PageSweep';

// Fonts only the playground uses (letter, SiP Studio modal), so Home never loads them.
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Crafty+Girls&family=Source+Code+Pro:wght@400;500;600&family=Source+Sans+3:wght@300;400;600;700&display=swap';

function usePlaygroundFonts() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONTS_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS_HREF;
    document.head.appendChild(link);
  }, []);
}

/* /playground: the Experiment Zone canvas. The page itself never scrolls;
   the canvas pans instead. */
export default function PlaygroundPage() {
  usePlaygroundFonts();

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <ThemeProvider>
      <PlaygroundCanvas />
      <PageSweepOut />
    </ThemeProvider>
  );
}
