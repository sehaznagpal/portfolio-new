import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import { LINKS } from './data/links';
import { loadPlaygroundPage } from './lib/usePlaygroundTransition';

const DrCuterusCaseStudyPage = lazy(() => import('./pages/DrCuterusCaseStudyPage'));
const FraudCaseStudyPage = lazy(() => import('./pages/FraudCaseStudyPage'));
const MoolroopCaseStudyPage = lazy(() => import('./pages/MoolroopCaseStudyPage'));
const PlaygroundPage = lazy(loadPlaygroundPage);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path={LINKS.home} element={<HomePage />} />
          <Route path={LINKS.drCuterus} element={<DrCuterusCaseStudyPage />} />
          <Route path={LINKS.fraud} element={<FraudCaseStudyPage />} />
          <Route path={LINKS.moolroop} element={<MoolroopCaseStudyPage />} />
          <Route path={LINKS.playground} element={<PlaygroundPage />} />
          <Route path={LINKS.legacyPlayground} element={<Navigate to={LINKS.playground} replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
