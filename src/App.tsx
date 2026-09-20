import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ComingSoonPage from './pages/ComingSoonPage';
import DrCuterusCaseStudyPage from './pages/DrCuterusCaseStudyPage';
import FraudCaseStudyPage from './pages/FraudCaseStudyPage';
import MoolroopCaseStudyPage from './pages/MoolroopCaseStudyPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/case-study/dr-cuterus" element={<DrCuterusCaseStudyPage />} />
      <Route path="/case-study/designing-against-fraud" element={<FraudCaseStudyPage />} />
      <Route path="/case-study/moolroop" element={<MoolroopCaseStudyPage />} />
      <Route path="/experiment-zone" element={<ComingSoonPage title="Playground" />} />
    </Routes>
  );
}
