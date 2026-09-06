import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import LandingPage from './pages/LandingPage';
import YourSpacePage from './pages/YourSpacePage';
import FeaturesPage from './pages/FeaturesPage';
import UpcomingFeaturesPage from './pages/UpcomingFeaturesPage';
import IntegrationsPage from './pages/IntegrationsPage';
import PricingPage from './pages/PricingPage';
import SecurityPage from './pages/SecurityPage';
import BuilderPage from './pages/BuilderPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/your-space" element={<YourSpacePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/upcoming-features" element={<UpcomingFeaturesPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/builder" element={<BuilderPage />} />
        </Route>
      </Routes>
    </>
  );
}

