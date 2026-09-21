import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* BrowserRouter (plain <Routes>, not the data-router API) never resets
   scroll position on navigation by itself — <ScrollRestoration> only exists
   on createBrowserRouter. Without this, clicking a Featured Work card (or
   any other in-app link) while scrolled down landed on the new page already
   scrolled to wherever the old page happened to be, rather than at its own
   top. Renders nothing; only the effect matters. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
