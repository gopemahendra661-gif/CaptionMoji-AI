import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { InstagramPage, WhatsAppPage, FunnyPage, HindiPage, ViralPage } from './pages/SEOPages';
import { PrivacyPolicy, TermsOfService, ContactUs } from './pages/LegalPages';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emoji-for-instagram" element={<InstagramPage />} />
          <Route path="/emoji-for-whatsapp" element={<WhatsAppPage />} />
          <Route path="/funny-emoji-generator" element={<FunnyPage />} />
          <Route path="/hindi-caption-generator" element={<HindiPage />} />
          <Route path="/viral-caption-generator" element={<ViralPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Layout>
    </Router>
  );
}
