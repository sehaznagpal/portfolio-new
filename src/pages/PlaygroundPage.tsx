import { useEffect } from 'react';
import { ThemeProvider } from '../components/playground/theme/ThemeContext';
import Playground from '../components/playground/Playground';
import { PageSweepOut } from '../components/chrome/PageSweep';
import PlaygroundCursor from '../components/playground/cursor/PlaygroundCursor';
import { useMediaQuery } from '../lib/useMediaQuery';
import { usePageMeta } from '../lib/usePageMeta';

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

/* /playground: the Experiment Zone, as a pannable canvas or a scrolling grid. */
export default function PlaygroundPage() {
  usePageMeta({
    page: 'Experiment Zone',
    description: 'Small things made to see how they hold up when someone actually uses them.',
  });
  usePlaygroundFonts();
  // Touch devices keep their native behaviour.
  const hasMouse = useMediaQuery('(hover: hover) and (pointer: fine)');

  return (
    <ThemeProvider>
      <Playground />
      <PageSweepOut />
      {hasMouse && <PlaygroundCursor />}
    </ThemeProvider>
  );
}
