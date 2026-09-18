import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ComingSoonPage from './pages/ComingSoonPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/case-study/dr-cuterus"
        element={<ComingSoonPage title="Website for Dr Cuterus" />}
      />
      <Route
        path="/case-study/designing-against-fraud"
        element={<ComingSoonPage title="Designing Against Fraud" />}
      />
      <Route
        path="/case-study/moolroop"
        element={<ComingSoonPage title="The Moolroop App" />}
      />
      <Route path="/experiment-zone" element={<ComingSoonPage title="Playground" />} />
    </Routes>
  );
}
