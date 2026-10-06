import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ComingSoonPage from './pages/ComingSoonPage';

const DrCuterusCaseStudyPage = lazy(() => import('./pages/DrCuterusCaseStudyPage'));
const FraudCaseStudyPage = lazy(() => import('./pages/FraudCaseStudyPage'));
const MoolroopCaseStudyPage = lazy(() => import('./pages/MoolroopCaseStudyPage'));

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
          <Route path="/experiment-zone" element={<ComingSoonPage title="Playground" />} />
        </Routes>
      </Suspense>
    </>
  );
}
