import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SEO from './components/SEO';
import Home from './pages/Home';
import QrTool from './pages/QrTool';
import WhoisTool from './pages/WhoisTool';
import IpTool from './pages/IpTool';
import EncodeTool from './pages/EncodeTool';
import VietQrTool from './pages/VietQrTool';
import TwoFATool from './pages/TwoFATool';
import UaTool from './pages/UaTool';
import ProxyTool from './pages/ProxyTool';
import NotesTool from './pages/NotesTool';
import LinksTool from './pages/LinksTool';
import Donate from './pages/Donate';
import DnsTool from './pages/DnsTool';
import HttpTool from './pages/HttpTool';
import CryptoTool from './pages/CryptoTool';
import DataTool from './pages/DataTool';
import CronTool from './pages/CronTool';
import UuidTool from './pages/UuidTool';
import AuthCallback from './pages/AuthCallback';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

export default function App() {
  return (
    <BrowserRouter>
      <SEO />
      <Routes>
        <Route path="auth/callback" element={<AuthCallback />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="qr" element={<QrTool />} />
          <Route path="whois" element={<WhoisTool />} />
          <Route path="ip" element={<IpTool />} />
          <Route path="tools" element={<EncodeTool />} />
          <Route path="vietqr" element={<VietQrTool />} />
          <Route path="2fa" element={<TwoFATool />} />
          <Route path="ua" element={<UaTool />} />
          <Route path="proxy" element={<ProxyTool />} />
          <Route path="notes" element={<NotesTool />} />
          <Route path="links" element={<LinksTool />} />
          <Route path="donate" element={<Donate />} />
          <Route path="dns" element={<DnsTool />} />
          <Route path="http" element={<HttpTool />} />
          <Route path="crypto" element={<CryptoTool />} />
          <Route path="data" element={<DataTool />} />
          <Route path="cron" element={<CronTool />} />
          <Route path="uuid" element={<UuidTool />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
