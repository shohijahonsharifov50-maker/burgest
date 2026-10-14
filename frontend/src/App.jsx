import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SitePage from './pages/SitePage';

const AdminPage = lazy(() => import('./pages/AdminPage'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SitePage />} />
      <Route path="/admin/*" element={<Suspense fallback={null}><AdminPage /></Suspense>} />
      <Route path="*" element={<SitePage />} />
    </Routes>
  );
}
