import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState } from 'react';
// import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { tools } from '../config/tools';
import { Menu, X } from 'lucide-react';
import toolsLogo from '../assets/tools-logo.png';

export default function Layout() {
  // const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const current = tools.find(tl => tl.path === pathname);
  const env = import.meta.env;
  const fb = env.VITE_SOCIAL_FACEBOOK || 'https://facebook.com';
  const zalo = env.VITE_SOCIAL_ZALO || 'https://zalo.me';
  const tele = env.VITE_SOCIAL_TELEGRAM || 'https://t.me';
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="flex max-w-7xl mx-auto">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        {/* Mobile sidebar as drawer */}
        {open && (
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute left-0 top-0 bg-white h-full shadow-xl w-64">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={toolsLogo} alt="logo" className="w-8 h-8 rounded" />
                  <h1 className="text-xl font-bold">{t('title')}</h1>
                </div>
                <button onClick={() => setOpen(false)} className="rounded p-2 hover:bg-zinc-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar onNavigate={() => setOpen(false)} className="border-0 sticky top-0" />
            </div>
          </div>
        )}
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button className="md:hidden flex items-center gap-2 rounded px-3 py-2 border hover:bg-zinc-100" onClick={() => setOpen(true)}>
              <Menu className="w-5 h-5" />
              <span className="text-sm">Menu</span>
            </button>
            <h2 className="text-lg font-semibold">{current ? t(current.labelKey) : t('title')}</h2>
            <select
              className="rounded px-3 py-1.5 border bg-white"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
          <Outlet />
          <footer className="pt-10 border-t">
            <div className="flex items-center justify-between text-sm opacity-70">
              <div>© {new Date().getFullYear()} {t('title')}</div>
              <div className="flex gap-3">
                <a href={fb} target="_blank" className="hover:underline">Facebook</a>
                <a href={zalo} target="_blank" className="hover:underline">Zalo</a>
                <a href={tele} target="_blank" className="hover:underline">Telegram</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}


