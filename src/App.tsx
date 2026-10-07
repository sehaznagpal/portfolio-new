import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import { PLAYGROUND_PATH } from './data/playground';
import { loadPlaygroundPage } from './lib/usePlaygroundTransition';

const DrCuterusCaseStudyPage = lazy(() => import('./pages/DrCuterusCaseStudyPage'));
const FraudCaseStudyPage = lazy(() => import('./pages/FraudCaseStudyPage'));
const MoolroopCaseStudyPage = lazy(() => import('./pages/MoolroopCaseStudyPage'));
const PlaygroundPage = lazy(loadPlaygroundPage);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-study/dr-cuterus" element={<DrCuterusCaseStudyPage />} />
          <Route path="/case-study/designing-against-fraud" element={<FraudCaseStudyPage />} />
          <Route path="/case-study/moolroop" element={<MoolroopCaseStudyPage />} />
          <Route path={PLAYGROUND_PATH} element={<PlaygroundPage />} />
          {/* The old site's address for the playground */}
          <Route path="/experiment-zone" element={<Navigate to={PLAYGROUND_PATH} replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
